---
title: Awaiting A Return Value
subtitle: An idiot's overview of the Event Loop, Web APIs and queues in JavaScript.
published: 2025-06-06
---

Primarily, JavaScript is a single-threaded and synchronous language but there
are exceptions to this. Think of the `setInterval()` and `setTimeout()`
functions as examples of JavaScript utilising asynchronous code around a single
thread.

1. Call to `setInterval()` or `setTimeout()` in the code
2. Engine offloads the call to the parent context (usually a Web API)
3. Once the timer has finished, the callback is then placed on the Task Queue
4. The Event Loop takes the first callback from the TQ, putting it on the
Call Stack to be executed

**NOTE:** The Event Loop will take the callback from the queue once the Call
Stack is empty, meaning long-running synchronous tasks left on the Call Stack
will defer the callback execution

## Web APIs

I mentioned earlier that when the JavaScript engine running in the browser
encounters a call to `setInterval()` or `setTimeout()` it will pass it to a Web
API.

These interfaces are implemented by the browser itself within a browser context,
if you're running the JavaScript code server-side then Chrome, Safari, FireFox
and their implementations don't exist so the runtime uses libraries or implement
them themselves.

## Blocking vs. Non-blocking

Because JavaScript is single-threaded, if it's execution becomes stuck on a
long-running task, all other processes wait which includes any interactivity.

![Blocked](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3hrNHQ3MGIzYjFtbTcwNTdyZWlqenlmeGhld3JsYTd5dTcyemw0dyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7chLJeFOr49zrXnS8b/giphy.gif)

```js
const handleButtonClick() {
  veryExpensiveFunction();
}
```

Once that button is pressed, the call stack execution is stuck on
`veryExpensiveFunction()` and more than likely won't be able to even remove the
active state from the button nor perform any other logic.

**That is blocking code.**

On the other hand, non-blocking code is code that doesn't need to resolve or
complete before the proceeding lines can be executed.

```js
console.log("Foo");

setTimeout(() => {
  console.log("Boo");
}, 0)

console.log("Bar");
```

Here, the `setTimeout()` call will eventually make it's way back from the Web
API after a swift 0 second wait and land on the Task Queue. But, calling back to
the above, the Event Loop will not read from the Task Queue until the Call Stack
is clear so we see the following:

```txt
Foo
Bar
Boo
```

## Behind The Scenes Of A Promise

Setting an immediately returning callback within a `setTimeout()` is (hopefully)
a thing of the past because a `Promise` can fit right in it's place. Similar to
the Task Queue, promises reside on another, the Microtask Queue which has
priority over the TQ but similarly is only processed by the Event Loop when the
Call Stack is empty.

```js
console.log("Foo");

setTimeout(() => {
  console.log("Boo");
}, 0);

Promise.resolve("has resolved").then((value) => {
  console.log("Far", value);
});

console.log("Bar");
```

![Pinky Promise](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjRmMnN0NGN5Y3oxbGw5eHZsMTZsN2puanBxMDlhb3A1YXJseDFhaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Cu7tfLe1edy3HE7JfC/giphy.gif)

Just like before, there will now be an item on the TQ but the MQ also. Once both
`console.log()` calls have run and complete, the Event Loop will process all of
the items in the MQ until then moving on to the TQ.

```txt
Foo
Bar
Far has resolved
Boo
```

### The Await Keyword

The `await` keyword is the trigger for the `Promise` to be placed on the MQ once
some checks have completed, like:

1. Execution pause: The `async` function pauses on the `await` line
(non-blocking)
2. Continue: Due to the above being non-blocking, the synchronous code following
the `async` function runs as normal
3. Resolution: Waiting on Resolve or Reject
4. Complete: Event loop picks up the task and returns execution (value or thrown
error) to the `await` line

```js
async function veryExpensiveFunction() {
  console.log("Boo");
  try {
    const response = await fetch("https://google.com");
    console.log(response);
  } catch (error) {
    /* ... */
  }
  console.log("Far");
}

console.log("Foo");
veryExpensiveFunction();
console.log("Bar");
```

Although there's more code involved, the principle remains the same as the
previous examples. This time the function is entered and executed up to the
`await` statement where execution is returned to the synchronous code.

```txt
Foo
Boo
Bar
Response (2.67 KB) /* ... */
Far
```

---
title: Awaiting A Return Value In JavaScript
subtitle: An idiot's overview of the Event Loop, Web APIs and queues.
published: 2025-05-13
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

> The Event Loop will take the callback from the queue once the Call Stack is
empty, meaning [long-running synchronous tasks left on the Call Stack will defer
the callback execution](https://www.reddit.com/r/learnjavascript/comments/15vapvw/question_about_event_loop_you_may_assume_that_i/)

## Web APIs

I mentioned earlier that when the JavaScript engine running in the browser
encounters a call to `setInterval()` or `setTimeout()` it will pass it to a Web
API. These interfaces are implemented by the browser itself within a browser
context, if you're running the JavaScript code server-side then Chrome, Safari,
FireFox and their implementations don't exist so the runtime uses libraries or
implement them themselves.

The functions mentioned are part of the [Window
API](https://developer.mozilla.org/en-US/docs/Web/API/Window) but the [total
list is here](https://developer.mozilla.org/en-US/docs/Web/API).

## Blocking vs. Non-blocking

Because JavaScript is single-threaded, if it's execution becomes stuck on a
long-running task, all other processes wait. This wouldn't be *too* big of a
deal if the context wasn't a browser where the interactivity remains on that
same thread.

```js
// index.js

const handleButtonClick() {
  veryExpensiveFunction(); // <- we are stuck here
}
```

Once that button is pressed, the call stack execution is stuck on
`veryExpensiveFunction` and more than likely won't be able to even remove the
active state from the button nor perform any other logic.

That is blocking code.

On the other hand, non-blocking code is code that doesn't need to resolve or
complete before the proceeding lines can be executed.

```js
// index.js

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

> A lot of this is taken from a [great YouTube
video](https://www.youtube.com/watch?v=8aGhZQkoFbQ) at JSConf

## Promise

Setting an immediately returning callback within a `setTimeout()` is (hopefully)
a thing of the past because a `Promise` can fit right in it's place. Similar to
the Task Queue, promises reside on another, the Microtask Queue which has
priority over the TQ but similarly is only processed by the Event Loop when the
Call Stack is empty.

```js
// index.js

console.log("Foo");

setTimeout(() => {
  console.log("Boo");
}, 0);

Promise.resolve("has resolved").then((value) => {
  console.log("Far", value);
});

console.log("Bar");
```

Just like before, there will now be an item on the TQ but the MQ also. Once both
`console.log` calls have run and complete, the Event Loop will process all of
the items in the MQ until then moving on to the TQ.

```txt
Foo
Bar
Far has resolved
Boo
```

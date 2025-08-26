---
title: JavaScript Promise
subtitle: An idiot's overview of JavaScript promises & the event loop.
published: 2025-08-26
---

JavaScript is a single-threaded language that has many use-cases for pausing
execution on it's main and lone thread while it completes other tasks, **yet it
is unable to spawn a new thread**. The following pseudo-code would disable all
interactivity e.g. button clicks, mouse & keyboard events on a web page for a
second at a time.

```js
console.log("Foo")
sleep(1)

console.log("Bar")
sleep(1)

console.log("FooBar")
sleep(1)
```

![stop](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2h0eWo1b2s2Y3gzY3d0end1dnFmd2M2a2pzYXRydW96dTluc2gzYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KyCGSsquseTkv8sZ35/giphy.gif)

The problem is JavaScript does **near enough everything** on a site, so blocking
it's only thread is troublesome.

## Callbacks

A common work-around for this requirement from the day of old is to use WebAPI
functions to hand off work to external implementations.

```js
setTimeout(() => {
  console.log("Foo")

  setTimeout(() => {
    console.log("Bar")

    setTimeout(() => {
      console.log("FooBar")
    }, 1000)
  }, 1000)
}, 1000)
```

How these calls to WebAPIs work outside of JavaScript's single thread involves
the Event Loop, the system most important to a JavaScript engine.

1. JavaScript call stack is empty, nothing left to execute
2. Check **Microtask** queue for resolved/rejected Promise callbacks
3. Check **Macrotask** queue for completed timers, I/O operations etc.
3. If there, return the callback reference to the call stack to be executed

More [depth can be reached on the Event
Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
over on MDN.

## Promise

A Promise can be simplified to a JavaScript object with three states, said
object will have two callbacks, one for the **resolved** value and the other for
the **rejected** value.

- Pending
- Fulfilled
- Rejected

```js
const foo = somePromise()

console.log(foo)
```

```txt
Promise { pending }
```

![waiting](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXIwc2ppaW8yOXF0Z2VrdHd5cXJzd2ZyYzZxc2NoNDMzajNlZ2hmZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tvU9iTev6uBIQ/giphy.gif)

When we await a Promise, we are blocking the current scope's execution until said
Promise either resolves or rejects. The call stack can still be populated
elsewhere.

```js
async function foobar() {
  const foo = await sleep(1)
  console.log("bar")
}

foobar()
console.log("foo")
```

```txt
foo
bar
```

Now if I needed a value returned from the asynchronous function, I would need to
wait for the Promise it returns to resolve or reject. Since **we don't care
about what data it creates/uses in this example** we can just call it and move
to the next item on the call stack.

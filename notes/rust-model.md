---
title: Rust Memory Model
subtitle: An idiot's overview of how Rust handles it's memory.
published: 2025-06-28
---

Rust's memory model is designed around ownership, borrowing and lifetimes to
avoid the need of a garbage collector. Without said garbage collector, Rust
misses the overhead of the runtime collection passes instead relying on
compile-time checks.

## Ownership

Ownership is the core concept allowing Rust to not have a garbage collector.
It's the idea that every value has a single owner at any given time which is
then aided by the "Borrow Checker" to ensure that the value is not used in an
unsafe way.

```rust
fn main() {
  {
    let foo = String::from("bar"); // "foo" is the owner of the string
  } // "foo" is dropped

  let foo = String::from("bar");
  let bar = foo;

  println!("{}", foo); // ERROR: a value can't have multiple owners
  println!("{}", bar); // the "bar" ownership has been moved
}
```

Another example of ownership being moved is function parameters, where unless
the value is passed by reference, the function takes ownership of the value.
This means you can no longer reference the value after the function call,
avoiding any memory changes the function could have caused.

## Borrowing

If you wish to not claim ownership of a value, you can "borrow" it through a
reference, leaving the original owner intact. You are then at the mercy of the
"Borrow Checker" which is a static analysis tool to ensure all references are
valid at compile-time.

### Borrow Checker

Although mainly covered within the context of borrowing, the Borrow Checker also
covers ownership as an extension of memory initialisation.

Here is an example of a value not living long enough to have a reference to it
live on elsewhere.

```rust
fn main() {
  let mut foo = vec![];

  {
    let bar = String::from("baz");
    foo.push(&bar); // ERROR: "bar" doesn't live long enough
  } // "bar" is dropped

  println!("{}", foo);
}
```

## RAII

**R**esource **A**cquisition **I**s **I**nitialisation translates to resources
(objects, file handles, network sockets etc.) being tied to the lifetime of an
object.

In order to achieve this, Rust uses the "Drop" trait to automatically release
the objects at the end of their lifetime. The process follows an idea of
resource(s) being acquired until the value goes out of scope where it's then
dropped.

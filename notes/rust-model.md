---
title: Rust Memory Model
subtitle: An idiot's overview of how Rust handles its memory.
published: 2025-08-17
---

Rust has a "guarantee" of memory and thread safety based around ownership and
borrowing crucially being completed at compile time. It does this without
requiring a garbage collector, avoiding runtime overhead like differentiating
between and then managing live and dead objects.

This method is a nice balance between performance focused and memory safe
languages. The first offering manual memory management avoiding the GC overhead
but providing opportunities for memory issues and the second automating the
memory management with a "stop the world" execution pause.

- Null Pointer Dereferencing: Trying to access data from memory that has
  never been initialised.
- Use After Free (Dangling Pointers): Reading the value of a pointer after
  it has been released.

## Resource Acquisition Is Initialisation

Otherwise known as RAII, tying a resource to an object's scope where a resource
can be file handles, network connections, allocations and more. I believe an
example of this outside of Rust is a unique pointer in the C++ standard library.

1. Object is **initialised**
2. Resource is **acquired**
3. Object goes **out of scope**
4. Resource is **released**

![Released](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cjBhbTRrNmd3YXd0c3hta2M3NGlnams0eHA1bGV0MWRjNXR5ZXpzdyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/7chLJeFOr49zrXnS8b/giphy.gif)

Rust uses RAII under the idea of "ownership" where every resource gets a single
owner. That single owner is directly responsible for the resource living or
dying.

```rs
fn main() {
  {
    let foo = String::from("bar");
  }

  // `foo` has been released.
}
```

## Ownership

As covered above, each piece of data in Rust **gets a single owner in charge of
the data's lifetime**. An example of data having one owner is attempting to use
a variable after ownership has been reassigned.

```rs
fn main() {
  let foo = String::from("bar");
  let bar = foo;

  println!("{foo}");
}
```

```txt
error[E0382]: borrow of moved value: `foo`
```

I question what happens to a value after it has been moved, is it dropped? Is
there a memory swap? Does the compiler optimise it out? And it seems [other
people have had the same
thoughts](https://users.rust-lang.org/t/what-happens-to-moved-values/53939/2).

There is also a concept of copying. An example of this is reassigning integers
will copy the value to a new owner as integer objects are small and it's safe to
do so.

### The Drop Trait

The runtime releases a resource using a built-in trait called "Drop" which is
implemented for all(?) types by standard but **may need to be implemented** for
custom types.

[Rust By Example](https://doc.rust-lang.org/rust-by-example/trait/drop.html)
shows this using a temporary file data structure removing said file from the
file system once dropped.

```rs
struct Foo;

impl Drop for Foo {
  fn drop(&mut self) {
    println!("dropped");
  }
}

fn main() {
  {
    let foo = Foo;
  }

  // `foo` has been dropped.
}
```

```txt
dropped
```

## Borrowing

A reference in Rust means rather than owning a resource, you temporarily claim
ownership over it where said resource **does not release once out of scope** of
the borrow but instead returns to its original owner. As you can imagine this
means the lifetime of a borrow must not be greater than the owner.

![Borrowing](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDloZjEzc3hod2NmbnN5dTF2ZGNudHY3OG53N3dlZTAzMmRhNnFjeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3orieOlZySmrsWFYek/giphy.gif)

An example of this is creating a scoped borrow of a resource that won't live
longer than said scope, which I read from [MIT's Rust
book](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/first-edition/references-and-borrowing.html#borrowing).

```rs
fn main() {
  let foo: &i32;

  {
    let bar = 69;
    foo = &bar;
  }

  println!("{}", foo);
}
```

```txt
error[E0597]: `bar` does not live long enough
```

## Lifetimes

Lifetimes enable the Rust compiler to check the validity of borrows a.k.a when a
resource is created, to when it's dropped. Similar to what's mentioned above, a
borrow is **only valid if it's lifetime is less than or equal to it's
lender's**.

In the case where a resource's lifetime can't be determined by the compiler, it
can be explicitly specified. Where we may declare a reference lifetime to last
as long as the function it's returned from, the data it's referencing can't be
dropped once out of scope.

```rs
fn foo<'l>() -> &'l String {
  &String::from("bar")
}

fn main() {
  foo();
}
```

```txt
error[E0515]: cannot return reference to temporary value
```

To be clear here, it's simple to say that the lifetime of the entire return
value is attached to the function. While the reference may last that long, the
data is dropped at the end of the function's scope, and the function itself
lasts until the end of main's scope.

## Sources

- [Rust Book: RAII](https://doc.rust-lang.org/rust-by-example/scope/raii.html)
- [Rust Book:
  Ownership](https://doc.rust-lang.org/rust-by-example/scope/move.html)
- [Rust Book:
  Borrowing](https://doc.rust-lang.org/rust-by-example/scope/borrow.html)
- [Rust Book:
  Lifetimes](https://doc.rust-lang.org/rust-by-example/scope/lifetime.html)
- [Why Discord moved away from garbage
  collection](https://discord.com/blog/why-discord-is-switching-from-go-to-rust)
- [Comparing Rust and C++
  RAII](https://educatedguesswork.org/posts/memory-management-4/)

---
title: Hello, World!
subtitle: How and why I built this site to create a personal blog.
published: 2025-04-26
---

There are several methods to document your notes, share your thoughts and display your
code snippets, many of which are built aside products e.g. [X (Twitter)](https://x.com) or
built for purpose e.g. [Medium](https://medium.com) and [dev.to](https://dev.to).

For me, ironically, having the ability to write and share content alongside other features
similarly to X (Twitter) atracted me to building blog functionality myself within my personal site.

<img alt="Welcome" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2lwNTB5azB2ODU4aDI2cDNhcnlkamhmd21kbHphaTJhMmZkeWU3biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ASd0Ukj0y3qMM/giphy.gif" />

## Difficulty

I haven't done web development for quite a while at my day job as a Software Engineer, so
writing this site (as simple as it is) has proven more difficult than I thought. Difficult
in the sense that I wasn't happy with how it turned out, not implementation challenges as
it's a simple static site with no authentication, database nor architecture complexities.

Due to this, I've re-written a lot of [this site](https://github.com/brooknullsh/personal-site)
over and over until I was somewhat happy with it (which is now... for now) but I also re-wrote
this first article several times because of varying ideas regarding what I wanted to discuss or
show. I've come to realise something that I've read a lot in recent years, even for something
as simple as this site, that chase for "perfection" gets in the way more so than it aids you.

## Purpose

My main reason for this site in general, even ignoring the blog aspect of it, is to store my
findings, resources & awful code snippets. "Why not use a note-taking app?" you may ask, well
in the classic developer sense I am not happy with any of them and I do not have enough control
over them.

Judge me all you want, but these were my requirements for a note-taking app I spent quite a while
trying to find:

- **iCloud Sync:** All of my devices are Apple devices (sue me)
- **Platform Support:** Similar to the above, it must have iOS & MacOS support and ideally would
be native
- **Bare Bones:** Not quite minimalistic, but an app that doesn't have a million features
- **Markdown:** Self-explanatory

As I always did, I ended up returning to Apple Notes and calling it a day but in no way, shape or
form is that me giving my stamp of approval for that app... in my opinion, it's awful. Apple Notes
crashes at least once a day on both iOS and MacOS (especially if you type faster than 50WPM), it has
no code block support and it lacks intuitive features most Markdown editors have while not supporting
Markdown at all.

<img alt="Tim Cook" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25weGxpM3A4cG4zc2VnZTZ0aDZ0cnppejE3YmsxaGQ3c3Z6ZGNicSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cPfbGOr812eRdvdsIV/giphy.gif" />

I get it, Apple Notes is not designed for ramblings that developers may throw into it but instead a
simple note-taking app designed for everyone else but I do hope Apple throws more weight into it
soon enough and in the meantime I will use it as it ticks all the other boxes.

## Technology

I want to discuss what I used to even build this damned thing in the first place which is the usual
modern web development stack (or akin to it at least) because although it's not my day job I do
still love web development and keep up-to-date with what's going on.

- [Astro](https://astro.build): Previously used [Svelte](https://svelte.dev)
- [TailwindCSS](https://tailwindcss.com): Idiomatic class-based styles

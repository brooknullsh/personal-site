---
title: Minifying JavaScript For The Browser
subtitle: Optimising the size of JavaScript files sent to the client.
published: 2025-06-24
---

The process of removing unnecessary characters from code without changing its
functionality. Generally this means whitespace, source comments and variable names that have no
need being human readable length any more.

```js
function fooBar() {
  someOtherLongFunctionName()
}
```

Could get minified into (although keep in mind that there are further techniques
so this is not as simple as it may be):

```js
(function(){f()})()
```

## Why Minify It In The First Place?

Reducing the size of JavaScript files is handy in the context of the browser.
Generally, server responses (over HTTP anyway) look more like a structured data
response in various different forms but the web is sort of unique in the sense
that the entirety of it's content is sourced from over-the-wire.

No matter CSR, SSR, PPR, SSG, ISR or any of the other million rendering
strategies, the site's content is unknown to the client until some handshake
takes place. Contrast this approach to common video game interfaces where the
bulk of the static UI is bundled in the binary.

![Captain
America](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnlhYnF3OGxzM3A3MW10YnBqdWV2N2RlZmlvbnZ4NjdnNm43c2cwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PD9hjqdeidgqY/giphy.gif)

This means reducing the payload (in this case, HTML, JS, CSS and other assets)
size puts less strain on the server's egress workload but more importantly,
reduces the round-trip time.

Less bytes waiting to be resolved on the client means quicker page load and
interactivity.

## Other Forms Of Compression

Text compression is of course not unique to JavaScript but I learned from [this
great Reddit
thread](https://www.reddit.com/r/Frontend/comments/1fs7kos/comment/lpin1cv/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
that compressing the already minified source code to be served to the client is
an extra step of optimisation.

```txt
esbuild   (minified) 59.82KB (compressed) 19.24KB
terser    (minified) 59.16KB (compressed) 18.59KB
minify-js (minified) 60.74KB (compressed) 20.82KB
```

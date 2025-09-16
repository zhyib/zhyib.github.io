---
title: The Incompatibility of Webpack4 in Electron's webview
date: 2025-09-16 10:06:57
categories:
  - Technical
  - Frontend
tags:
  - Technical
  - Frontend
  - Electron
---

When showing a webpack4-packaged project in Electron's webview, an error `xxx.split() is undefined` occurs, causing the webview to display a blank page. The root cause is that the `pbkdf2` package which is depended by webpack has an error code that is not compatible with Electron's Node environment.

## Root Cause

Electron application throws an error `xxx.split() is undefined` when loading a webpack4-packaged project in Electron's webview. It is because `webpack@4` is dependent on `pbkdf2` package which is used for encryption and decryption. It referred like below:

<!-- more -->

```text
-- webpack@4.47.0
  `-- node-libs-browser@2.2.1
    `-- crypto-browserify@3.12.1
      +-- browserify-sign@4.2.3
      | `-- parse-asn1@5.1.7
      |   `-- pbkdf2@3.1.3 deduped
      `-- pbkdf2@3.1.3
```

After searching Github and project's issues, I found that someone has already posted the issue and even submitted a pull request, but it was never accepted, probably because the project is no longer maintained.

When updating to version 3.1.2, the code changes caused an error like below:

![20250828221012_7375_74.png](20250828221012_7375_74.png)

The original code checks whether `process.version` exists, and if it does, it executes `process.version.split()`. However, in the commit for version 3.1.2, the check was changed to `global.process.version`, but the `process.version.split()` method was not modified. In the Electron's Node environment, there is a `global.process.version`, but no `process.version`. This causes the error.

## Solution

The most straightforward solution is to upgrade to Webpack5, because Webpack5 does not have this dependency. However, in most cases, the packaging tool is not like to be modified, so a solution is to publish a private package and manually edit to the correct code - `global.process.version.split()`.

## About `global`

`global` is a global object. In Node, `global` is the Node global object, which contains Node's global variables. In browser environment, global variables are `globalThis` `window` `self` `frames` and four variables are equal.

> Historically, accessing the global object has required different syntax in different JavaScript environments. On the web you can use `window`, `self`, or `frames` - but in Web Workers only `self` will work. In Node.js none of these work, and you must instead use `global`.
>
> The `globalThis` property provides a standard way of accessing the global `this` value (and hence the global object itself) across environments. Unlike similar properties such as `window` and `self`, it's guaranteed to work in window and non-window contexts. In this way, you can access the global object in a consistent manner without having to know which environment the code is being run in. To help you remember the name, just remember that in global scope the `this` value is `globalThis`.
>
> Reference: [globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

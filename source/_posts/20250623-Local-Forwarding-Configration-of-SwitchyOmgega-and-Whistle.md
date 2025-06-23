---
title: Local Forwarding Configration of SwitchyOmgega and Whistle
date: 2025-06-23 10:53:38
categories:
  - Techenology
  - Frontend
tags:
  - Techenology
  - Frontend
---

Since we requrire cookies when doing web development locally, there are two ways to do this:

- Copy & paste the cookies from the browser to the localhost
- Edit `hosts` file, forwarding url of test environment to `127.0.0.1`

However, the first way is combersome, and the second way requires the edit permission. Therefore, there is another solution.

## Installation

- SwitchyOmega is a browser extension, following the normal installation steps.
- Whistle is a npm package, which can be installed by `npm install whistle -g`. It usually starts an servcie on `127.0.0.1:8899`.

<!-- !more -->

## Mechanism

- All browser traffic first goes through SwitchyOmega, which forwards to `127.0.0.1:8899`
- Configure rules on Whistle, forwarding the urls to the local development environment, all other requests which are not included will be ignored.

## Configuration

- SwitchyOmega
  - New Mode: Set proxy server as `127.0.0.1:8899`
- Whistle
  - Add rules as follows

```
http://test.com:8080/api ignore://http
http://test.com:8080/web http://localhost:8080/
http://test.com:8080/ http://localhost:8080/
```

- 1st line: All backend requests will be ignored.
- 2nd line: Refer to `http://test.com:8080/web/#/`, on which The browser will download the `index.html` entry file. This means that these requests will be forwarded to the local development environment.
- 3rd line: All remaining requests, which may be frontend resources requests, including .js .css .vue images and node_modules files, will be forwarded to the local development environment.

### File `vite.config.js`

- The `base` key should be set as `./`, which means all requests, including frontend resources requests and backend requests, will be started from the root path.
- The `proxy` key should be set already. All requests should be forwarded to the backend test environment, so no additional processing is required.
- Add the following code to `vite.config.js`, if not exists:

```js
defineConfig({
  // ...
  server: {
    host: "127.0.0.1", // 必须配置，不然 127.0.0.1:8080 不通
    port: 8080,
    hmr: {
      // 避免 vite hmr 报错
      protocal: "ws",
      host: "127.0.0.1",
    },
    // ...
  },
  // ...
});
```

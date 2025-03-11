---
title: 🥶什么是跨域？
createTime: 2025/03/10 18:14:39
permalink: /article/v4cu48w5/
---
### 同源策略
>同源策略（Same-Origin Policy）是浏览器的一种安全机制，限制不同源的网页互相访问资源。“源”由协议、域名和端口组成，若三者完全相同则为同源，否则不同源。

> [!note]
> 一个很简单的例子，你打开某一个网页，按下F12或者网络请求，点击网络，会发现各种各样的网络请求。
> 无一例外，他们都是以一种相对的形式展示出路径，且省略了协议、域名和端口。因为在浏览器发送或者应答网络请求需要遵循同源策略。

### 什么是跨域？
> 跨域问题是指浏览器在执行前端请求时，由于“同源策略”（Same-Origin Policy）的限制，导致无法直接访问不同源（协议、域名或端口不同）的资源。

Example:
- `http://example.com 和 https://example.com（协议不同，跨域）`
- `http://example.com 和 http://sub.example.com（域名不同，跨域）`
- `http://example.com:80 和 http://example.com:8080（端口不同，跨域）`

### 解决跨域
但是在开发过程中，我们有时无法避免，后端服务与前端的服务的域名或者端口相同，在这样的情况下，在前端请求后端服务时，就会发生跨域。

==那我们应该怎么解决这种现象呢？=={.danger}

#### 1. CORS（跨源资源共享）
通过在服务器端设置 HTTP 响应头（如 `Access-Control-Allow-Origin`），允许指定域名访问资源。

- 后端配置允许的源、方法和头信息。

> :::code-tabs
> @tab Java
> ```java
> import org.springframework.context.annotation.Configuration;
> import org.springframework.web.servlet.config.annotation.CorsRegistry;
> import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
> 
> @Configuration
> public class CorsConfig implements WebMvcConfigurer {
>     @Override
>     public void addCorsMappings(CorsRegistry registry) {
>         registry.addMapping("/**")
>                 .allowedOrigins("*")
>                 .allowedMethods("GET", "POST", "PUT", "DELETE")
>                 .allowedHeaders("Content-Type");
>     }
> }
> ```
> 
> @tab JavaScript
> ```javascript
> app.use((req, res, next) => {
>     res.header('Access-Control-Allow-Origin', '*');
>     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
>     res.header('Access-Control-Allow-Headers', 'Content-Type');
>     next();
> });
> ```
> 
> @tab Python
> ```python
> from flask import Flask
> from flask_cors import CORS
> 
> app = Flask(__name__)
> CORS(app, resources={
>     r"/*": {
>         "origins": "*",
>         "methods": ["GET", "POST", "PUT", "DELETE"],
>         "allow_headers": ["Content-Type"]
>     }
> })
> ```
> 
> @tab Rust
> ```rust
> use actix_web::{App, HttpServer, middleware, web};
> use actix_cors::Cors;
> 
> #[actix_web::main]
> async fn main() -> std::io::Result<()> {
>     HttpServer::new(|| {
>         let cors = Cors::default()
>             .allowed_origin("*")
>             .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
>             .allowed_header("Content-Type");
>             
>         App::new()
>             .wrap(cors)
>             // ...其他配置
>     })
>     .bind(("127.0.0.1", 8080))?
>     .run()
>     .await
> }
> ```
> 
> @tab C
> ```c
> #include <microhttpd.h>
> #include <string.h>
> 
> #define PORT 8080
> 
> static int answer_to_connection(void *cls, struct MHD_Connection *connection,
>                               const char *url, const char *method,
>                               const char *version, const char *upload_data,
>                               size_t *upload_data_size, void **con_cls) {
>     struct MHD_Response *response;
>     int ret;
> 
>     if (strcmp(method, "OPTIONS") == 0) {
>         response = MHD_create_response_from_buffer(0, NULL, MHD_RESPMEM_PERSISTENT);
>         MHD_add_response_header(response, "Access-Control-Allow-Origin", "*");
>         MHD_add_response_header(response, "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
>         MHD_add_response_header(response, "Access-Control-Allow-Headers", "Content-Type");
>         ret = MHD_queue_response(connection, MHD_HTTP_NO_CONTENT, response);
>         MHD_destroy_response(response);
>         return ret;
>     }
> 
>     response = MHD_create_response_from_buffer(0, NULL, MHD_RESPMEM_PERSISTENT);
>     MHD_add_response_header(response, "Access-Control-Allow-Origin", "*");
>     ret = MHD_queue_response(connection, MHD_HTTP_OK, response);
>     MHD_destroy_response(response);
> 
>     return ret;
> }
> 
> int main() {
>     struct MHD_Daemon *daemon;
>     daemon = MHD_start_daemon(MHD_USE_THREAD_PER_CONNECTION, PORT, NULL, NULL,
>                             &answer_to_connection, NULL, MHD_OPTION_END);
>     if (NULL == daemon) return 1;
>     
>     getchar();
>     MHD_stop_daemon(daemon);
>     return 0;
> }
> ```
> 
> @tab C++
> ```cpp
> #include "crow.h"
> 
> int main() {
>     crow::SimpleApp app;
> 
>     // 中间件来处理 CORS
>     CROW_ROUTE(app, "/*").methods("GET"_method, "POST"_method, "PUT"_method, "DELETE"_method, "OPTIONS"_method)
>     ([](const crow::request& req, crow::response& res) {
>         // 设置 CORS 头部
>         res.set_header("Access-Control-Allow-Origin", "*");
>         res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
>         res.set_header("Access-Control-Allow-Headers", "Content-Type");
> 
>         // 处理 OPTIONS 预检请求
>         if (req.method == "OPTIONS"_method) {
>             res.code = 204;
>             res.end();
>             return;
>         }
> 
>         // 这里可以添加实际的路由处理逻辑
>         res.code = 200;
>         res.end();
>     });
> 
>     app.port(8080).multithreaded().run();
>     return 0;
> }
> ```
> :::

#### 2. 代理服务器
前端请求通过一个同源的代理服务器，由代理服务器转发到目标服务器，绕过浏览器的同源策略。(重定向)

- 配置一个中间服务器（如 Nginx 或 Node.js）。
- 前端请求代理地址，代理转发到目标地址。

> <Icon name = "logos:nginx"/>Nginx配置：
> ```nginx
> server {
>     listen 80;
>     server_name proxy.example.com;
> 
>     location /api/ {
>         proxy_pass http://target.example.com/;
>     }
> }
> ```
> 前端请求：`http://proxy.example.com/api/data`


#### 3. JSONP

利用 `<script>` 标签没有跨域限制的特性，通过动态创建脚本标签发送请求，后端返回一个回调函数调用形式的响应。

- 前端：动态创建 `<script>` 标签，指定回调函数名。
- 后端：返回 `callbackName(data)` 格式的数据。


> 前端代码：
> ```javascript
> <script>
> function handleResponse(data) {
>     console.log(data)
> }
> var script = document.createElement('script');
> script.src = 'http://example.com/api?callback=handleResponse';
> document.body.appendChild(script);
> </script>
> ```
> 后端返回：
> ```javascript
> handleResponse({"status": "success", "data": "Hello World"});
> ```

#### 4. WebSocket
WebSocket 是一种双向通信协议，不受同源策略限制，可用于跨域通信。

- 前端使用 `WebSocket` 对象连接后端。
- 后端实现 WebSocket 服务。

> 前端：
> ```javascript
> const ws = new WebSocket('ws://example.com/socket');
> ws.onmessage = (event) => {
>     console.log(event.data);
> };
> ```
> 后端（Node.js）：
> ```javascript
> const WebSocket = require('ws');
> const wss = new WebSocket.Server({ port: 8080 });
> wss.on('connection', (ws) => {
>     ws.on('message', (message) => {
>         ws.send('Received: ' + message);
>     });
> });
> ```


#### 5. PostMessage（窗口间通信）
利用 HTML5 的 `postMessage` API，在不同窗口（如 iframe 或新窗口）之间传递数据，实现跨域通信。

- 在源窗口发送消息。
- 在目标窗口监听消息。

> 源窗口：
> ```javascript
> const targetWindow = window.open('http://example.com');
> targetWindow.postMessage('Hello', 'http://example.com');
> ```
> 目标窗口：
> ```javascript
> window.addEventListener('message', (event) => {
>     if (event.origin === 'http://source.com') {
>         console.log(event.data); // "Hello"
>     }
> });
> ```


### 跨域方法总结
| 方法         | 适用场景                  | 优点                  | 缺点                  |
|--------------|---------------------------|-----------------------|-----------------------|
| CORS         | 通用 API 请求             | 灵活，安全            | 需后端支持            |
| JSONP        | 简单的 GET 请求           | 简单，兼容性好         | 仅限 GET，安全性低     |
| 代理服务器   | 无后端权限时              | 透明，支持所有请求     | 需额外维护            |
| WebSocket    | 实时通信                  | 双向，不受限制         | 不适合简单请求         |
| PostMessage  | 窗口间跨域通信            | 安全，原生支持         | 适用范围有限          |
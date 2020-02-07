### Accept 和 Content-Type 以及其延伸

http 报文的头部通常分为： 通用头部、请求头、响应头、实体头。

> 对于请求方来说，头部结构有： 通用头 | 请求头 | 实体头。
>
> 对于响应方来说，头部结构有： 通用头 | 响应头 | 实体头。

Accpet 就是<span style="color: red">请求头</span>的其中一个，Content-Type 就是<span style="color: red">实体头</span>的其中一个。

Accpet、Content-Type 所设置的都是数据格式如 `application/json、text/plain、text/html、text/xml` 等

其中设置 Accept 请求头表示的意思是：**<span style="color: red">客户端希望接受到的数据的格式</span>**

设置 Content-Type 表示的意思是： **<span style="color: red">客户端发送的实体数据的格式</span>**

如果不设置 Content-Type 的话，服务端可能不能正确解析到发送过来的数据的格式，也就可能不能正确响应数据。

一般情况下我们设置 `Content-Type: application/json`,这表示我们发送给服务端的实体数据的格式是序列化了的 json 格式。现如今大部分情况下发送
给服务端的也就是 json 数据，并且服务端也有处理 json 格式的相关方法。
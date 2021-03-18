## 一次完整的http请求


## osi
应用层
表现层
会话层
传输层
网络层
物理链路层
物理层

## tcp/ip
应用层
传输层
网络层
物理链路层

## 缓存

- cookie
每次http请求会携带cookie，重复请求的时候会造成性能浪费
4k，很小
安全缺陷，由于cookie以明文的方式在网络中传输，因此会有一些不安全
- localStorage
5m，针对同一个域名有一个localStorage。持久存储
localStorage存储的都是明文字符串，储存对象时使用JSON.stringify转换为字符串，读取时使用JSON.parse
getItem;setItem
- sessionStorage
5m
getItem;setItem
但sessionStorage和localStorage有一个本质的区别，那就是前者只是会话级别的存储，并不是持久化存储。会话结束，也就是页面关闭，这部分sessionStorage就不复存在了。
- indexDB
IndexedDB是运行在浏览器中的非关系型数据库
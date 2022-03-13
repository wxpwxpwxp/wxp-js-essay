本文只是简单介绍下浏览器中的常见编解码
## 1. why encode?

### [unicode](https://en.wikipedia.org/wiki/Unicode)
统一编码目前已收集超过 14 w 个字符

### [uft-8](https://en.wikipedia.org/wiki/UTF-8)
* Unicode Transformation Format 简称 utf
* 变长

![binary & utf8 conversion]()

一个标准的 unicode 用二字节表示，但是对于都是 ascii 码表示的字符串，首字节八位都是 0，转换为 utf-8 只需要一字节

## 2. encode & decode in browser
![encode utf example of zhang]()

```js
// encode
'张'.charCodeAt()
> 24352
// 24352 => 101111100100000
// 0101 1111 0010 0000 => 11100101 10111100 10100000
// 0101 1111 0010 0000 => 229 188 160
new TextEncoder().encode('张')
> Uint8Array(3)[229, 188, 160]
```
![decode utf example of zhang]()

```js
// decode
var buffer = new Int8Array([229, 188, 160])
new TextDecoder().decode(buffer)
> '张'
```
## 3.[usvstring](https://developer.mozilla.org/en-US/docs/Web/API/USVString)
js 用 两字节 表示 unicode，最多有 65535 个字符，但是 unicode 有 14 w 个字符，此时可以引入 **paired surrogate code units**（高低代理对）的概念

低代理对：\uD800~\uDBFF

高代理对：\uDC00~\uDFFF

如果低代理后面没有高代理，或者高代理前面没有低代理，字符会被会修改为 \uFFFD (�)

![unpaired surrogate code units]()

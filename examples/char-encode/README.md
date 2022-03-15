本文只是简单介绍下浏览器中的常见编解码
## 1. why encode?

### [unicode](https://en.wikipedia.org/wiki/Unicode)
统一编码目前已收集超过 14 w 个字符

### [uft-8](https://en.wikipedia.org/wiki/UTF-8)
* Unicode Transformation Format 简称 utf
* 变长

![binary & utf8 conversion](https://github.com/wxpwxpwxp/wxp-js-essay/blob/master/examples/char-encode/screensnaps/binary%20%26%20utf8%20conversion.png)

一个标准的 unicode 用二字节表示，但是对于都是 ascii 码表示的字符串，首字节八位都是 0，转换为 utf-8 只需要一字节

## 2. encode & decode in browser
![encode utf example of zhang](https://github.com/wxpwxpwxp/wxp-js-essay/blob/master/examples/char-encode/screensnaps/encode%20utf%20example%20of%20zhang.png)

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
![decode utf example of zhang](https://github.com/wxpwxpwxp/wxp-js-essay/blob/master/examples/char-encode/screensnaps/decode%20utf%20example%20of%20zhang.png)

```js
// decode
var buffer = new Uint8Array([229, 188, 160])
new TextDecoder().decode(buffer)
> '张'
```
## 3. [usvstring](https://developer.mozilla.org/en-US/docs/Web/API/USVString)
js 用 两字节 表示 unicode，最多有 65535 个字符，但是 unicode 有 14 w 个字符，此时可以引入 **paired surrogate code units**（高低代理对）的概念

关于高低代理对请参考 https://www.lighttag.io/blog/unicode-surrogate-pairs/ 在此就不赘述了

低代理对：\uD800~\uDBFF

高代理对：\uDC00~\uDFFF

如果低代理后面没有高代理，或者高代理前面没有低代理，字符会被会修改为 \uFFFD (�)

![unpaired surrogate code units](https://github.com/wxpwxpwxp/wxp-js-essay/blob/master/examples/char-encode/screensnaps/unpaired%20surrogate%20code%20units.png)

这里需要注意一点大部分 js 自身的 binary to string，输出都是 domstring, usvstring 标准的，因此如果二进制数据中存在不成对的代理对，就会出现原二进制会被破坏

如下 textDecoder 的 decode 输出就是 usvstring

![usvstring for textdecoder](https://github.com/wxpwxpwxp/wxp-js-essay/blob/master/examples/char-encode/screensnaps/usvstring%20for%20textdecoder.png)

### 更新
我一直以为是 textDecoder 将 \ud83d to \ufffd

写单测的时候发现 textEecoder 也会将输入的 string 变成 usvstring 规范的


```js
'\ud83d'.charCodeAt()
> 55357
// 55357 => 1101100000111101
// 1101 1000 0011 1101 => 11101101 10100000 10111101
// 1101 1000 0011 1101 => 237 160 189
new TextEncoder().encode('\ud83d')
> Uint8Array(3)[239, 191, 189]
new TextEncoder().encode('\ufffd')
> Uint8Array(3)[239, 191, 189]
var buffer = new Uint8Array([237, 160, 189])
new TextDecoder().decode(buffer)
> '���' ??? 这里怎么变成三个 � 了
```
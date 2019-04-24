# 一些细节

## \n

\n 要放在引号里面，例如：

```javascript
var str = 'hello\nworld';
```

如果实在不想放在引号里面可以通过创建变量，然后使用字符串拼接的形式，例如：

```javascript
var newLine = '\n';
var str = 'hello'+ newLine +'world';
```

## \

一个 \ 在字符串里面并不代表 \，代表的是转义的意思，例如下面写了一个 \ 但其实并不会输出：

```javascript
console.log('hello \world'); // hello world
```

如果我想输出怎么做呢？需要写两次，第一个\还是代表转义的意思，例如：

```javascript
console.log('hello \\world');
```

## isNaN

我说了 isNaN 讨厌数字，所以下面的结果是 false，这里大家必然没有什么问题吧 ~

```javascript
console.log( isNaN(18) );
```

但是！下面我明明里面放的是字符串的 '18'，已经不是数字了，它为什么还是讨厌我呢？（讨厌的意思是：结果为什么还是 false 呢）

```javascript
console.log( isNaN('18') ); // false
```

因为呀，这里 JS 偷偷帮我们进行了一个转换，上面的代码就相当于：

```javascript
// Number('18') 之后就还是一个数字 18，所以还是讨厌，还是 false
console.log( isNaN( Number('18') ) ); // false
```

## 关于 parseInt() 和 Number()

parseInt() 比较'牛'一点，例如它可以进行如下转换：

```javascript
parseInt('233px'); // 233
```

但是 Number() 就搞不定上面的事情，例如：

```javascript
Number('233px'); // NaN
```

Number() 只能搞定纯数字的字符串，例如：

```javascript
Number('233'); // 233
```
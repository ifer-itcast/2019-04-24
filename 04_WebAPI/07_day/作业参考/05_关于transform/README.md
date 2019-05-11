# 关于 transform

## 缘起

拖拽 div 的两种思路：

- 按下时就算出 disX，移动时用鼠标坐标减去 disX 的值就是盒子的 left 值
- 按下时记录盒子的 offsetLeft 以及 clientX，移动时用盒子按下时的 offsetLeft + (移动时的 clientX - 按下时的 clientX)

## 错误的 translate 值

如果改变的不再是 oDiv 的 left 值，而是 oDiv 的 translate 值，还可以使用上面的计算方式吗？

答案肯定是不行的。

```javascript
// l 本来指的应该是 oBox 的 left 值，这里直接把 l 使用在了 translate 上，那就相当于在定位的基础上又直接 translate 了 l 的值，那肯定是不行的
var l = originLeft + (e.clientX - originClientX);
oBox.style.transform = 'translate(' + l + 'px, ' + t + 'px)';
```

## 解决，写法1

下次移动的时候用当前的 moveX 再加上 1 次原来的 moveX 就可以了（注意是 1 此，所以不能在 mousemove 中加）

## 解决，写法2

道理和**解决1**一样，命名了不同的变量方便大家理解

## 解决，写法3

利用自定义属性，把该挂的都挂在 oBox 上

## 解决，写法4

mousedown 时获取上次的 translate 值，至于怎么获取呢？大家思考下

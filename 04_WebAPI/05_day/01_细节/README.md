# 一些细节

## 关于 Margin

- 不要给想要运动的物体在样式初始化时加 margin，如果想要改变它的位置，可以使用 top 或 left
- 如果在应用了定位的同时竟然又加了 margin（严重不推荐，因为这里 top、left 完全可以搞定 margin 的功能），那需要在 mousemove 的时候减去这个值，当然你在 mousedown 的时候 disX = e.pageX - this.offsetLeft + marginLeft 也是 ok 的

## 关于 Translate

> 假如给一个 div 设置 margin-left: 100，那 div.offsetLeft 的值就是 100，说明 margin 的值是计算在 offsetLeft 之内的

> 假如给一个 div 设置 translateX(100px)，那 div.offsetLeft 的值依然是 0，说明 translate 的值是不计算 offsetLeft 之内的

```javascript
// 按下那一刻鼠标到盒子的距离，注意需要减去 translate 的值，因为 offsetLeft 并不包含 translate
var disX = e.pageX - this.offsetLeft - 100; // #1

// 移动的时候也要特意减去 translate 的值，不至于出现偏离的现象
var left = e.pageX - disX - 100; // #2

// 把 #1 的 disX 代入 #2，发现对 translate 的操作是可以抵消的，这也正是我们用 translate 进行初始化位置时，不用特意修改代码但效果依然符合预期的原因！
```

## 关于拖拽按下时的默认事件

在 mousedown 时最好使用 e.preventDefault() 阻止下和 oDiv 相关的默认事件，例如下面代码我在按下 div 的时候却会触发 onselectstart 这个默认事件：

```html
<div id="box"></div>
<script>
document.querySelector('div').onselectstart = function() {
    console.log(1);
};
</script>
```
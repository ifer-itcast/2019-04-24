## 缘起

就干了一件事：生成随机方块

## 食物对象

刷新生成随机食物

## 删除食物

每次渲染之前删除之前的食物，涉及到数组塌陷的问题

```javascript
function remove(arr) {
    for(var i = arr.length - 1; i >= 0; i --) {
        // 注意！下面两句话是由顺序关系的
        // 删除页面中真正的那个元素
        arr[i].parentNode.removeChild(arr[i]);
        // 删除数组中的那个元素
        arr.splice(i, 1);
    }
}
```

## 命名冲突问题

一定程度上解决了命名冲突，当然挂载到 window 上的该冲突还是会冲突

```javascript
;(function(window, undefined) {
    // 将系统变量以参数形式传递到自执行函数内部
    // 好处1：提高查找速度，些许性能提升
    // 好处2：低版本 IE 可以在外部修改掉 undefined，这样是为了防止修改得到真正的 undefined
    window.Food = Food;
})(window);
```

## 蛇对象

## 删除蛇

每次渲染之前删除之前的蛇，涉及到数组塌陷的问题

> 注意这个删除蛇的方法和删除食物的方法长得一样，其实也可以提取到了 Tools 里面，当然这样这样是可以通过全局的 Tools 访问到的，至于方法需不需要访问是根据需求来的，一定不是死的...

## 游戏对象

负责把所有的逻辑串起来

## 蛇的移动方法

每次调用 this.snake.move() 只能走一步

```javascript
Game.prototype.start = function () {
    // 渲染食物
    this.food.render(this.oMap);
    // 渲染蛇
    this.snake.render(this.oMap);

    // 移动只是改变的数据
    this.snake.move();
    // 渲染才是真正改变页面上的元素
    this.snake.render(this.oMap);
};
```

## 持续运动蛇

定时器

```javascript
// 开个定时器重复调用蛇的 move 和 render 方法即可
continueMove(this);
```

## 键盘控制蛇运动的方向

## 蛇吃食物

关键：在蛇每次 move 的时候去判断蛇头和食物的坐标是否重合

关于 push 最后一个重复项的解释如下：

```javascript
// 最后一列的数据重复不重复都不会影响最终的结果，它都会被前一个（倒数第二个）的位置所替换
var test1 = [
    {
        x: 3, y: 1, color: 'red', // 蛇头
    },
    {
        x: 2, y: 1, color: 'blue'
    },
    {
        x: 1, y: 1, color: 'blue'
    }
];

var test2 = [
    {
        x: 3, y: 1, color: 'red', // 蛇头
    },
    {
        x: 2, y: 1, color: 'blue'
    },
    {
        x: 2, y: 1, color: 'blue'
    }
];
for (var i = test1.length - 1; i > 0; i--) {
    test1[i].x = test1[i - 1].x;
    test1[i].y = test1[i - 1].y;
}
console.log(test1);
```
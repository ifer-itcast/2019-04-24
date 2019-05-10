# 移动端轮播图

## 缘起

- 假如有 A、B、C 三张图，布局成 D、A、B、C、A 的形式

## 往左拖动

- 首先让 oUl 动起来（能进行拖拽）
- touchstart 时记录当前位置，并做一些归位操作，例如moveX = 0，transition = 'none'
- touchmove 的时候主要是拖动 oUl
- touchend 的时候才是真正的运动 oUl

## 无缝拖动

- 瞬间跳转的操作是在 oUl 的 transitionend 中完成的，一定注意跳转改变的不再是 left 值而是 transform 的值（两个一定不要混用！）
- 最后一张 1 运动完了，我就瞬间在跳到 1
- 第一张的 3 运动完了，我就瞬间再跳到 3

## 激活小点

注意这一步也是在 transitionend 中进行的

```javascript
oOl.querySelector('.active').classList.remove('active');
oOl.children[iMoveNum].classList.add('active');
```

## 自动运动

- 开个定时器让 iMoveNum++ 即可，至于 iMoveNum 的界限值和小点的激活操作之前都已经在 transitionend 做过了
- 注意每次按下时清除原来的定时器，抬起时再重新开启

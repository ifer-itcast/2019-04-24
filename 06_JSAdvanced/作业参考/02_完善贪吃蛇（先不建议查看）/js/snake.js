~(function (window, undefined) {
    var aSnake = [];
    function Snake(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.direction = options.direction || 'right';

        // 深拷贝还会被影响的问题
        this.body = [
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
    }

    Snake.prototype.render = function (oMap) {
        Tools.remove(aSnake);
        // 来个集装箱
        var oFrag = document.createDocumentFragment();
        for (var i = 0; i < this.body.length; i++) {
            var oDiv = document.createElement('div');
            oDiv.style.position = 'absolute';
            oDiv.style.width = this.width + 'px';
            oDiv.style.height = this.height + 'px';

            oDiv.style.left = this.body[i].x * this.width + 'px';
            oDiv.style.top = this.body[i].y * this.height + 'px';

            oDiv.style.backgroundColor = this.body[i].color;

            // 一件件塞进集装箱
            oFrag.appendChild(oDiv);
            // 记录蛇
            aSnake.push(oDiv);
        }
        oMap.appendChild(oFrag);
    };

    Snake.prototype.move = function (oGame) {
        // 身体移动，当前蛇节的位置改成上一个蛇节的位置即可
        // 后一个等于前一个，第一个会以蛇头为标杆，但不会改变蛇头
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 头移动
        var head = this.body[0];
        switch (this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }

        // 蛇吃食物
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        // 判断蛇头的坐标是否和食物的坐标重合
        if (headX === oGame.oFood.x && headY === oGame.oFood.y) {
            var last = this.body[this.body.length - 1];
            // 将最后一节的身体放到 this.body 总数据中（注意并不是页面中）
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            // 重新渲染食物
            oGame.oFood.render(oGame.oMap);

            // 积分
            oGame.score++;
            oScore.innerHTML = oGame.score;

            // 来个响
            Tools.playAudio(audios[Tools.random(0, audios.length - 1)]);
        }

        // 撞到自己身体就 over ...
        // 从 1 开始才是身体
        // 这里性能堪忧，待优化
        for (var i = 1; i < oGame.oSnake.body.length; i++) {
            if (oGame.oSnake.body[i].x == oGame.oSnake.body[0].x && oGame.oSnake.body[i].y == oGame.oSnake.body[0].y) {
                oGame.over();
            }
        }
    };

    window.Snake = Snake;
})(window);
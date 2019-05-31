~(function (window, undefined) {
    function Game(oMap) {
        this.oMap = oMap;
        this.oFood = new Food();
        this.oSnake = new Snake();
        bindEvent(this);
        createAudio();
        this.init();
    }
    Game.prototype.init = function () {
        // 数据恢复默认
        this.oSnake.body = [
            {x: 3, y: 1, color: 'red'}, // 蛇头
            {x: 2, y: 1, color: 'blue'},
            {x: 1, y: 1, color: 'blue'}
        ];

        // 渲染食物
        this.oFood.render(this.oMap);
        // 渲染蛇
        this.oSnake.render(this.oMap);

        // 默认方向是往右跑，此时只允许按上下
        this.allowDir = {
            up: true, // 不要起名 top，和 window 下的冲突
            right: false,
            bottom: true,
            left: false
        };
        // !!
        this.oSnake.direction = 'right';
        // 默认积分
        this.score = 0;
        oScore.innerHTML = this.score;
        oBtn.innerHTML = '开始';
        bBar = true;
    };
    Game.prototype.start = function () {
        /* // 移动只是改变的数据
        this.oSnake.move();
        // 渲染才是真正改变页面上的元素
        this.oSnake.render(this.oMap); */

        continueMove(this);
    };
    Game.prototype.pause = function () {
        clearInterval(this.timer);
    };
    Game.prototype.over = function () {
        clearInterval(this.timer);
        Tools.playAudio('./audio/die1.wav');
        alert('当前得分' + this.score);
        this.init();
    };
    // 持续运动蛇
    function continueMove(oGame) {
        console.log(oGame.allowDir);
        oGame.timer = setInterval(function () {
            // 把食物信息传过去为了判断在运动的时候蛇头是否和食物重合
            // 如果重合了需要重新渲染食物，需要用到 oMap 对象
            // 干脆都传过去
            // oGame.oSnake.move(oGame.oFood, oGame.oMap);
            oGame.oSnake.move(oGame); // 只是改变数据
            oGame.oSnake.render(oGame.oMap); // 真正渲染页面

            var maxX = oGame.oMap.offsetWidth / oGame.oSnake.width;
            var maxY = oGame.oMap.offsetHeight / oGame.oSnake.height;
            // 蛇头
            var x = oGame.oSnake.body[0].x;
            var y = oGame.oSnake.body[0].y;

            // 看蛇头有没有撞边就 ok 啦
            if (x < 0 || x >= maxX) {
                oGame.over();
            }
            if (y < 0 || y >= maxY) {
                oGame.over();
            }
        }, 150);
    }

    // 键盘控制蛇移动的方向
    function bindEvent(oGame) {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    if (oGame.allowDir.left) {
                        oGame.oSnake.direction = 'left';
                        oGame.allowDir.up = true;
                        oGame.allowDir.right = false;
                        oGame.allowDir.bottom = true;
                        oGame.allowDir.left = false;
                    }
                    break;
                case 38:
                    if (oGame.allowDir.up) {
                        oGame.oSnake.direction = 'top';
                        oGame.allowDir.up = false;
                        oGame.allowDir.right = true;
                        oGame.allowDir.bottom = false;
                        oGame.allowDir.left = true;
                    }
                    break;
                case 39:
                    if (oGame.allowDir.right) {
                        oGame.oSnake.direction = 'right';
                        oGame.allowDir.up = true;
                        oGame.allowDir.right = false;
                        oGame.allowDir.bottom = true;
                        oGame.allowDir.left = false;
                    }
                    break;
                case 40:
                    if (oGame.allowDir.bottom) {
                        oGame.oSnake.direction = 'bottom';
                        oGame.allowDir.up = false;
                        oGame.allowDir.right = true;
                        oGame.allowDir.bottom = false;
                        oGame.allowDir.left = true;
                    }
                    break;
                case 32:
                    oBtn.click();
            }
        });
    }

    function createAudio() {
        window.audios = ['./audio/duang1.wav','./audio/duang2.wav'];
        window.oAudio = document.createElement('audio');
        document.body.appendChild(oAudio);
    }
    window.Game = Game;
})(window);
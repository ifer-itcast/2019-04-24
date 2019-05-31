// main.js
var oMap = document.querySelector('#map');
var oScore = document.querySelector('.score');
var oBtn = document.querySelector('.btn');

var line = new Line(oMap);
var game = new Game(oMap);

var bBar = true;
oBtn.onclick = function () {
    this.innerHTML = bBar ? '暂停' : '开始';
    bBar ? game.start() : game.pause();
    bBar = !bBar;
};
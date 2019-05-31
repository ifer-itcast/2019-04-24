~(function (window, undefined) {
    var aFood = [];
    function Food(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'red';
    }

    // oMap 当然也可以作为 Food 的参数传递
    // render = init + random 的操作
    Food.prototype.render = function (oMap) {
        // 一上来就先删除一波上次的食物
        Tools.remove(aFood);

        var oDiv = document.createElement('div');
        oDiv.style.position = 'absolute';
        oDiv.style.width = this.width + 'px';
        oDiv.style.height = this.height + 'px';
        oDiv.style.backgroundColor = this.color;

        // 这里的位置之所以挂载在 this 上面，因为后面要用到
        this.x = Tools.random(0, oMap.offsetWidth / this.width - 1) * this.width;
        this.y = Tools.random(0, oMap.offsetHeight / this.height - 1) * this.height;

        oDiv.style.top = this.y + 'px';
        oDiv.style.left = this.x + 'px';

        oMap.appendChild(oDiv);
        // 存储下添加的食物
        aFood.push(oDiv);
    };

    // 删除这个方法并不希望外部访问

    window.Food = Food;
})(window);
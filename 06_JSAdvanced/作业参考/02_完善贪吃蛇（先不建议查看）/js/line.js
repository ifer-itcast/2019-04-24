~(function (window, undefined) {
    function Line(oMap, options) {
        options = options || {};
        this.oMap = oMap;
        // 行间隙
        this.rowSpace = options.rowSpace || 20;
        // 列间隙
        this.colSpace = options.colSpace || 20;
        // 行数量
        this.rows = this.oMap.offsetHeight / this.rowSpace;
        // 列数量
        this.cols = this.oMap.offsetWidth / this.colSpace;
        // 渲染
        this.render();
    }
    Line.prototype.render = function () {
        rLine(this, 'rows');
        rLine(this, 'cols');
    }
    function rLine(line, dir) {
        var oFrag = document.createDocumentFragment();
        for (var i = 1; i < line[dir]; i++) {
            var oI = document.createElement('i');
            oI.style.position = 'absolute';
            if(dir === 'cols') {
                oI.style.borderLeft = '1px dashed #ccc';
                oI.style.left = i * line.colSpace + 'px';
                oI.style.top = 0;
                oI.style.bottom = 0;
            } else if(dir === 'rows') {
                oI.style.borderTop = '1px dashed #ccc';
                oI.style.top = i * line.rowSpace + 'px';
                oI.style.right = 0;
                oI.style.left = 0;
            }
            oFrag.appendChild(oI);
        }
        this.oMap.appendChild(oFrag);
    }
    window.Line = Line;
})(window);
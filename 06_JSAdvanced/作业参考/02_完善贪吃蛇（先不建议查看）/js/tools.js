~(function (window, undefined) {
    var Tools = {
        random: function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        remove: function (arr) {
            for (var i = arr.length - 1; i >= 0; i--) {
                // 删除页面中真正的那个元素
                arr[i].parentNode.removeChild(arr[i]);
                // 删除数组中的那个元素
                arr.splice(i, 1);
            }
        },
        playAudio(src) {
            oAudio.src = src;
            oAudio.addEventListener('canplay', function() {
                this.play();
            });
        }
    };
    window.Tools = Tools;
})(window);
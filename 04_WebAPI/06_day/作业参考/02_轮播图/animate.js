function animate(obj, target, fn) {
    clearInterval(obj.timer);
    var speed = 0;
    obj.timer = setInterval(function() {
        speed = (target - obj.offsetLeft) / 30;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        obj.style.left = obj.offsetLeft + speed + 'px';

        if(obj.offsetLeft == target) {
            clearInterval(obj.timer);
            fn && fn();
        }
    }, 15);
}
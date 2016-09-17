function createSlider(cont, delay) {
    var _this = this;
    this.autoplay = delay?true:false;
    this.delay = delay;
    this.container = document.querySelector(cont);
    this.slides = [].map.call(this.container.querySelectorAll('.slide'), function(el) {
        var slide = {};
        slide.image = el.querySelector('img').src;
        //slide.html = el.querySelector('.slide-text');
        return slide;

    })
    this.curNum = 0;
    var cur = document.createElement('div');
    cur.className = 'current-slide';
    cur.style['background-image'] = 'url("' + this.slides[this.curNum].image + '")';
    var prev = document.createElement('div');
    prev.className = 'prev-slide';
    this.curSlide = this.container.appendChild(cur);
    this.prevSlide = this.container.appendChild(prev);
    this.slideTo = function(num) {
        this.prevSlide.className = 'prev-slide';
        this.prevSlide.style['background-image'] = 'url("' + this.slides[this.curNum].image + '")';
        setTimeout(function() {
            _this.prevSlide.className = 'prev-slide fade'
        }, 50);
        this.curSlide.style['background-image'] = 'url("' + this.slides[num].image + '")';
        this.curNum = num;
        if (this.interval){
            clearInterval(this.interval);
            this.run();
        }
    };
    this.next = function() {
        if (this.curNum + 1 == this.slides.length) {
            this.slideTo(0)
        } else {
            this.slideTo(this.curNum + 1)
        }
    }
    this.prev = function() {
        if (this.curNum === 0) {
            this.slideTo(this.slides.length - 1)
        } else {
            this.slideTo(this.curNum - 1)
        }
    }
    this.run = function() {
       if (this.autoplay){
           this.interval = setInterval(function() {
            _this.next()
        }, this.delay);
       }
       
    }
    this.run();
}

var slider = new createSlider('.slider-cont',5000);
document.querySelector('.navigation-left').addEventListener('click', function() {
    slider.prev();
});
document.querySelector('.navigation-right').addEventListener('click', function() {
    slider.next();
})
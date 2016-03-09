$(function(){

    // vars
    var $container = $('.container');
    var $slider = $('#slider');
    var $li = $slider.find('li');
    var $nav_left = $slider.find('nav img:eq(0)');
    var $nav_right = $slider.find('nav img:eq(1)');
    var active = 0;
    var zIndex = 100;
    var mouseIn = false;
    var direction = 'right-to-left';

    // action
    animate();
    setInterval(animate, 700);
    $slider.mouseover(pauseAnimation).mouseleave(resumeAnimation);
    $nav_left.click(function(){
        console.log('left clicked');
        direction = 'left-to-right';
        animate(true);
    });
    $nav_right.click(function(){
        console.log('right clicked');
        direction = 'right-to-left';
        animate(true);
    });


    // functions
    function pauseAnimation() {
        mouseIn = true;
    }
    function resumeAnimation() {
        mouseIn = false;
    }
    function animate(force) {

        if ( ! force && mouseIn ) return;

        var w = $slider.width();
        var left = 0;
        if ( direction == 'right-to-left' ) {
            increaseActiveNo();
            left = w;
        }
        else {
            decreaseActiveNo();
            left = -w;
        }
        $li.eq(getActiveNo())
            .css({
                'display' : 'block'
                , 'z-index': getNextIndex()
                , 'left' : left
                , 'width' : w
            } )
            .animate({left:0}, 300, function(){
                $li.css('display', 'none');
                $li.eq(getActiveNo()).css('display', 'block');
            });

    }

    function getActiveNo() {
        if ( active >= $li.length ) active = 0;
        else if ( active < 0 ) active = $li.length - 1;
        return active;
    }
    function increaseActiveNo() {
        ++active;
    }
    function decreaseActiveNo() {
        --active;
    }
    function getNextIndex() {
        return ++zIndex;
    }
});


$(function(){

    // vars
    var $container = $('.container');
    var $button_pause = $container.find(">nav").find("span:eq(0)");
    var $button_play = $container.find(">nav").find("span:eq(1)");
    var $slider = $('#slider');
    var $li = $slider.find('li');
    var $nav_left = $slider.find('nav img:eq(0)');
    var $nav_right = $slider.find('nav img:eq(1)');
    var active = 0;
    var zIndex = 100;
    var mouseIn = false;
    var pause = false;
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

    $button_pause.click(function(){
        console.log('pause clicked');
        pause = true;
    });

    $button_play.click(function(){
        console.log('play clicked');
        pause = false;
    });

    // functions
    function pauseAnimation() {
        mouseIn = true;
    }
    function resumeAnimation() {
        mouseIn = false;
    }
    function animate(force) {

        if ( ! force ) if ( pause || mouseIn ) return;

        var w = $slider.width();
        if ( direction == 'right-to-left' ) {
            increaseActiveNo();
            var left = w;
        }
        else {
            decreaseActiveNo();
            var left = -w;
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
        return ++zIndex;;
    }
});


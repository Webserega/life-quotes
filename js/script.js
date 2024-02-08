jQuery(document).ready(function($) {

var txt_head_arr = new Array ();


var comp = false;
var scrollPercentage;
var cur_block;


    if (!device.tablet() && !device.mobile()) // комп
    {
         $('.good_line').css('display','block');
        comp = true;
    }




$(window).scroll(function(e){

if (comp)
ChangeScroll ();

animatedBlocks();

});

    function HeadStart ()
    {
       $('.txt-anim').each(function () {

        var ind = Number(String($(this).attr('id')).substr(5));
       txt_head_arr [ind-1] = $(this).html();
       $(this).html('');

       });
    }

    function HeadAnim (obj,num)
    {
        var ind = Number(String($(obj).attr('id')).substr(5)) - 1;
        var new_num = num + 1;
        var delay_time = 70;

        $(obj).html($(obj).html() + txt_head_arr[ind].charAt(num));

        if (new_num < String(txt_head_arr[ind]).length)
        {
            if (txt_head_arr[ind].charAt(new_num) == ' ')
            delay_time = 10;
        setTimeout(function () {HeadAnim(obj,new_num)}, delay_time);
        }

    }




function ChangeScroll ()
{
scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    if (scrollPercentage > 0.05)
    {
        if (!$('.good_line').hasClass('show'))
        {
        $('.good_line').addClass('show');
        }
    }
    else if ($('.good_line').hasClass('show'))
    {
        $('.good_line').removeClass('show');
    }

 $('.good_line').css ("width",(scrollPercentage * 100) + '%' );


}

    $('a[href^="#"]').click( function(e)
    {
	    var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0)
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 30 }, 1000);
        e.preventDefault();
    });


        // Анимация при долистывании к контенту
        function animatedBlocks () {
        		$('.need-anim,.txt-anim').each(function () {
        			var scrollPosTop = $(window).scrollTop(), // позиция скролла, верх страницы
        				blockPosTop = $(this).offset().top, // позиция блока (верх), который нужно анимировать
        				blockPosBottom = blockPosTop+$(this).height(), // позиция блока (низ), который нужно анимировать
        				windowHeight = $(window).height(), // высота окна браузера
        				windowLineTop = scrollPosTop+(windowHeight* 0.05), // верхняя граница окна браузера при пересечении которой анимируется блок
        				windowsLineBottom = scrollPosTop+(windowHeight* 0.95); // нижняя граница окна браузера при пересечении которой анимируется блок

        			if (
        				(windowLineTop <= blockPosBottom && windowLineTop > blockPosTop) // если верхняя часть экрана выше нижней границы блока, но не прошла блок полностью
        				|| (windowsLineBottom >= blockPosTop && windowsLineBottom < blockPosBottom) // если нижняя часть экрана дошла до верхней границы блока, но не прошла блок полностью
                        || ((blockPosTop > windowLineTop && blockPosTop < windowsLineBottom) || (blockPosBottom > windowLineTop && blockPosBottom < windowsLineBottom)) // или блок по центру экрана
        			) {


                        if ($(this).hasClass('txt-anim'))
                        {
                        $(this).removeClass('txt-anim');
                        HeadAnim ($(this),0);
                        }
        			    else $(this).removeClass('need-animate').addClass('show');


        			}
        		});
        	}


            setTimeout(function () {animatedBlocks();}, 300);



  HeadStart ();


});



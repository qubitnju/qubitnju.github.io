$(function () {
    $('#nav_0').SlidingBlock();
    $('#nav_1').SlidingBlock({
        // cur_idx: 2,
        cur_idx: 0,
        cur_class: 'current',
        cur_show:true,
        slider_btm:'-10%',
        slider_h:'120%',
        before_show:false,
        slider_class:'sliding-block-1'
    });
    $('#nav_2').SlidingBlock({
        cur_idx: 0,
        cur_class: 'current',
        cur_show:true,
        slider_btm:'-10%',
        slider_h:'120%'
    });
    $('#nav_3').SlidingBlock({
        slider_btm:'-20%',
        slider_h:'140%',
        before_show:true
    });
    $('#nav_4').SlidingBlock({
        slider_btm:'-20%',
        slider_h:'140%',
        cur_show:true,
        before_show:false,
        event_type:'click',
        delay_tm: 0
    });
});
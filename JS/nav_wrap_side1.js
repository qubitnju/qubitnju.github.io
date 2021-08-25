function Floor(lc, tip) {
    this.lc = lc;
    this.tip = tip;
    this.ch = $(window).height() / 2;
    this.init();
    this.tip_click();
    this.win_scroll();
}

Floor.prototype.init = function () {
    // 求每一层的top值
    var h;
    this.arr = this.lc.map(function (index, div) {
        h = $(div).offset().top + $(div).height();
        return $(div).offset().top;
    });
    // 最后一层的高度
    this.arr.push(h);
    console.log(this.arr);
}
Floor.prototype.tip_click = function () {
    var that = this;
    this.tip.find("ul>li").click(function () {
        $("html,body").animate({"scrollTop": 0});
    });
    this.tip.find("ol>li").click(function () {
        $("html,body").animate({"scrollTop": that.arr[$(this).index()]});
    });
}
Floor.prototype.win_scroll = function () {
    var that = this;
    $(window).resize(function () {
        that.ch = $(window).height() / 2;
    });
    $(window).scroll(function () {
        that.tip.find("ol>li").css("background", "");
        var st = $(window).scrollTop();
        document.title = st;
        var l = that.arr.length;

        if (st < that.arr[0] - that.ch) {
            that.tip.fadeOut();
        } else {
            that.tip.fadeIn();
        }

        for (var i = 0; i < l - 1; i++) {
            var min = that.arr[i];
            var max = that.arr[i + 1];
            if (min - that.ch < st && st < max - that.ch) {
                that.tip.find("ol>li").eq(i).css("background", "white");
            }
        }
    });
}

new Floor($(".lc"), $(".tip"));
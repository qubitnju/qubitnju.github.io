window.onload = function () {
    var allDiv = document.querySelectorAll(".nav-wrap-side div");
    var allNavLi = document.querySelectorAll("#nav_wrap_side li");
    /**
     * 滚动一定距离时，返回顶部按钮出现    滚动页面改变导航li的弹出
     */
    function toTopIcon() {
        window.onscroll = function () {
            var d = document.documentElement.scrollTop || document.body.scrollTop;//获取滚动条高度
            var viewd = document.documentElement.clientHeight;//获取可视区高度
            var toTop = document.querySelector("#toTop");
            if (d > viewd) {
                toTop.className = "on";
            } else {
                toTop.className = "";
            }
            for (var i = 0; i < allDiv.length; i++) {
                allDiv[i].index = i;
                if (d >= allDiv[i].offsetTop && d < allDiv[i].offsetTop + 500) {
                    for (var j = 0; j < allDiv.length; j++) {
                        allNavLi[j].className = "";
                        allNavLi[i].className = "on";
                    }
                }
            }
        }
    }

    /**
     * 点击导航li  li弹出  页面跳转到相应div位置
     * scrollTo默认的是瞬间滚动到坐标位置，把behavior属性设置为smooth就可以支持平滑滚动了，不过缺点是无法设置滚动速率
     */
    function navLiPop() {
        for (var i = 0; i < allNavLi.length; i++){
            allNavLi[i].index = i;
            allNavLi[i].onclick = function () {
                for (var j = 0; j < allNavLi.length; j++){
                    window.scrollTo({
                        top:allDiv[this.index].offsetTop,
                        behavior:"smooth"
                    });
                }
            }
        }
    }

    /**
     * 点击按钮回到顶部（定时器平滑滚动）
     */
    function navToTop() {
        var toTop = document.querySelector("#toTop");
        toTop.onclick = function() {
            var timer = setInterval(toTop,8);
            function toTop() {
                var d = document.documentElement.scrollTop || document.body.scrollTop;
                d -= 100;
                if(d > 0){
                    window.scrollTo(0,d);
                }else {
                    window.scrollTo(0,0);
                    clearInterval(timer);
                    for (var i = 0; i < allNavLi.length; i++){
                        allNavLi[i].index = i;
                        for (var j = 0; j < allNavLi.length; j++){
                            allNavLi[j].className = "";
                            allNavLi[0].className = "on";
                        }
                    }
                }
            }
        }
    }
    navLiPop();
    toTopIcon();
    navToTop();
}
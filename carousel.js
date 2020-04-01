/* global define:true */

define(["jquery"], function ($) {
    var carousel = function (config) {
        // 设置
        var cfg = {
            box: "body",
            idx: 0,
            time: 2000,
            fade: 1000,
            timer: "",
            img: [
                "img/b1.png",
                "img/b2.png",
                "img/b3.png",
                "img/b4.png",
                "img/b5.png"
            ],
            move: false
        };
        $.extend(cfg, config);

        // 初始化
        var $box = $(config.box),
            $slider = $('<div class="slider" id="slider"></div>'),
            $left = $('<span id="left"><</span>'),
            $right = $('<span id="right">></span>'),
            $navs = $('<ul class="nav" id="navs"></ul>');

        function init() {
            // img first
            $slider.append(
                $(
                    '<div class="slide"><img src="' +
                    cfg.img[cfg.img.length - 1] +
                    '" alt=""></div>'
                )
            );

            // navs & imgs
            for (var i = 0; i < cfg.img.length; i++) {
                var $div = $(
                    '<div class="slide"><img src="' + cfg.img[i] + '" alt=""></div>'
                );
                var $li = $("<li>" + (i + 1) + "</li>");
                $slider.append($div);
                $navs.append($li);
            }

            // img last
            $slider.append(
                $('<div class="slide"><img src="' + cfg.img[0] + '" alt=""></div>')
            );

            // init
            $box.append($slider);
            $slider.after($left);
            $left.after($right);
            $right.after($navs);

            changenavs(cfg.idx);
        }
        $(document).ready(function () {
            init();
        });

        // 图
        function changeimgs(){
                $slider.stop().animate({ left: -(cfg.idx + 1) * 1200 }, cfg.fade)
        }

        // 左
        function showLeft() {
            if(!$slider.is(":animated")){
            cfg.idx--;
            if (cfg.idx < 0) {
                $slider.css("left", (cfg.img.length + 1) * -1200 + "px");
                cfg.idx = cfg.img.length - 1;
            }
            changeimgs(cfg.idx);
            changenavs(cfg.idx);}
        }
        $left.click(function () {
            cfg.move = false;
            showLeft();
            cfg.move = true;
        });

        // 右
        function showRight() {
            if(!$slider.is(":animated")){
            cfg.idx++;
            if (cfg.idx > cfg.img.length) {
                $slider.css("left", "-1200px");
                cfg.idx = 1;
            }
            changeimgs(cfg.idx);
            changenavs(cfg.idx);}
        }
        $right.click(function () {
            showRight();
        });

        // 点
        for (var n = 0; n < $navs.children("li").length; n++) {
            $("#navs li").click(function () {
                if(!$slider.is(":animated")){
                cfg.idx = $(this).index();
                changeimgs(cfg.idx);
                changenavs(cfg.idx);}
            });
        }
        function changenavs(idx) {
            if (idx < 0) {
                idx = cfg.idx - 1;
            } else if (idx > cfg.img.length - 1) {
                idx = 0;
            }
            $navs
                .children("li")
                .siblings()
                .removeClass("active");
            $navs
                .children("li")
                .eq(idx)
                .addClass("active");
        }

        // show
        function show() {
            cfg.timer = setInterval(function () {
                showRight();
                console.log(cfg.idx);
            }, cfg.time+cfg.fade);
        }
        $box.mouseenter(function () {
            $left.css("opacity", "50%");
            $right.css("opacity", "50%");
            clearInterval(cfg.timer);
            console.log(cfg.idx);
        });
        $box.mouseleave(function () {
            $left.css("opacity", "0");
            $right.css("opacity", "0");
            show();
        });

        return {
            show: show
        };
    };
    return carousel;
});
window.lzimg = (function(window, document) {
    'use strict';

    var Lzimg = function(ele) {
        this.ele = ele;
        this.render();
        this.listen();
    };

    Lzimg.prototype = {
        init: function() {
            imgList.push(this.ele);
        },
        render: function() {
            document.addEventListener
                ? document.addEventListener('DOMContentLoaded', lzImages, false)
                : (window.onload = lzImages);
        },
        listen: function() {
            window.onscroll = lzImages;
        }
    };

    var imgList = [];

    var intoViewer = function(ele) {
        var pos = ele.getBoundingClientRect();
        return pos.top <= window.innerHeight;
    };

    var replaceSrc = function(img, cb) {
        img.src = img.getAttribute('data-lzimg');
        cb && cb();
    };

    var removeLoaded = function(ele, index) {
        if (imgList.indexOf(ele) > -1) {
            imgList.splice(index, 1);
        }
    };

    var lzImages = function() {
        for (var i = 0, len = imgList.length; i < len; i++) {
            var cur = imgList[i];
            if (intoViewer(cur)) {
                replaceSrc(cur, removeLoaded(cur, i));
            }
        }
    };

    var lzNodes = document.querySelectorAll('img[data-lzimg]');
    for (var i = 0, len = lzNodes.length; i < len; i++) {
        new Lzimg(lzNodes[i]).init();
    }
})(window, document);

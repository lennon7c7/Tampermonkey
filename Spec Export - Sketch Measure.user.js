// ==UserScript==
// @name         优化访问-UI提供的Spec Export - Sketch Measure标注
// @namespace    http://utom.design/measure/
// @version      1.0
// @description  1、设计分辨率-iOS设备-视网膜 @2x（自动选择）；2、body标签的样式min-width: 1024px（不设置）；3、screen-viewer-inner类的样式width: 19025px; height: 19025px;（改成方便缩小查看）
// @author       Lennon
// @match        *://*/*
// @match        *://*
// @match        *
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @run-at       document-end
// @icon         http://utom.design/assets/imgs/logo@2x.png
// ==/UserScript==
(function () {
    'use strict';

    setTimeout(function () {
        if (document.title.indexOf('Spec Export - Sketch Measure') !== 0) {
            return false;
        }

        $('#unit ul').append(`
<li>
    <label>
        <input type="radio" name="resolution" data-name="CSS Rem 40px" data-unit="rem" data-scale="40">
        <span>CSS Rem 40px</span>
    </label>
</li>
        `);

        $('input[type="radio"][name=resolution][data-name="CSS Rem 40px"]').click();

        $(document.body).css('min-width', 'unset');

        var elementScreen = $('#screen');
        $('.screen-viewer-inner').css('width', elementScreen.css('width')).css('height', elementScreen.css('height'));

        changeWidth();
    }, 1000);

    $(window).resize(function () {
        changeWidth();
    });

    function changeWidth() {
        if (window.innerWidth < 860) {
            $('.screen-viewer').css('width', 'unset').css('margin', '0 20px');

        } else {
            $('.screen-viewer').css('width', '100vw').css('margin', '0');
        }
    }
})();

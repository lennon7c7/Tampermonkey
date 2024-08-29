// ==UserScript==
// @name         HK CR
// @version      1.0.0
// @description  Pause auto logout
// @author       lennon
// @license      MIT
// @match        https://www.e-services.cr.gov.hk/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://unpkg.com/swiper@8/swiper-bundle.min.js
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
'use strict';

function main() {
    setInterval(function () {
        if ($("button.btn:contains('延续')").length > 0) {
            $("button.btn:contains('延续')").click()
        }
    }, 1 * 20000);
}

setTimeout(function () {
    main()
}, 5000)

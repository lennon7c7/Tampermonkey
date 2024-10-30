// ==UserScript==
// @name         Shopify plugin
// @version      1.0.0
// @description  easy work
// @author       lennon
// @license      MIT
// @match        https://admin.shopify.com/store/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://unpkg.com/swiper@8/swiper-bundle.min.js
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
'use strict';

console.log('init', new Date())

let prevUrl = location.href

function site127() {
    // 获取当前 URL
    const url = window.location.href;

    // 使用正则表达式提取 store_key 和 order_id
    const match = url.match(/https:\/\/admin\.shopify\.com\/store\/([^\/]+)\/orders\/(\d+)/);
    console.log('match', new Date())

    if (match) {
        const store_key = match[1];
        const order_id = match[2];

        $('.Polaris-ActionMenu-Actions__ActionsLayout').prepend(`<div class="Polaris-ActionMenu-SecondaryAction"><button id="ButtonSpeedaf" class="Polaris-Button Polaris-Button--pressable Polaris-Button--variantSecondary Polaris-Button--sizeMedium Polaris-Button--textAlignCenter" type="button"><span class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">速达非国际小包录入</span></button></div>`);

        // 打开iframe的函数
        $('body').on('click', '#ButtonSpeedaf', function () {
            let shopifyAPI = `https://admin.shopify.com/store/${store_key}/admin/api/2024-01/orders/${order_id}.json`
            let targetUrl = `http://192.168.31.222:31050/static/speedaf_form.html?store_key=${store_key}&order_id=${order_id}`

            $.get(shopifyAPI, function (resp) {
                targetUrl += `&customOrderNo=${resp.order.name}`
                targetUrl += `&codFee=${resp.order.current_total_price_set.shop_money.amount}`
                targetUrl += `&currency_code=${resp.order.current_total_price_set.shop_money.currency_code}`

                targetUrl += `&acceptName=${resp.order.shipping_address.last_name} ${resp.order.shipping_address.first_name}`
                if (resp.order.shipping_address.address1 && resp.order.shipping_address.address2) {
                    targetUrl += `&acceptAddress=${resp.order.shipping_address.address1} ${resp.order.shipping_address.address2}`
                } else if (resp.order.shipping_address.address1) {
                    targetUrl += `&acceptAddress=${resp.order.shipping_address.address1}`
                }

                targetUrl += `&acceptCountryCode=${resp.order.shipping_address.country_code}`
                targetUrl += `&acceptCountryName=${resp.order.shipping_address.country}`
                targetUrl += `&acceptProvinceName=${resp.order.shipping_address.province}`
                targetUrl += `&acceptCityName=${resp.order.shipping_address.city}`
                targetUrl += `&acceptMobile=${resp.order.shipping_address.phone}`
                targetUrl += `&acceptPostCode=${resp.order.shipping_address.zip}`

                targetUrl += `&expressOrderGoodsList=${JSON.stringify(resp.order.line_items)}`

                window.open(targetUrl, '_blank');
            });
        });
    }
}

function main() {
    site127();
}

setTimeout(function () {
    main()

    setInterval(() => {
        const currUrl = window.location.href;
        if (currUrl !== prevUrl) {
            // URL changed
            prevUrl = currUrl;
            console.log(`URL changed to: ${currUrl}`);
            main();
        }
    }, 1000);
}, 5000)

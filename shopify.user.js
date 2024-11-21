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
let orderData = null;

const myRender = (template, person) => {
    let reg = /{{(.*?)}}/g

    let res = template.replace(reg, (item, key) => {
        console.log(key, item)
        return person[key]
    })

    return res
}

function whatsappSendConfirmed() {
    if (!orderData) {
        return
    }

    let text = `👋 Good day, ${orderData.order.shipping_address.last_name} ${orderData.order.shipping_address.first_name}, Order ${orderData.order.name} confirmed

Thank you for your purchase! We're getting your order ready to be shipped. We will notify you when it has been sent

Shipping address: ${orderData.order.shipping_address.address1} ${orderData.order.shipping_address.address2} ${orderData.order.shipping_address.city} ${orderData.order.shipping_address.province} ${orderData.order.shipping_address.country}
Total: ${orderData.order.current_total_price_set.shop_money.currency_code} ${orderData.order.current_total_price_set.shop_money.amount}

Looking forward to hearing from you!`

    let targetUrl = `https://web.whatsapp.com/send/?phone=${orderData.order.shipping_address.phone}&text=${text}&type=phone_number&app_absent=0`
    targetUrl = `https://web.whatsapp.com/send/?phone=8618607714327&text=${text}&type=phone_number&app_absent=0`

    window.open(targetUrl, '_blank');
}

function site127() {
    // 获取当前 URL
    const url = window.location.href;

    // 使用正则表达式提取 store_key 和 order_id
    const match = url.match(/https:\/\/admin\.shopify\.com\/store\/([^\/]+)\/orders\/(\d+)/);
    console.log('match', new Date())

    if (match) {
        const store_key = match[1];
        const order_id = match[2];

        let shopifyAPI = `https://admin.shopify.com/store/${store_key}/admin/api/2024-01/orders/${order_id}.json`
        $.get(shopifyAPI, function (resp) {
            orderData = resp
        });


        // $('.Polaris-ActionMenu-Actions__ActionsLayout').prepend(`<div class="Polaris-ActionMenu-SecondaryAction"><button id="ButtonSpeedaf" class="Polaris-Button Polaris-Button--pressable Polaris-Button--variantSecondary Polaris-Button--sizeMedium Polaris-Button--textAlignCenter" type="button"><span class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">速达非国际小包录入</span></button></div>`);
        //
        // // 打开iframe的函数
        // $('body').on('click', '#ButtonSpeedaf', function () {
        //     let targetUrl = `http://192.168.31.222:31050/static/speedaf_form.html?store_key=${store_key}&order_id=${order_id}`
        //
        //     targetUrl += `&customOrderNo=${orderData.order.name}`
        //     targetUrl += `&codFee=${orderData.order.current_total_price_set.shop_money.amount}`
        //     targetUrl += `&currency_code=${orderData.order.current_total_price_set.shop_money.currency_code}`
        //
        //     targetUrl += `&acceptName=${orderData.order.shipping_address.last_name} ${orderData.order.shipping_address.first_name}`
        //     if (orderData.order.shipping_address.address1 && orderData.order.shipping_address.address2) {
        //         targetUrl += `&acceptAddress=${orderData.order.shipping_address.address1} ${orderData.order.shipping_address.address2}`
        //     } else if (orderData.order.shipping_address.address1) {
        //         targetUrl += `&acceptAddress=${orderData.order.shipping_address.address1}`
        //     }
        //
        //     targetUrl += `&acceptCountryCode=${orderData.order.shipping_address.country_code}`
        //     targetUrl += `&acceptCountryName=${orderData.order.shipping_address.country}`
        //     targetUrl += `&acceptProvinceName=${orderData.order.shipping_address.province}`
        //     targetUrl += `&acceptCityName=${orderData.order.shipping_address.city}`
        //     targetUrl += `&acceptMobile=${orderData.order.shipping_address.phone}`
        //     targetUrl += `&acceptPostCode=${orderData.order.shipping_address.zip}`
        //
        //     targetUrl += `&expressOrderGoodsList=${JSON.stringify(orderData.order.line_items)}`
        //
        //     window.open(targetUrl, '_blank');
        // });

        $('.Polaris-ActionMenu-Actions__ActionsLayout').prepend(`<div id="whatsappSendConfirmed" class="Polaris-ActionMenu-SecondaryAction"><button class="Polaris-Button Polaris-Button--pressable Polaris-Button--variantSecondary Polaris-Button--sizeMedium Polaris-Button--textAlignCenter" type="button">WhatsApp发消息 确认地址</button></div>`);
        $('body').on('click', '#whatsappSendConfirmed', function () {
            whatsappSendConfirmed()
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

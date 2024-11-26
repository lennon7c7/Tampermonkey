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
let countryData = [
    {
        "name": "不丹",
        "code": "BT",
        "continent": "亚洲",
        "phoneNumberPrefix": 975,
        "provinceKey": "REGION",
    }, {
        "name": "东帝汶",
        "code": "TL",
        "continent": "亚洲",
        "phoneNumberPrefix": 670,
        "provinceKey": "REGION",
    }, {
        "name": "中国",
        "code": "CN",
        "continent": "亚洲",
        "phoneNumberPrefix": 86,
        "provinceKey": "PROVINCE",
    }, {
        "name": "中非共和国",
        "code": "CF",
        "continent": "非洲",
        "phoneNumberPrefix": 236,
        "provinceKey": "REGION",
    }, {
        "name": "丹麦",
        "code": "DK",
        "continent": "欧洲",
        "phoneNumberPrefix": 45,
        "provinceKey": "REGION",
    }, {
        "name": "乌克兰",
        "code": "UA",
        "continent": "欧洲",
        "phoneNumberPrefix": 380,
        "provinceKey": "REGION",
    }, {
        "name": "乌兹别克斯坦",
        "code": "UZ",
        "continent": "亚洲",
        "phoneNumberPrefix": 998,
        "provinceKey": "REGION",
    }, {
        "name": "乌干达",
        "code": "UG",
        "continent": "非洲",
        "phoneNumberPrefix": 256,
        "provinceKey": "REGION",
    }, {
        "name": "乌拉圭",
        "code": "UY",
        "continent": "南美洲",
        "phoneNumberPrefix": 598,
        "provinceKey": "REGION",
    }, {
        "name": "乍得",
        "code": "TD",
        "continent": "非洲",
        "phoneNumberPrefix": 235,
        "provinceKey": "REGION",
    }, {
        "name": "也门",
        "code": "YE",
        "continent": "亚洲",
        "phoneNumberPrefix": 967,
        "provinceKey": "REGION",
    }, {
        "name": "亚美尼亚",
        "code": "AM",
        "continent": "亚洲",
        "phoneNumberPrefix": 374,
        "provinceKey": "REGION",
    }, {
        "name": "以色列",
        "code": "IL",
        "continent": "亚洲",
        "phoneNumberPrefix": 972,
        "provinceKey": "REGION",
    }, {
        "name": "伊拉克",
        "code": "IQ",
        "continent": "亚洲",
        "phoneNumberPrefix": 964,
        "provinceKey": "REGION",
    }, {
        "name": "伯利兹",
        "code": "BZ",
        "continent": "北美洲",
        "phoneNumberPrefix": 501,
        "provinceKey": "REGION",
    }, {
        "name": "佛得角",
        "code": "CV",
        "continent": "非洲",
        "phoneNumberPrefix": 238,
        "provinceKey": "REGION",
    }, {
        "name": "俄罗斯",
        "code": "RU",
        "continent": "欧洲",
        "phoneNumberPrefix": 7,
        "provinceKey": "REGION",
    }, {
        "name": "保加利亚",
        "code": "BG",
        "continent": "欧洲",
        "phoneNumberPrefix": 359,
        "provinceKey": "REGION",
    }, {
        "name": "克罗地亚",
        "code": "HR",
        "continent": "欧洲",
        "phoneNumberPrefix": 385,
        "provinceKey": "REGION",
    }, {
        "name": "冈比亚",
        "code": "GM",
        "continent": "非洲",
        "phoneNumberPrefix": 220,
        "provinceKey": "REGION",
    }, {
        "name": "冰岛",
        "code": "IS",
        "continent": "欧洲",
        "phoneNumberPrefix": 354,
        "provinceKey": "REGION",
    }, {
        "name": "几内亚",
        "code": "GN",
        "continent": "非洲",
        "phoneNumberPrefix": 224,
        "provinceKey": "REGION",
    }, {
        "name": "几内亚比绍",
        "code": "GW",
        "continent": "非洲",
        "phoneNumberPrefix": 245,
        "provinceKey": "REGION",
    }, {
        "name": "列支敦士登",
        "code": "LI",
        "continent": "欧洲",
        "phoneNumberPrefix": 423,
        "provinceKey": "REGION",
    }, {
        "name": "刚果（布）",
        "code": "CG",
        "continent": "非洲",
        "phoneNumberPrefix": 242,
        "provinceKey": "REGION",
    }, {
        "name": "刚果（金）",
        "code": "CD",
        "continent": "非洲",
        "phoneNumberPrefix": 243,
        "provinceKey": "REGION",
    }, {
        "name": "利比亚",
        "code": "LY",
        "continent": "非洲",
        "phoneNumberPrefix": 218,
        "provinceKey": "REGION",
    }, {
        "name": "利比里亚",
        "code": "LR",
        "continent": "非洲",
        "phoneNumberPrefix": 231,
        "provinceKey": "REGION",
    }, {
        "name": "加拿大",
        "code": "CA",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "PROVINCE",
    }, {
        "name": "加纳",
        "code": "GH",
        "continent": "非洲",
        "phoneNumberPrefix": 233,
        "provinceKey": "REGION",
        "deliveryPhone": "GH：+233038249100 / +2330271900666",
    }, {
        "name": "加蓬",
        "code": "GA",
        "continent": "非洲",
        "phoneNumberPrefix": 241,
        "provinceKey": "REGION",
    }, {
        "name": "匈牙利",
        "code": "HU",
        "continent": "欧洲",
        "phoneNumberPrefix": 36,
        "provinceKey": "REGION",
    }, {
        "name": "北马其顿",
        "code": "MK",
        "continent": "欧洲",
        "phoneNumberPrefix": 389,
        "provinceKey": "REGION",
    }, {
        "name": "南乔治亚和南桑威奇群岛",
        "code": "GS",
        "continent": "南美洲",
        "phoneNumberPrefix": 500,
        "provinceKey": "REGION",
    }, {
        "name": "南苏丹",
        "code": "SS",
        "continent": "非洲",
        "phoneNumberPrefix": 211,
        "provinceKey": "REGION",
    }, {
        "name": "南非",
        "code": "ZA",
        "continent": "非洲",
        "phoneNumberPrefix": 27,
        "provinceKey": "PROVINCE",
    }, {
        "name": "博茨瓦纳",
        "code": "BW",
        "continent": "非洲",
        "phoneNumberPrefix": 267,
        "provinceKey": "REGION",
    }, {
        "name": "卡塔尔",
        "code": "QA",
        "continent": "亚洲",
        "phoneNumberPrefix": 974,
        "provinceKey": "REGION",
    }, {
        "name": "卢旺达",
        "code": "RW",
        "continent": "非洲",
        "phoneNumberPrefix": 250,
        "provinceKey": "REGION",
    }, {
        "name": "卢森堡",
        "code": "LU",
        "continent": "欧洲",
        "phoneNumberPrefix": 352,
        "provinceKey": "REGION",
    }, {
        "name": "印度",
        "code": "IN",
        "continent": "亚洲",
        "phoneNumberPrefix": 91,
        "provinceKey": "STATE",
    }, {
        "name": "印度尼西亚",
        "code": "ID",
        "continent": "亚洲",
        "phoneNumberPrefix": 62,
        "provinceKey": "PROVINCE",
    }, {
        "name": "危地马拉",
        "code": "GT",
        "continent": "北美洲",
        "phoneNumberPrefix": 502,
        "provinceKey": "REGION",
    }, {
        "name": "厄瓜多尔",
        "code": "EC",
        "continent": "南美洲",
        "phoneNumberPrefix": 593,
        "provinceKey": "REGION",
    }, {
        "name": "厄立特里亚",
        "code": "ER",
        "continent": "非洲",
        "phoneNumberPrefix": 291,
        "provinceKey": "REGION",
    }, {
        "name": "台湾",
        "code": "TW",
        "continent": "亚洲",
        "phoneNumberPrefix": 886,
        "provinceKey": "REGION",
    }, {
        "name": "吉尔吉斯斯坦",
        "code": "KG",
        "continent": "亚洲",
        "phoneNumberPrefix": 996,
        "provinceKey": "REGION",
    }, {
        "name": "吉布提",
        "code": "DJ",
        "continent": "非洲",
        "phoneNumberPrefix": 253,
        "provinceKey": "REGION",
    }, {
        "name": "哈萨克斯坦",
        "code": "KZ",
        "continent": "亚洲",
        "phoneNumberPrefix": 7,
        "provinceKey": "REGION",
    }, {
        "name": "哥伦比亚",
        "code": "CO",
        "continent": "南美洲",
        "phoneNumberPrefix": 57,
        "provinceKey": "PROVINCE",
    }, {
        "name": "哥斯达黎加",
        "code": "CR",
        "continent": "北美洲",
        "phoneNumberPrefix": 506,
        "provinceKey": "PROVINCE",
    }, {
        "name": "喀麦隆",
        "code": "CM",
        "continent": "非洲",
        "phoneNumberPrefix": 237,
        "provinceKey": "REGION",
    }, {
        "name": "图瓦卢",
        "code": "TV",
        "continent": "大洋洲",
        "phoneNumberPrefix": 688,
        "provinceKey": "REGION",
    }, {
        "name": "土库曼斯坦",
        "code": "TM",
        "continent": "亚洲",
        "phoneNumberPrefix": 993,
        "provinceKey": "REGION",
    }, {
        "name": "土耳其",
        "code": "TR",
        "continent": "亚洲",
        "phoneNumberPrefix": 90,
        "provinceKey": "REGION",
    }, {
        "name": "圣卢西亚",
        "code": "LC",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "圣基茨和尼维斯",
        "code": "KN",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "圣多美和普林西比",
        "code": "ST",
        "continent": "非洲",
        "phoneNumberPrefix": 239,
        "provinceKey": "REGION",
    }, {
        "name": "圣巴泰勒米",
        "code": "BL",
        "continent": "北美洲",
        "phoneNumberPrefix": 590,
        "provinceKey": "REGION",
    }, {
        "name": "圣文森特和格林纳丁斯",
        "code": "VC",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "圣皮埃尔和密克隆群岛",
        "code": "PM",
        "continent": "北美洲",
        "phoneNumberPrefix": 508,
        "provinceKey": "REGION",
    }, {
        "name": "圣诞岛",
        "code": "CX",
        "continent": "大洋洲",
        "phoneNumberPrefix": 61,
        "provinceKey": "REGION",
    }, {
        "name": "圣赫勒拿",
        "code": "SH",
        "continent": "非洲",
        "phoneNumberPrefix": 290,
        "provinceKey": "REGION",
    }, {
        "name": "圣马力诺",
        "code": "SM",
        "continent": "欧洲",
        "phoneNumberPrefix": 378,
        "provinceKey": "REGION",
    }, {
        "name": "圭亚那",
        "code": "GY",
        "continent": "南美洲",
        "phoneNumberPrefix": 592,
        "provinceKey": "REGION",
    }, {
        "name": "坦桑尼亚",
        "code": "TZ",
        "continent": "非洲",
        "phoneNumberPrefix": 255,
        "provinceKey": "REGION",
    }, {
        "name": "埃及",
        "code": "EG",
        "continent": "非洲",
        "phoneNumberPrefix": 20,
        "provinceKey": "GOVERNORATE",
    }, {
        "name": "埃塞俄比亚",
        "code": "ET",
        "continent": "非洲",
        "phoneNumberPrefix": 251,
        "provinceKey": "REGION",
    }, {
        "name": "基里巴斯",
        "code": "KI",
        "continent": "大洋洲",
        "phoneNumberPrefix": 686,
        "provinceKey": "REGION",
    }, {
        "name": "塔吉克斯坦",
        "code": "TJ",
        "continent": "亚洲",
        "phoneNumberPrefix": 992,
        "provinceKey": "REGION",
    }, {
        "name": "塞内加尔",
        "code": "SN",
        "continent": "非洲",
        "phoneNumberPrefix": 221,
        "provinceKey": "REGION",
    }, {
        "name": "塞尔维亚",
        "code": "RS",
        "continent": "欧洲",
        "phoneNumberPrefix": 381,
        "provinceKey": "REGION",
    }, {
        "name": "塞拉利昂",
        "code": "SL",
        "continent": "非洲",
        "phoneNumberPrefix": 232,
        "provinceKey": "REGION",
    }, {
        "name": "塞浦路斯",
        "code": "CY",
        "continent": "亚洲",
        "phoneNumberPrefix": 357,
        "provinceKey": "REGION",
    }, {
        "name": "塞舌尔",
        "code": "SC",
        "continent": "非洲",
        "phoneNumberPrefix": 248,
        "provinceKey": "REGION",
    }, {
        "name": "墨西哥",
        "code": "MX",
        "continent": "北美洲",
        "phoneNumberPrefix": 52,
        "provinceKey": "STATE",
    }, {
        "name": "多哥",
        "code": "TG",
        "continent": "非洲",
        "phoneNumberPrefix": 228,
        "provinceKey": "REGION",
    }, {
        "name": "多米尼克",
        "code": "DM",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "多米尼加共和国",
        "code": "DO",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "奥兰群岛",
        "code": "AX",
        "continent": "欧洲",
        "phoneNumberPrefix": 358,
        "provinceKey": "REGION",
    }, {
        "name": "奥地利",
        "code": "AT",
        "continent": "欧洲",
        "phoneNumberPrefix": 43,
        "provinceKey": "REGION",
    }, {
        "name": "委内瑞拉",
        "code": "VE",
        "continent": "南美洲",
        "phoneNumberPrefix": 58,
        "provinceKey": "STATE",
    }, {
        "name": "孟加拉国",
        "code": "BD",
        "continent": "亚洲",
        "phoneNumberPrefix": 880,
        "provinceKey": "REGION",
    }, {
        "name": "安哥拉",
        "code": "AO",
        "continent": "非洲",
        "phoneNumberPrefix": 244,
        "provinceKey": "REGION",
    }, {
        "name": "安圭拉",
        "code": "AI",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "安提瓜和巴布达",
        "code": "AG",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "安道尔",
        "code": "AD",
        "continent": "欧洲",
        "phoneNumberPrefix": 376,
        "provinceKey": "REGION",
    }, {
        "name": "尼加拉瓜",
        "code": "NI",
        "continent": "北美洲",
        "phoneNumberPrefix": 505,
        "provinceKey": "REGION",
    }, {
        "name": "尼日利亚",
        "code": "NG",
        "continent": "非洲",
        "phoneNumberPrefix": 234,
        "provinceKey": "STATE",
        "deliveryPhone": "NG：+2347080636400",
    }, {
        "name": "尼日尔",
        "code": "NE",
        "continent": "非洲",
        "phoneNumberPrefix": 227,
        "provinceKey": "REGION",
    }, {
        "name": "尼泊尔",
        "code": "NP",
        "continent": "亚洲",
        "phoneNumberPrefix": 977,
        "provinceKey": "REGION",
    }, {
        "name": "巴勒斯坦领土",
        "code": "PS",
        "continent": "亚洲",
        "phoneNumberPrefix": 970,
        "provinceKey": "REGION",
    }, {
        "name": "巴哈马",
        "code": "BS",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "巴基斯坦",
        "code": "PK",
        "continent": "亚洲",
        "phoneNumberPrefix": 92,
        "provinceKey": "REGION",
    }, {
        "name": "巴巴多斯",
        "code": "BB",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "巴布亚新几内亚",
        "code": "PG",
        "continent": "大洋洲",
        "phoneNumberPrefix": 675,
        "provinceKey": "REGION",
    }, {
        "name": "巴拉圭",
        "code": "PY",
        "continent": "南美洲",
        "phoneNumberPrefix": 595,
        "provinceKey": "REGION",
    }, {
        "name": "巴拿马",
        "code": "PA",
        "continent": "北美洲",
        "phoneNumberPrefix": 507,
        "provinceKey": "REGION",
    }, {
        "name": "巴林",
        "code": "BH",
        "continent": "亚洲",
        "phoneNumberPrefix": 973,
        "provinceKey": "REGION",
    }, {
        "name": "巴西",
        "code": "BR",
        "continent": "南美洲",
        "phoneNumberPrefix": 55,
        "autocompletionField": "zip",
        "provinceKey": "STATE",
    }, {
        "name": "布基纳法索",
        "code": "BF",
        "continent": "非洲",
        "phoneNumberPrefix": 226,
        "provinceKey": "REGION",
    }, {
        "name": "布隆迪",
        "code": "BI",
        "continent": "非洲",
        "phoneNumberPrefix": 257,
        "provinceKey": "REGION",
    }, {
        "name": "希腊",
        "code": "GR",
        "continent": "欧洲",
        "phoneNumberPrefix": 30,
        "provinceKey": "REGION",
    }, {
        "name": "库克群岛",
        "code": "CK",
        "continent": "大洋洲",
        "phoneNumberPrefix": 682,
        "provinceKey": "REGION",
    }, {
        "name": "库拉索",
        "code": "CW",
        "continent": "北美洲",
        "phoneNumberPrefix": 599,
        "provinceKey": "REGION",
    }, {
        "name": "开曼群岛",
        "code": "KY",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "德国",
        "code": "DE",
        "continent": "欧洲",
        "phoneNumberPrefix": 49,
        "provinceKey": "REGION",
    }, {
        "name": "意大利",
        "code": "IT",
        "continent": "欧洲",
        "phoneNumberPrefix": 39,
        "provinceKey": "PROVINCE",
    }, {
        "name": "所罗门群岛",
        "code": "SB",
        "continent": "大洋洲",
        "phoneNumberPrefix": 677,
        "provinceKey": "REGION",
    }, {
        "name": "托克劳",
        "code": "TK",
        "continent": "大洋洲",
        "phoneNumberPrefix": 690,
        "provinceKey": "REGION",
    }, {
        "name": "拉脱维亚",
        "code": "LV",
        "continent": "欧洲",
        "phoneNumberPrefix": 371,
        "provinceKey": "REGION",
    }, {
        "name": "挪威",
        "code": "NO",
        "continent": "欧洲",
        "phoneNumberPrefix": 47,
        "provinceKey": "REGION",
    }, {
        "name": "捷克",
        "code": "CZ",
        "continent": "欧洲",
        "phoneNumberPrefix": 420,
        "provinceKey": "REGION",
    }, {
        "name": "摩尔多瓦",
        "code": "MD",
        "continent": "欧洲",
        "phoneNumberPrefix": 373,
        "provinceKey": "REGION",
    }, {
        "name": "摩洛哥",
        "code": "MA",
        "continent": "非洲",
        "phoneNumberPrefix": 212,
        "provinceKey": "REGION",
    }, {
        "name": "摩纳哥",
        "code": "MC",
        "continent": "欧洲",
        "phoneNumberPrefix": 377,
        "provinceKey": "REGION",
    }, {
        "name": "文莱",
        "code": "BN",
        "continent": "亚洲",
        "phoneNumberPrefix": 673,
        "provinceKey": "REGION",
    }, {
        "name": "斐济",
        "code": "FJ",
        "continent": "大洋洲",
        "phoneNumberPrefix": 679,
        "provinceKey": "REGION",
    }, {
        "name": "斯威士兰",
        "code": "SZ",
        "continent": "非洲",
        "phoneNumberPrefix": 268,
        "provinceKey": "REGION",
    }, {
        "name": "斯洛伐克",
        "code": "SK",
        "continent": "欧洲",
        "phoneNumberPrefix": 421,
        "provinceKey": "REGION",
    }, {
        "name": "斯洛文尼亚",
        "code": "SI",
        "continent": "欧洲",
        "phoneNumberPrefix": 386,
        "provinceKey": "REGION",
    }, {
        "name": "斯瓦尔巴和扬马延",
        "code": "SJ",
        "continent": "欧洲",
        "phoneNumberPrefix": 47,
        "provinceKey": "REGION",
    }, {
        "name": "斯里兰卡",
        "code": "LK",
        "continent": "亚洲",
        "phoneNumberPrefix": 94,
        "provinceKey": "REGION",
    }, {
        "name": "新加坡",
        "code": "SG",
        "continent": "亚洲",
        "phoneNumberPrefix": 65,
        "provinceKey": "REGION",
    }, {
        "name": "新喀里多尼亚",
        "code": "NC",
        "continent": "大洋洲",
        "phoneNumberPrefix": 687,
        "provinceKey": "REGION",
    }, {
        "name": "新西兰",
        "code": "NZ",
        "continent": "大洋洲",
        "phoneNumberPrefix": 64,
        "provinceKey": "REGION",
    }, {
        "name": "日本",
        "code": "JP",
        "continent": "亚洲",
        "phoneNumberPrefix": 81,
        "autocompletionField": "zip",
        "provinceKey": "PREFECTURE",
    }, {
        "name": "智利",
        "code": "CL",
        "continent": "南美洲",
        "phoneNumberPrefix": 56,
        "provinceKey": "REGION",
    }, {
        "name": "柬埔寨",
        "code": "KH",
        "continent": "亚洲",
        "phoneNumberPrefix": 855,
        "provinceKey": "REGION",
    }, {
        "name": "根西岛",
        "code": "GG",
        "continent": "欧洲",
        "phoneNumberPrefix": 44,
        "provinceKey": "REGION",
    }, {
        "name": "格林纳达",
        "code": "GD",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "格陵兰",
        "code": "GL",
        "continent": "北美洲",
        "phoneNumberPrefix": 299,
        "provinceKey": "REGION",
    }, {
        "name": "格鲁吉亚",
        "code": "GE",
        "continent": "亚洲",
        "phoneNumberPrefix": 995,
        "provinceKey": "REGION",
    }, {
        "name": "梵蒂冈",
        "code": "VA",
        "continent": "欧洲",
        "phoneNumberPrefix": 39,
        "provinceKey": "REGION",
    }, {
        "name": "比利时",
        "code": "BE",
        "continent": "欧洲",
        "phoneNumberPrefix": 32,
        "provinceKey": "REGION",
    }, {
        "name": "毛里塔尼亚",
        "code": "MR",
        "continent": "非洲",
        "phoneNumberPrefix": 222,
        "provinceKey": "REGION",
    }, {
        "name": "毛里求斯",
        "code": "MU",
        "continent": "非洲",
        "phoneNumberPrefix": 230,
        "provinceKey": "REGION",
    }, {
        "name": "汤加",
        "code": "TO",
        "continent": "大洋洲",
        "phoneNumberPrefix": 676,
        "provinceKey": "REGION",
    }, {
        "name": "沙特阿拉伯",
        "code": "SA",
        "continent": "亚洲",
        "phoneNumberPrefix": 966,
        "provinceKey": "REGION",
    }, {
        "name": "法国",
        "code": "FR",
        "continent": "欧洲",
        "phoneNumberPrefix": 33,
        "provinceKey": "REGION",
    }, {
        "name": "法属南部领地",
        "code": "TF",
        "continent": "非洲",
        "phoneNumberPrefix": 262,
        "provinceKey": "REGION",
    }, {
        "name": "法属圣马丁",
        "code": "MF",
        "continent": "北美洲",
        "phoneNumberPrefix": 590,
        "provinceKey": "REGION",
    }, {
        "name": "法属圭亚那",
        "code": "GF",
        "continent": "南美洲",
        "phoneNumberPrefix": 594,
        "provinceKey": "REGION",
    }, {
        "name": "法属波利尼西亚",
        "code": "PF",
        "continent": "大洋洲",
        "phoneNumberPrefix": 689,
        "provinceKey": "REGION",
    }, {
        "name": "法罗群岛",
        "code": "FO",
        "continent": "欧洲",
        "phoneNumberPrefix": 298,
        "provinceKey": "REGION",
    }, {
        "name": "波兰",
        "code": "PL",
        "continent": "欧洲",
        "phoneNumberPrefix": 48,
        "provinceKey": "REGION",
    }, {
        "name": "波斯尼亚和黑塞哥维那",
        "code": "BA",
        "continent": "欧洲",
        "phoneNumberPrefix": 387,
        "provinceKey": "REGION",
    }, {
        "name": "泰国",
        "code": "TH",
        "continent": "亚洲",
        "phoneNumberPrefix": 66,
        "provinceKey": "PROVINCE",
    }, {
        "name": "泽西岛",
        "code": "JE",
        "continent": "欧洲",
        "phoneNumberPrefix": 44,
        "provinceKey": "REGION",
    }, {
        "name": "津巴布韦",
        "code": "ZW",
        "continent": "非洲",
        "phoneNumberPrefix": 263,
        "provinceKey": "REGION",
    }, {
        "name": "洪都拉斯",
        "code": "HN",
        "continent": "北美洲",
        "phoneNumberPrefix": 504,
        "provinceKey": "REGION",
    }, {
        "name": "海地",
        "code": "HT",
        "continent": "北美洲",
        "phoneNumberPrefix": 509,
        "provinceKey": "REGION",
    }, {
        "name": "澳大利亚",
        "code": "AU",
        "continent": "大洋洲",
        "phoneNumberPrefix": 61,
        "provinceKey": "STATE_AND_TERRITORY",
    }, {
        "name": "澳门特别行政区",
        "code": "MO",
        "continent": "亚洲",
        "phoneNumberPrefix": 853,
        "provinceKey": "REGION",
    }, {
        "name": "爱尔兰",
        "code": "IE",
        "continent": "欧洲",
        "phoneNumberPrefix": 353,
        "provinceKey": "COUNTY",
    }, {
        "name": "爱沙尼亚",
        "code": "EE",
        "continent": "欧洲",
        "phoneNumberPrefix": 372,
        "provinceKey": "REGION",
    }, {
        "name": "牙买加",
        "code": "JM",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "特克斯和凯科斯群岛",
        "code": "TC",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "特立尼达和多巴哥",
        "code": "TT",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "特里斯坦-达库尼亚群岛",
        "code": "TA",
        "continent": "非洲",
        "phoneNumberPrefix": 2908,
        "provinceKey": "REGION",
    }, {
        "name": "玻利维亚",
        "code": "BO",
        "continent": "南美洲",
        "phoneNumberPrefix": 591,
        "provinceKey": "REGION",
    }, {
        "name": "瑙鲁",
        "code": "NR",
        "continent": "大洋洲",
        "phoneNumberPrefix": 674,
        "provinceKey": "REGION",
    }, {
        "name": "瑞典",
        "code": "SE",
        "continent": "欧洲",
        "phoneNumberPrefix": 46,
        "provinceKey": "REGION",
    }, {
        "name": "瑞士",
        "code": "CH",
        "continent": "欧洲",
        "phoneNumberPrefix": 41,
        "provinceKey": "REGION",
    }, {
        "name": "瓜德罗普",
        "code": "GP",
        "continent": "北美洲",
        "phoneNumberPrefix": 590,
        "provinceKey": "REGION",
    }, {
        "name": "瓦利斯和富图纳",
        "code": "WF",
        "continent": "大洋洲",
        "phoneNumberPrefix": 681,
        "provinceKey": "REGION",
    }, {
        "name": "瓦努阿图",
        "code": "VU",
        "continent": "大洋洲",
        "phoneNumberPrefix": 678,
        "provinceKey": "REGION",
    }, {
        "name": "留尼汪",
        "code": "RE",
        "continent": "非洲",
        "phoneNumberPrefix": 262,
        "provinceKey": "REGION",
    }, {
        "name": "白俄罗斯",
        "code": "BY",
        "continent": "欧洲",
        "phoneNumberPrefix": 375,
        "provinceKey": "REGION",
    }, {
        "name": "百慕大",
        "code": "BM",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "皮特凯恩群岛",
        "code": "PN",
        "continent": "大洋洲",
        "phoneNumberPrefix": 64,
        "provinceKey": "REGION",
    }, {
        "name": "直布罗陀",
        "code": "GI",
        "continent": "欧洲",
        "phoneNumberPrefix": 350,
        "provinceKey": "REGION",
    }, {
        "name": "福克兰群岛",
        "code": "FK",
        "continent": "南美洲",
        "phoneNumberPrefix": 500,
        "provinceKey": "REGION",
    }, {
        "name": "科威特",
        "code": "KW",
        "continent": "亚洲",
        "phoneNumberPrefix": 965,
        "provinceKey": "GOVERNORATE",
    }, {
        "name": "科摩罗",
        "code": "KM",
        "continent": "非洲",
        "phoneNumberPrefix": 269,
        "provinceKey": "REGION",
    }, {
        "name": "科特迪瓦",
        "code": "CI",
        "continent": "非洲",
        "phoneNumberPrefix": 225,
        "provinceKey": "REGION",
    }, {
        "name": "科科斯（基林）群岛",
        "code": "CC",
        "continent": "大洋洲",
        "phoneNumberPrefix": 891,
        "provinceKey": "REGION",
    }, {
        "name": "科索沃",
        "code": "XK",
        "continent": "欧洲",
        "phoneNumberPrefix": 383,
        "provinceKey": "REGION",
    }, {
        "name": "秘鲁",
        "code": "PE",
        "continent": "南美洲",
        "phoneNumberPrefix": 51,
        "provinceKey": "REGION",
    }, {
        "name": "突尼斯",
        "code": "TN",
        "continent": "非洲",
        "phoneNumberPrefix": 216,
        "provinceKey": "REGION",
    }, {
        "name": "立陶宛",
        "code": "LT",
        "continent": "欧洲",
        "phoneNumberPrefix": 370,
        "provinceKey": "REGION",
    }, {
        "name": "索马里",
        "code": "SO",
        "continent": "非洲",
        "phoneNumberPrefix": 252,
        "provinceKey": "REGION",
    }, {
        "name": "约旦",
        "code": "JO",
        "continent": "亚洲",
        "phoneNumberPrefix": 962,
        "provinceKey": "REGION",
    }, {
        "name": "纳米比亚",
        "code": "NA",
        "continent": "非洲",
        "phoneNumberPrefix": 264,
        "provinceKey": "REGION",
    }, {
        "name": "纽埃",
        "code": "NU",
        "continent": "大洋洲",
        "phoneNumberPrefix": 683,
        "provinceKey": "REGION",
    }, {
        "name": "缅甸",
        "code": "MM",
        "continent": "亚洲",
        "phoneNumberPrefix": 95,
        "provinceKey": "REGION",
    }, {
        "name": "罗马尼亚",
        "code": "RO",
        "continent": "欧洲",
        "phoneNumberPrefix": 40,
        "provinceKey": "COUNTY",
    }, {
        "name": "美国",
        "code": "US",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "STATE",
    }, {
        "name": "美国本土外小岛屿",
        "code": "UM",
        "continent": "大洋洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "STATE",
    }, {
        "name": "老挝",
        "code": "LA",
        "continent": "亚洲",
        "phoneNumberPrefix": 856,
        "provinceKey": "PROVINCE",
    }, {
        "name": "肯尼亚",
        "code": "KE",
        "continent": "非洲",
        "phoneNumberPrefix": 254,
        "provinceKey": "REGION",
        "deliveryPhone": "KE: +254741000666 / +254741000888",
    }, {
        "name": "芬兰",
        "code": "FI",
        "continent": "欧洲",
        "phoneNumberPrefix": 358,
        "provinceKey": "REGION",
    }, {
        "name": "苏丹",
        "code": "SD",
        "continent": "非洲",
        "phoneNumberPrefix": 249,
        "provinceKey": "REGION",
    }, {
        "name": "苏里南",
        "code": "SR",
        "continent": "南美洲",
        "phoneNumberPrefix": 597,
        "provinceKey": "REGION",
    }, {
        "name": "英国",
        "code": "GB",
        "continent": "欧洲",
        "phoneNumberPrefix": 44,
        "provinceKey": "REGION",
    }, {
        "name": "英属印度洋领地",
        "code": "IO",
        "continent": "非洲",
        "phoneNumberPrefix": 246,
        "provinceKey": "REGION",
    }, {
        "name": "英属维尔京群岛",
        "code": "VG",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "荷兰",
        "code": "NL",
        "continent": "欧洲",
        "phoneNumberPrefix": 31,
        "provinceKey": "REGION",
    }, {
        "name": "荷属加勒比区",
        "code": "BQ",
        "continent": "北美洲",
        "phoneNumberPrefix": 599,
        "provinceKey": "REGION",
    }, {
        "name": "荷属圣马丁",
        "code": "SX",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "莫桑比克",
        "code": "MZ",
        "continent": "非洲",
        "phoneNumberPrefix": 258,
        "provinceKey": "REGION",
    }, {
        "name": "莱索托",
        "code": "LS",
        "continent": "非洲",
        "phoneNumberPrefix": 266,
        "provinceKey": "REGION",
    }, {
        "name": "菲律宾",
        "code": "PH",
        "continent": "亚洲",
        "phoneNumberPrefix": 63,
        "provinceKey": "REGION",
    }, {
        "name": "萨尔瓦多",
        "code": "SV",
        "continent": "北美洲",
        "phoneNumberPrefix": 503,
        "provinceKey": "REGION",
    }, {
        "name": "萨摩亚",
        "code": "WS",
        "continent": "大洋洲",
        "phoneNumberPrefix": 685,
        "provinceKey": "REGION",
    }, {
        "name": "葡萄牙",
        "code": "PT",
        "continent": "欧洲",
        "phoneNumberPrefix": 351,
        "provinceKey": "REGION",
    }, {
        "name": "蒙古",
        "code": "MN",
        "continent": "亚洲",
        "phoneNumberPrefix": 976,
        "provinceKey": "REGION",
    }, {
        "name": "蒙特塞拉特",
        "code": "MS",
        "continent": "北美洲",
        "phoneNumberPrefix": 1,
        "provinceKey": "REGION",
    }, {
        "name": "西撒哈拉",
        "code": "EH",
        "continent": "非洲",
        "phoneNumberPrefix": 212,
        "provinceKey": "REGION",
    }, {
        "name": "西班牙",
        "code": "ES",
        "continent": "欧洲",
        "phoneNumberPrefix": 34,
        "provinceKey": "PROVINCE",
    }, {
        "name": "诺福克岛",
        "code": "NF",
        "continent": "大洋洲",
        "phoneNumberPrefix": 672,
        "provinceKey": "REGION",
    }, {
        "name": "贝宁",
        "code": "BJ",
        "continent": "非洲",
        "phoneNumberPrefix": 229,
        "provinceKey": "REGION",
    }, {
        "name": "赞比亚",
        "code": "ZM",
        "continent": "非洲",
        "phoneNumberPrefix": 260,
        "provinceKey": "REGION",
    }, {
        "name": "赤道几内亚",
        "code": "GQ",
        "continent": "非洲",
        "phoneNumberPrefix": 240,
        "provinceKey": "REGION",
    }, {
        "name": "越南",
        "code": "VN",
        "continent": "亚洲",
        "phoneNumberPrefix": 84,
        "provinceKey": "REGION",
    }, {
        "name": "阿塞拜疆",
        "code": "AZ",
        "continent": "亚洲",
        "phoneNumberPrefix": 994,
        "provinceKey": "REGION",
    }, {
        "name": "阿富汗",
        "code": "AF",
        "continent": "亚洲",
        "phoneNumberPrefix": 93,
        "provinceKey": "REGION",
    }, {
        "name": "阿尔及利亚",
        "code": "DZ",
        "continent": "非洲",
        "phoneNumberPrefix": 213,
        "provinceKey": "PROVINCE",
    }, {
        "name": "阿尔巴尼亚",
        "code": "AL",
        "continent": "欧洲",
        "phoneNumberPrefix": 355,
        "provinceKey": "REGION",
    }, {
        "name": "阿拉伯联合酋长国",
        "code": "AE",
        "continent": "亚洲",
        "phoneNumberPrefix": 971,
        "provinceKey": "EMIRATE",
    }, {
        "name": "阿曼",
        "code": "OM",
        "continent": "亚洲",
        "phoneNumberPrefix": 968,
        "provinceKey": "REGION",
    }, {
        "name": "阿根廷",
        "code": "AR",
        "continent": "南美洲",
        "phoneNumberPrefix": 54,
        "provinceKey": "PROVINCE",
    }, {
        "name": "阿森松岛",
        "code": "AC",
        "continent": "非洲",
        "phoneNumberPrefix": 247,
        "provinceKey": "REGION",
    }, {
        "name": "阿鲁巴",
        "code": "AW",
        "continent": "北美洲",
        "phoneNumberPrefix": 297,
        "provinceKey": "REGION",
    }, {
        "name": "韩国",
        "code": "KR",
        "continent": "亚洲",
        "phoneNumberPrefix": 82,
        "autocompletionField": "zip",
        "provinceKey": "PROVINCE",
    }, {
        "name": "香港特别行政区",
        "code": "HK",
        "continent": "亚洲",
        "phoneNumberPrefix": 852,
        "provinceKey": "REGION",
    }, {
        "name": "马尔代夫",
        "code": "MV",
        "continent": "亚洲",
        "phoneNumberPrefix": 960,
        "provinceKey": "REGION",
    }, {
        "name": "马恩岛",
        "code": "IM",
        "continent": "欧洲",
        "phoneNumberPrefix": 44,
        "provinceKey": "REGION",
    }, {
        "name": "马拉维",
        "code": "MW",
        "continent": "非洲",
        "phoneNumberPrefix": 265,
        "provinceKey": "REGION",
    }, {
        "name": "马提尼克",
        "code": "MQ",
        "continent": "北美洲",
        "phoneNumberPrefix": 596,
        "provinceKey": "REGION",
    }, {
        "name": "马来西亚",
        "code": "MY",
        "continent": "亚洲",
        "phoneNumberPrefix": 60,
        "provinceKey": "STATE_AND_TERRITORY",
    }, {
        "name": "马约特",
        "code": "YT",
        "continent": "非洲",
        "phoneNumberPrefix": 262,
        "provinceKey": "REGION",
    }, {
        "name": "马耳他",
        "code": "MT",
        "continent": "欧洲",
        "phoneNumberPrefix": 356,
        "provinceKey": "REGION",
    }, {
        "name": "马达加斯加",
        "code": "MG",
        "continent": "非洲",
        "phoneNumberPrefix": 261,
        "provinceKey": "REGION",
    }, {
        "name": "马里",
        "code": "ML",
        "continent": "非洲",
        "phoneNumberPrefix": 223,
        "provinceKey": "REGION",
    }, {
        "name": "黎巴嫩",
        "code": "LB",
        "continent": "亚洲",
        "phoneNumberPrefix": 961,
        "provinceKey": "REGION",
    }, {
        "name": "黑山",
        "code": "ME",
        "continent": "欧洲",
        "phoneNumberPrefix": 382,
        "provinceKey": "REGION",
    }]
let orderData = null;

function extractDomain(url) {
    try {
        const urlObj = new URL(url); // 解析 URL
        return `${urlObj.hostname}`; // 拼接协议和主机名
    } catch (error) {
        console.error('Invalid URL:', error);
        return '';
    }
}

function whatsappSendConfirmed() {
    if (!orderData) {
        return
    }

    orderData.order.shipping_address.address1 = !orderData.order.shipping_address.address1 ? '' : orderData.order.shipping_address.address1
    orderData.order.shipping_address.address1 = orderData.order.shipping_address.address1.replaceAll('&', 'and')
    orderData.order.shipping_address.address2 = !orderData.order.shipping_address.address2 ? '' : orderData.order.shipping_address.address2
    orderData.order.shipping_address.address2 = orderData.order.shipping_address.address2.replaceAll('&', 'and')
    orderData.order.shipping_address.city = !orderData.order.shipping_address.city ? '' : orderData.order.shipping_address.city
    orderData.order.shipping_address.province = !orderData.order.shipping_address.province ? '' : orderData.order.shipping_address.province
    orderData.order.shipping_address.country = !orderData.order.shipping_address.country ? '' : orderData.order.shipping_address.country
    let textItem = []
    for (let i = 0, len = orderData.order.line_items.length; i < len; i++) {
        orderData.order.line_items[i].name = orderData.order.line_items[i].name.replaceAll('&', 'and')
        textItem[i] = `${orderData.order.line_items[i].name} x ${orderData.order.line_items[i].quantity} ${orderData.order.line_items[i].price_set.shop_money.currency_code}${orderData.order.line_items[i].price_set.shop_money.amount}`
    }
    textItem = textItem.join('\n')

    let textPhone = orderData.order.shipping_address.phone
    if (orderData.order.shipping_address.phone[0] !== '+') {
        for (let i = 0, len = countryData.length; i < len; i++) {
            if (countryData[i].code === orderData.order.shipping_address.country_code) {
                textPhone = `${countryData[i].phoneNumberPrefix}${orderData.order.shipping_address.phone}`
                break
            }
        }
    }

    let textLandingSite = ''
    if (orderData.order.landing_site && orderData.order.order_status_url) {
        // orderData.order.landing_site 去掉问号后面的参数
        let landing_site = orderData.order.landing_site.split('?')[0]
        // orderData.order.order_status_url 去掉域名后面的参数，只保留域名
        let order_status_url = extractDomain(orderData.order.order_status_url)
        if (order_status_url) {
            // 把 landing_site 和 order_status_url 拼接起来，组合成 https://ilovesupermarket.com/products/laser-level-line-tool🛠️🛠️
            textLandingSite = `Landing site: ${order_status_url}${landing_site}\n`
        }
    }

    let text = `Order ${orderData.order.name} confirmed
👋 Good day, ${orderData.order.shipping_address.last_name} ${orderData.order.shipping_address.first_name}, Thank you for your purchase! We're getting your order ready to be shipped. We will notify you when it has been sent

Item: ${textItem}
Shipping address: ${orderData.order.shipping_address.address1} ${orderData.order.shipping_address.address2} ${orderData.order.shipping_address.city} ${orderData.order.shipping_address.province} ${orderData.order.shipping_address.country}
Total: ${orderData.order.current_total_price_set.shop_money.currency_code} ${orderData.order.current_total_price_set.shop_money.amount}
${textLandingSite}
Looking forward to hearing from you!`
    text = text.replaceAll('\n', '%0a')

    let targetUrl = `https://web.whatsapp.com/send/?phone=${textPhone}&text=${text}&type=phone_number&app_absent=0`
    // targetUrl = `whatsapp://send/?phone=${textPhone}&text=${text}&type=phone_number&app_absent=0`
    // targetUrl = `https://web.whatsapp.com/send/?phone=8618607714327&text=${text}&type=phone_number&app_absent=0`

    $('.Polaris-ActionMenu-Actions__ActionsLayout').prepend(`<a href="${targetUrl}" target="_blank">WS确认地址</a>`);

    // window.open(targetUrl, '_blank');
}

function whatsappSendShipped() {
    if (!orderData) {
        return
    }

    orderData.order.shipping_address.address1 = !orderData.order.shipping_address.address1 ? '' : orderData.order.shipping_address.address1
    orderData.order.shipping_address.address1 = orderData.order.shipping_address.address1.replaceAll('&', 'and')
    orderData.order.shipping_address.address2 = !orderData.order.shipping_address.address2 ? '' : orderData.order.shipping_address.address2
    orderData.order.shipping_address.address2 = orderData.order.shipping_address.address2.replaceAll('&', 'and')
    orderData.order.shipping_address.city = !orderData.order.shipping_address.city ? '' : orderData.order.shipping_address.city
    orderData.order.shipping_address.province = !orderData.order.shipping_address.province ? '' : orderData.order.shipping_address.province
    orderData.order.shipping_address.country = !orderData.order.shipping_address.country ? '' : orderData.order.shipping_address.country
    let textItem = []
    for (let i = 0, len = orderData.order.line_items.length; i < len; i++) {
        orderData.order.line_items[i].name = orderData.order.line_items[i].name.replaceAll('&', 'and')
        textItem[i] = `${orderData.order.line_items[i].name} x ${orderData.order.line_items[i].quantity} ${orderData.order.line_items[i].price_set.shop_money.currency_code}${orderData.order.line_items[i].price_set.shop_money.amount}`
    }
    textItem = textItem.join('\n')

    let textPhone = orderData.order.shipping_address.phone
    if (orderData.order.shipping_address.phone[0] !== '+') {
        for (let i = 0, len = countryData.length; i < len; i++) {
            if (countryData[i].code === orderData.order.shipping_address.country_code) {
                textPhone = `${countryData[i].phoneNumberPrefix}${orderData.order.shipping_address.phone}`
                break
            }
        }
    }

    let textDeliveryPhone = ''
    for (let i = 0, len = countryData.length; i < len; i++) {
        if (countryData[i].code === orderData.order.shipping_address.country_code) {
            textDeliveryPhone = countryData[i].deliveryPhone
            break
        }
    }

    let textDomain = extractDomain(orderData.order.order_status_url)

    let text = `Order ${orderData.order.name} is on the way
📦Your order is on the way. Track your shipment to see the delivery status

Item: ${textItem}
Tracking number: : ${orderData.order.fulfillments[0].tracking_number}
${textDeliveryPhone}

Thank you for shopping with ${textDomain}`
    text = text.replaceAll('\n', '%0a')

    let targetUrl = `https://web.whatsapp.com/send/?phone=${textPhone}&text=${text}&type=phone_number&app_absent=0`
    // targetUrl = `whatsapp://send/?phone=${textPhone}&text=${text}&type=phone_number&app_absent=0`
    // targetUrl = `https://web.whatsapp.com/send/?phone=8618607714327&text=${text}&type=phone_number&app_absent=0`

    $('.Polaris-ActionMenu-Actions__ActionsLayout').prepend(`<a href="${targetUrl}" target="_blank">WS已发货</a>`);

    // window.open(targetUrl, '_blank');
}

function whatsappSendNotPickUp() {
    if (!orderData) {
        return
    }

    orderData.order.shipping_address.address1 = !orderData.order.shipping_address.address1 ? '' : orderData.order.shipping_address.address1
    orderData.order.shipping_address.address1 = orderData.order.shipping_address.address1.replaceAll('&', 'and')
    orderData.order.shipping_address.address2 = !orderData.order.shipping_address.address2 ? '' : orderData.order.shipping_address.address2
    orderData.order.shipping_address.address2 = orderData.order.shipping_address.address2.replaceAll('&', 'and')
    orderData.order.shipping_address.city = !orderData.order.shipping_address.city ? '' : orderData.order.shipping_address.city
    orderData.order.shipping_address.province = !orderData.order.shipping_address.province ? '' : orderData.order.shipping_address.province
    orderData.order.shipping_address.country = !orderData.order.shipping_address.country ? '' : orderData.order.shipping_address.country
    let textItem = []
    for (let i = 0, len = orderData.order.line_items.length; i < len; i++) {
        orderData.order.line_items[i].name = orderData.order.line_items[i].name.replaceAll('&', 'and')
        textItem[i] = `${orderData.order.line_items[i].name} x ${orderData.order.line_items[i].quantity} ${orderData.order.line_items[i].price_set.shop_money.currency_code}${orderData.order.line_items[i].price_set.shop_money.amount}`
    }
    textItem = textItem.join('\n')

    let textPhone = orderData.order.shipping_address.phone
    if (orderData.order.shipping_address.phone[0] !== '+') {
        for (let i = 0, len = countryData.length; i < len; i++) {
            if (countryData[i].code === orderData.order.shipping_address.country_code) {
                textPhone = `${countryData[i].phoneNumberPrefix}${orderData.order.shipping_address.phone}`
                break
            }
        }
    }

    let textDeliveryPhone = ''
    for (let i = 0, len = countryData.length; i < len; i++) {
        if (countryData[i].code === orderData.order.shipping_address.country_code) {
            textDeliveryPhone = countryData[i].deliveryPhone
            break
        }
    }

    let textDomain = extractDomain(orderData.order.order_status_url)

    let text = `Order ${orderData.order.name} not pick up
🙏Hi, ${orderData.order.shipping_address.last_name} ${orderData.order.shipping_address.first_name}
This is a friendly reminder that your order is ready for pick-up. Please be sure to collect it as soon as possible to avoid any delays or storage fees.
If you need any assistance or have any questions regarding the pick-up process, feel free to reach out to ${textDomain} 

Item: ${textItem}
Total: ${orderData.order.current_total_price_set.shop_money.currency_code} ${orderData.order.current_total_price_set.shop_money.amount}
${textDeliveryPhone}
`
    text = text.replaceAll('\n', '%0a')

    let targetUrl = `https://web.whatsapp.com/send/?phone=${textPhone}&text=${text}&type=phone_number&app_absent=0`
    // targetUrl = `whatsapp://send/?phone=${textPhone}&text=${text}&type=phone_number&app_absent=0`
    // targetUrl = `https://web.whatsapp.com/send/?phone=8618607714327&text=${text}&type=phone_number&app_absent=0`

    $('.Polaris-ActionMenu-Actions__ActionsLayout').prepend(`<a href="${targetUrl}" target="_blank">WS未签收</a>`);

    // window.open(targetUrl, '_blank');
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

            whatsappSendConfirmed()
            whatsappSendShipped()
            whatsappSendNotPickUp()
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

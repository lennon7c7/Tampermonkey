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
let countryData = {
    "data": {
        "countries": [{
            "name": "不丹",
            "code": "BT",
            "continent": "亚洲",
            "phoneNumberPrefix": 975,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "东帝汶",
            "code": "TL",
            "continent": "亚洲",
            "phoneNumberPrefix": 670,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "中国",
            "code": "CN",
            "continent": "亚洲",
            "phoneNumberPrefix": 86,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "完整地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1} {address2} {city}_{zip} {province}_{country}_{phone}"
            },
            "zones": [{"name": "上海市", "code": "SH"}, {"name": "云南省", "code": "YN"}, {
                "name": "内蒙古自治区",
                "code": "NM"
            }, {"name": "北京市", "code": "BJ"}, {"name": "吉林省", "code": "JL"}, {
                "name": "四川省",
                "code": "SC"
            }, {"name": "天津市", "code": "TJ"}, {"name": "宁夏回族自治区", "code": "NX"}, {
                "name": "安徽省",
                "code": "AH"
            }, {"name": "山东省", "code": "SD"}, {"name": "山西省", "code": "SX"}, {
                "name": "广东省",
                "code": "GD"
            }, {"name": "广西壮族自治区", "code": "GX"}, {"name": "新疆维吾尔自治区", "code": "XJ"}, {
                "name": "江苏省",
                "code": "JS"
            }, {"name": "江西省", "code": "JX"}, {"name": "河北省", "code": "HE"}, {
                "name": "河南省",
                "code": "HA"
            }, {"name": "浙江省", "code": "ZJ"}, {"name": "海南省", "code": "HI"}, {
                "name": "湖北省",
                "code": "HB"
            }, {"name": "湖南省", "code": "HN"}, {"name": "甘肃省", "code": "GS"}, {
                "name": "福建省",
                "code": "FJ"
            }, {"name": "西藏自治区", "code": "YZ"}, {"name": "贵州省", "code": "GZ"}, {
                "name": "辽宁省",
                "code": "LN"
            }, {"name": "重庆市", "code": "CQ"}, {"name": "陕西省", "code": "SN"}, {
                "name": "青海省",
                "code": "QH"
            }, {"name": "黑龙江省", "code": "HL"}]
        }, {
            "name": "中非共和国",
            "code": "CF",
            "continent": "非洲",
            "phoneNumberPrefix": 236,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "丹麦",
            "code": "DK",
            "continent": "欧洲",
            "phoneNumberPrefix": 45,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "乌克兰",
            "code": "UA",
            "continent": "欧洲",
            "phoneNumberPrefix": 380,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "乌兹别克斯坦",
            "code": "UZ",
            "continent": "亚洲",
            "phoneNumberPrefix": 998,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "乌干达",
            "code": "UG",
            "continent": "非洲",
            "phoneNumberPrefix": 256,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "乌拉圭",
            "code": "UY",
            "continent": "南美洲",
            "phoneNumberPrefix": 598,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "部门"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}, {province}_{country}_{phone}"
            },
            "zones": [{"name": "阿蒂加斯省", "code": "UY-AR"}, {
                "name": "卡内洛内斯省",
                "code": "UY-CA"
            }, {"name": "塞罗拉尔戈省", "code": "UY-CL"}, {
                "name": "科洛尼亚省",
                "code": "UY-CO"
            }, {"name": "杜拉斯诺省", "code": "UY-DU"}, {"name": "弗洛雷斯省", "code": "UY-FS"}, {
                "name": "佛罗里达省",
                "code": "UY-FD"
            }, {"name": "拉瓦耶哈省", "code": "UY-LA"}, {
                "name": "马尔多纳多省",
                "code": "UY-MA"
            }, {"name": "蒙得維的亞省", "code": "UY-MO"}, {"name": "派桑杜省", "code": "UY-PA"}, {
                "name": "内格罗河省",
                "code": "UY-RN"
            }, {"name": "里韦拉省", "code": "UY-RV"}, {"name": "罗恰省", "code": "UY-RO"}, {
                "name": "萨尔托省",
                "code": "UY-SA"
            }, {"name": "圣何塞省", "code": "UY-SJ"}, {"name": "索里亚诺省", "code": "UY-SO"}, {
                "name": "塔夸伦博省",
                "code": "UY-TA"
            }, {"name": "三十三人省", "code": "UY-TT"}]
        }, {
            "name": "乍得",
            "code": "TD",
            "continent": "非洲",
            "phoneNumberPrefix": 235,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "也门",
            "code": "YE",
            "continent": "亚洲",
            "phoneNumberPrefix": 967,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "亚美尼亚",
            "code": "AM",
            "continent": "亚洲",
            "phoneNumberPrefix": 374,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "以色列",
            "code": "IL",
            "continent": "亚洲",
            "phoneNumberPrefix": 972,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "伊拉克",
            "code": "IQ",
            "continent": "亚洲",
            "phoneNumberPrefix": 964,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "伯利兹",
            "code": "BZ",
            "continent": "北美洲",
            "phoneNumberPrefix": 501,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "佛得角",
            "code": "CV",
            "continent": "非洲",
            "phoneNumberPrefix": 238,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "俄罗斯",
            "code": "RU",
            "continent": "欧洲",
            "phoneNumberPrefix": 7,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{province}_{zip}_{country}_{phone}"
            },
            "zones": [{"name": "阿尔泰边疆区", "code": "ALT"}, {
                "name": "阿尔泰共和国",
                "code": "AL"
            }, {"name": "阿穆尔州", "code": "AMU"}, {
                "name": "阿尔汉格尔斯克州",
                "code": "ARK"
            }, {"name": "阿斯特拉罕州", "code": "AST"}, {"name": "别尔哥罗德州", "code": "BEL"}, {
                "name": "布良斯克州",
                "code": "BRY"
            }, {"name": "车臣共和国", "code": "CE"}, {"name": "车里雅宾斯克州", "code": "CHE"}, {
                "name": "楚科奇自治区",
                "code": "CHU"
            }, {"name": "楚瓦什共和国", "code": "CU"}, {"name": "伊尔库茨克州", "code": "IRK"}, {
                "name": "伊万诺沃州",
                "code": "IVA"
            }, {"name": "犹太自治州", "code": "YEV"}, {
                "name": "卡巴爾達-巴爾卡爾共和國",
                "code": "KB"
            }, {"name": "加里宁格勒州", "code": "KGD"}, {"name": "卡卢加州", "code": "KLU"}, {
                "name": "堪察加邊疆區",
                "code": "KAM"
            }, {"name": "卡拉恰伊-切尔克斯共和国", "code": "KC"}, {
                "name": "科麦罗沃州",
                "code": "KEM"
            }, {"name": "哈巴罗夫斯克边疆区", "code": "KHA"}, {
                "name": "汉特-曼西自治区",
                "code": "KHM"
            }, {"name": "基洛夫州", "code": "KIR"}, {"name": "科米共和国", "code": "KO"}, {
                "name": "科斯特罗马州",
                "code": "KOS"
            }, {"name": "克拉斯诺达尔边疆区", "code": "KDA"}, {
                "name": "克拉斯諾亞爾斯克邊疆區",
                "code": "KYA"
            }, {"name": "库尔干州", "code": "KGN"}, {"name": "库尔斯克州", "code": "KRS"}, {
                "name": "列宁格勒州",
                "code": "LEN"
            }, {"name": "利佩茨克州", "code": "LIP"}, {"name": "马加丹州", "code": "MAG"}, {
                "name": "马里埃尔共和国",
                "code": "ME"
            }, {"name": "莫斯科", "code": "MOW"}, {"name": "莫斯科州", "code": "MOS"}, {
                "name": "摩爾曼斯克州",
                "code": "MUR"
            }, {"name": "下诺夫哥罗德州", "code": "NIZ"}, {
                "name": "諾夫哥羅德州",
                "code": "NGR"
            }, {"name": "新西伯利亚州", "code": "NVS"}, {"name": "鄂木斯克州", "code": "OMS"}, {
                "name": "奧倫堡州",
                "code": "ORE"
            }, {"name": "奥廖尔州", "code": "ORL"}, {"name": "奔萨州", "code": "PNZ"}, {
                "name": "彼爾姆邊疆區",
                "code": "PER"
            }, {"name": "滨海边疆区", "code": "PRI"}, {"name": "普斯科夫州", "code": "PSK"}, {
                "name": "阿迪格共和国",
                "code": "AD"
            }, {"name": "巴什科尔托斯坦共和国", "code": "BA"}, {
                "name": "布里亞特共和國",
                "code": "BU"
            }, {"name": "达吉斯坦共和国", "code": "DA"}, {
                "name": "印古什共和国",
                "code": "IN"
            }, {"name": "卡尔梅克共和国", "code": "KL"}, {
                "name": "卡累利阿共和国",
                "code": "KR"
            }, {"name": "哈卡斯共和国", "code": "KK"}, {
                "name": "莫尔多瓦共和国",
                "code": "MO"
            }, {"name": "北奥塞梯-阿兰共和国", "code": "SE"}, {
                "name": "鞑靼斯坦共和国",
                "code": "TA"
            }, {"name": "罗斯托夫州", "code": "ROS"}, {"name": "梁赞州", "code": "RYA"}, {
                "name": "圣彼得堡",
                "code": "SPE"
            }, {"name": "萨哈共和国", "code": "SA"}, {"name": "萨哈林州", "code": "SAK"}, {
                "name": "萨马拉州",
                "code": "SAM"
            }, {"name": "萨拉托夫州", "code": "SAR"}, {
                "name": "斯摩棱斯克州",
                "code": "SMO"
            }, {"name": "斯塔夫罗波尔边疆区", "code": "STA"}, {
                "name": "斯維爾德洛夫斯克州",
                "code": "SVE"
            }, {"name": "坦波夫州", "code": "TAM"}, {"name": "托木斯克州", "code": "TOM"}, {
                "name": "图拉州",
                "code": "TUL"
            }, {"name": "特维尔州", "code": "TVE"}, {"name": "秋明州", "code": "TYU"}, {
                "name": "图瓦共和国",
                "code": "TY"
            }, {"name": "乌德穆尔特共和国", "code": "UD"}, {
                "name": "乌里扬诺夫斯克州",
                "code": "ULY"
            }, {"name": "弗拉基米尔州", "code": "VLA"}, {"name": "伏尔加格勒州", "code": "VGG"}, {
                "name": "沃洛格达州",
                "code": "VLG"
            }, {"name": "沃罗涅日州", "code": "VOR"}, {
                "name": "亚马尔-涅涅茨自治区",
                "code": "YAN"
            }, {"name": "雅羅斯拉夫爾州", "code": "YAR"}, {"name": "外貝加爾邊疆區", "code": "ZAB"}]
        }, {
            "name": "保加利亚",
            "code": "BG",
            "continent": "欧洲",
            "phoneNumberPrefix": 359,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "克罗地亚",
            "code": "HR",
            "continent": "欧洲",
            "phoneNumberPrefix": 385,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "冈比亚",
            "code": "GM",
            "continent": "非洲",
            "phoneNumberPrefix": 220,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "冰岛",
            "code": "IS",
            "continent": "欧洲",
            "phoneNumberPrefix": 354,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "几内亚",
            "code": "GN",
            "continent": "非洲",
            "phoneNumberPrefix": 224,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "几内亚比绍",
            "code": "GW",
            "continent": "非洲",
            "phoneNumberPrefix": 245,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "列支敦士登",
            "code": "LI",
            "continent": "欧洲",
            "phoneNumberPrefix": 423,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "刚果（布）",
            "code": "CG",
            "continent": "非洲",
            "phoneNumberPrefix": 242,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "刚果（金）",
            "code": "CD",
            "continent": "非洲",
            "phoneNumberPrefix": 243,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "利比亚",
            "code": "LY",
            "continent": "非洲",
            "phoneNumberPrefix": 218,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "利比里亚",
            "code": "LR",
            "continent": "非洲",
            "phoneNumberPrefix": 231,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "加拿大",
            "code": "CA",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {province} {zip}_{country}_{phone}"
            },
            "zones": [{"name": "艾伯塔", "code": "AB"}, {"name": "不列颠哥伦比亚", "code": "BC"}, {
                "name": "曼尼托巴",
                "code": "MB"
            }, {"name": "新不倫瑞克", "code": "NB"}, {"name": "紐芬蘭與拉布拉多", "code": "NL"}, {
                "name": "西北地区",
                "code": "NT"
            }, {"name": "新斯科舍", "code": "NS"}, {"name": "努納武特", "code": "NU"}, {
                "name": "安大略",
                "code": "ON"
            }, {"name": "愛德華王子島", "code": "PE"}, {"name": "魁北克", "code": "QC"}, {
                "name": "薩斯喀徹溫",
                "code": "SK"
            }, {"name": "育空", "code": "YT"}]
        }, {
            "name": "加纳",
            "code": "GH",
            "continent": "非洲",
            "phoneNumberPrefix": 233,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "加蓬",
            "code": "GA",
            "continent": "非洲",
            "phoneNumberPrefix": 241,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "匈牙利",
            "code": "HU",
            "continent": "欧洲",
            "phoneNumberPrefix": 36,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{zip}{city}_{address1}_{address2}_{phone}",
                "show": "{firstName} {lastName}_{company}_{zip} {city}_{address1}_{address2}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "北马其顿",
            "code": "MK",
            "continent": "欧洲",
            "phoneNumberPrefix": 389,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "南乔治亚和南桑威奇群岛",
            "code": "GS",
            "continent": "南美洲",
            "phoneNumberPrefix": 500,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "南苏丹",
            "code": "SS",
            "continent": "非洲",
            "phoneNumberPrefix": 211,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "南非",
            "code": "ZA",
            "continent": "非洲",
            "phoneNumberPrefix": 27,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "郊区",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "郊区（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{province}_{zip}_{country}_{phone}"
            },
            "zones": [{"name": "東開普省", "code": "EC"}, {"name": "自由邦省", "code": "FS"}, {
                "name": "豪登省",
                "code": "GP"
            }, {"name": "夸祖魯-納塔爾省", "code": "NL"}, {"name": "林波波省", "code": "LP"}, {
                "name": "普馬蘭加省",
                "code": "MP"
            }, {"name": "西北省", "code": "NW"}, {"name": "北開普省", "code": "NC"}, {"name": "西開普省", "code": "WC"}]
        }, {
            "name": "博茨瓦纳",
            "code": "BW",
            "continent": "非洲",
            "phoneNumberPrefix": 267,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "卡塔尔",
            "code": "QA",
            "continent": "亚洲",
            "phoneNumberPrefix": 974,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "卢旺达",
            "code": "RW",
            "continent": "非洲",
            "phoneNumberPrefix": 250,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "卢森堡",
            "code": "LU",
            "continent": "欧洲",
            "phoneNumberPrefix": 352,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "印度",
            "code": "IN",
            "continent": "亚洲",
            "phoneNumberPrefix": 91,
            "autocompletionField": "address1",
            "provinceKey": "STATE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "PIN 代码",
                "zone": "邦"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city} {province}_{country}_{phone}"
            },
            "zones": [{"name": "安达曼-尼科巴群岛", "code": "AN"}, {
                "name": "安得拉邦",
                "code": "AP"
            }, {"name": "阿鲁纳恰尔邦", "code": "AR"}, {"name": "阿萨姆邦", "code": "AS"}, {
                "name": "比哈尔邦",
                "code": "BR"
            }, {"name": "昌迪加尔", "code": "CH"}, {
                "name": "恰蒂斯加尔邦",
                "code": "CG"
            }, {"name": "达德拉-纳加尔哈维利", "code": "DN"}, {"name": "达曼-第乌", "code": "DD"}, {
                "name": "德里",
                "code": "DL"
            }, {"name": "果阿邦", "code": "GA"}, {"name": "古吉拉特邦", "code": "GJ"}, {
                "name": "哈里亚纳邦",
                "code": "HR"
            }, {"name": "喜马偕尔邦", "code": "HP"}, {"name": "查谟－克什米尔邦", "code": "JK"}, {
                "name": "贾坎德邦",
                "code": "JH"
            }, {"name": "卡纳塔克邦", "code": "KA"}, {"name": "喀拉拉邦", "code": "KL"}, {
                "name": "Ladakh",
                "code": "LA"
            }, {"name": "拉克沙群島", "code": "LD"}, {"name": "中央邦", "code": "MP"}, {
                "name": "马哈拉施特拉邦",
                "code": "MH"
            }, {"name": "曼尼普尔邦", "code": "MN"}, {"name": "梅加拉亚邦", "code": "ML"}, {
                "name": "米佐拉姆邦",
                "code": "MZ"
            }, {"name": "那加兰邦", "code": "NL"}, {"name": "奥里萨邦", "code": "OR"}, {
                "name": "本地治里",
                "code": "PY"
            }, {"name": "旁遮普邦", "code": "PB"}, {"name": "拉贾斯坦邦", "code": "RJ"}, {
                "name": "锡金邦",
                "code": "SK"
            }, {"name": "泰米尔纳德邦", "code": "TN"}, {"name": "特伦甘纳邦", "code": "TS"}, {
                "name": "特里普拉邦",
                "code": "TR"
            }, {"name": "北方邦", "code": "UP"}, {"name": "北阿坎德邦", "code": "UK"}, {
                "name": "西孟加拉邦",
                "code": "WB"
            }]
        }, {
            "name": "印度尼西亚",
            "code": "ID",
            "continent": "亚洲",
            "phoneNumberPrefix": 62,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{province} {zip}_{country}_{phone}"
            },
            "zones": [{"name": "亞齊", "code": "AC"}, {"name": "Bali", "code": "BA"}, {
                "name": "邦加-勿里洞省",
                "code": "BB"
            }, {"name": "万丹省", "code": "BT"}, {"name": "明古魯省", "code": "BE"}, {
                "name": "哥伦打洛省",
                "code": "GO"
            }, {"name": "雅加达", "code": "JK"}, {"name": "占碑省", "code": "JA"}, {
                "name": "西爪哇省",
                "code": "JB"
            }, {"name": "中爪哇省", "code": "JT"}, {"name": "东爪哇省", "code": "JI"}, {
                "name": "西加里曼丹省",
                "code": "KB"
            }, {"name": "南加里曼丹省", "code": "KS"}, {"name": "中加里曼丹省", "code": "KT"}, {
                "name": "東加里曼丹省",
                "code": "KI"
            }, {"name": "北加里曼丹省", "code": "KU"}, {"name": "廖内群岛省", "code": "KR"}, {
                "name": "楠榜省",
                "code": "LA"
            }, {"name": "马鲁古省", "code": "MA"}, {"name": "北马鲁古省", "code": "MU"}, {
                "name": "北苏门答腊省",
                "code": "SU"
            }, {"name": "西努沙登加拉省", "code": "NB"}, {"name": "東努沙登加拉省", "code": "NT"}, {
                "name": "巴布亚省",
                "code": "PA"
            }, {"name": "西巴布亞省", "code": "PB"}, {"name": "廖內省", "code": "RI"}, {
                "name": "南苏门答腊省",
                "code": "SS"
            }, {"name": "西苏拉威西省", "code": "SR"}, {"name": "南苏拉威西省", "code": "SN"}, {
                "name": "中苏拉威西省",
                "code": "ST"
            }, {"name": "东南苏拉威西省", "code": "SG"}, {
                "name": "北苏拉威西省",
                "code": "SA"
            }, {"name": "西苏门答腊省", "code": "SB"}, {"name": "日惹特区", "code": "YO"}]
        }, {
            "name": "危地马拉",
            "code": "GT",
            "continent": "北美洲",
            "phoneNumberPrefix": 502,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {province}_{zip}_{country}_{phone}"
            },
            "zones": [{"name": "上維拉帕斯省", "code": "AVE"}, {
                "name": "下維拉帕斯省",
                "code": "BVE"
            }, {"name": "奇馬爾特南戈省", "code": "CMT"}, {
                "name": "奇基穆拉省",
                "code": "CQM"
            }, {"name": "普羅格雷索省", "code": "EPR"}, {"name": "埃斯昆特拉省", "code": "ESC"}, {
                "name": "瓜地馬拉省",
                "code": "GUA"
            }, {"name": "韋韋特南戈省", "code": "HUE"}, {"name": "伊薩瓦爾省", "code": "IZA"}, {
                "name": "哈拉帕省",
                "code": "JAL"
            }, {"name": "胡蒂亞帕省", "code": "JUT"}, {"name": "貝登省", "code": "PET"}, {
                "name": "克薩爾特南戈省",
                "code": "QUE"
            }, {"name": "基切省", "code": "QUI"}, {"name": "雷塔盧萊烏省", "code": "RET"}, {
                "name": "薩卡特佩克斯省",
                "code": "SAC"
            }, {"name": "聖馬科斯省", "code": "SMA"}, {"name": "聖羅薩省", "code": "SRO"}, {
                "name": "索洛拉省",
                "code": "SOL"
            }, {"name": "蘇奇特佩克斯省", "code": "SUC"}, {"name": "托托尼卡潘省", "code": "TOT"}, {
                "name": "薩卡帕省",
                "code": "ZAC"
            }]
        }, {
            "name": "厄瓜多尔",
            "code": "EC",
            "continent": "南美洲",
            "phoneNumberPrefix": 593,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "厄立特里亚",
            "code": "ER",
            "continent": "非洲",
            "phoneNumberPrefix": 291,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "台湾",
            "code": "TW",
            "continent": "亚洲",
            "phoneNumberPrefix": 886,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "吉尔吉斯斯坦",
            "code": "KG",
            "continent": "亚洲",
            "phoneNumberPrefix": 996,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{zip}{city}_{address2}_{address1}_{company}_{firstName}{lastName}_{phone}",
                "show": "{zip} {city}_{address2}_{address1}_{company}_{firstName} {lastName}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "吉布提",
            "code": "DJ",
            "continent": "非洲",
            "phoneNumberPrefix": 253,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "哈萨克斯坦",
            "code": "KZ",
            "continent": "亚洲",
            "phoneNumberPrefix": 7,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "哥伦比亚",
            "code": "CO",
            "continent": "南美洲",
            "phoneNumberPrefix": 57,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city} {province}_{country}_{phone}"
            },
            "zones": [{"name": "波哥大", "code": "DC"}, {"name": "亚马孙省", "code": "AMA"}, {
                "name": "安蒂奥基亚省",
                "code": "ANT"
            }, {"name": "阿劳卡省", "code": "ARA"}, {"name": "大西洋省", "code": "ATL"}, {
                "name": "玻利瓦尔省",
                "code": "BOL"
            }, {"name": "博亚卡省", "code": "BOY"}, {"name": "卡尔达斯省", "code": "CAL"}, {
                "name": "卡克塔省",
                "code": "CAQ"
            }, {"name": "卡萨纳雷省", "code": "CAS"}, {"name": "考卡省", "code": "CAU"}, {
                "name": "塞萨尔省",
                "code": "CES"
            }, {"name": "乔科省", "code": "CHO"}, {
                "name": "科爾多瓦省 (哥倫比亞)",
                "code": "COR"
            }, {"name": "昆迪納馬卡省", "code": "CUN"}, {"name": "瓜伊尼亚省", "code": "GUA"}, {
                "name": "瓜维亚雷省",
                "code": "GUV"
            }, {"name": "乌伊拉省", "code": "HUI"}, {"name": "瓜希拉省", "code": "LAG"}, {
                "name": "马格达莱纳省",
                "code": "MAG"
            }, {"name": "梅塔省", "code": "MET"}, {"name": "纳里尼奥省", "code": "NAR"}, {
                "name": "北桑坦德省",
                "code": "NSA"
            }, {"name": "普图马约省", "code": "PUT"}, {"name": "金迪奥省", "code": "QUI"}, {
                "name": "里萨拉尔达省",
                "code": "RIS"
            }, {"name": "聖安德列斯-普羅維登西亞和聖卡塔利娜群島省", "code": "SAP"}, {
                "name": "桑坦德省",
                "code": "SAN"
            }, {"name": "苏克雷省", "code": "SUC"}, {"name": "托利马省", "code": "TOL"}, {
                "name": "考卡山谷省",
                "code": "VAC"
            }, {"name": "沃佩斯省", "code": "VAU"}, {"name": "比查达省", "code": "VID"}]
        }, {
            "name": "哥斯达黎加",
            "code": "CR",
            "continent": "北美洲",
            "phoneNumberPrefix": 506,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{province}{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{province} {city}_{zip}_{country}_{phone}"
            },
            "zones": [{"name": "阿拉胡埃拉省", "code": "CR-A"}, {
                "name": "卡塔戈省",
                "code": "CR-C"
            }, {"name": "瓜纳卡斯特省", "code": "CR-G"}, {"name": "埃雷迪亚省", "code": "CR-H"}, {
                "name": "利蒙省",
                "code": "CR-L"
            }, {"name": "蓬塔雷纳斯省", "code": "CR-P"}, {"name": "圣何塞省", "code": "CR-SJ"}]
        }, {
            "name": "喀麦隆",
            "code": "CM",
            "continent": "非洲",
            "phoneNumberPrefix": 237,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "图瓦卢",
            "code": "TV",
            "continent": "大洋洲",
            "phoneNumberPrefix": 688,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "土库曼斯坦",
            "code": "TM",
            "continent": "亚洲",
            "phoneNumberPrefix": 993,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{zip}{city}_{firstName}{lastName}_{company}_{address1}_{address2}_{phone}",
                "show": "{zip} {city}_{country}_{firstName} {lastName}_{company}_{address1}_{address2}_{phone}"
            },
            "zones": []
        }, {
            "name": "土耳其",
            "code": "TR",
            "continent": "亚洲",
            "phoneNumberPrefix": 90,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圣卢西亚",
            "code": "LC",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圣基茨和尼维斯",
            "code": "KN",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圣多美和普林西比",
            "code": "ST",
            "continent": "非洲",
            "phoneNumberPrefix": 239,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圣巴泰勒米",
            "code": "BL",
            "continent": "北美洲",
            "phoneNumberPrefix": 590,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圣文森特和格林纳丁斯",
            "code": "VC",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圣皮埃尔和密克隆群岛",
            "code": "PM",
            "continent": "北美洲",
            "phoneNumberPrefix": 508,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圣诞岛",
            "code": "CX",
            "continent": "大洋洲",
            "phoneNumberPrefix": 61,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圣赫勒拿",
            "code": "SH",
            "continent": "非洲",
            "phoneNumberPrefix": 290,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圣马力诺",
            "code": "SM",
            "continent": "欧洲",
            "phoneNumberPrefix": 378,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "圭亚那",
            "code": "GY",
            "continent": "南美洲",
            "phoneNumberPrefix": 592,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "坦桑尼亚",
            "code": "TZ",
            "continent": "非洲",
            "phoneNumberPrefix": 255,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "埃及",
            "code": "EG",
            "continent": "非洲",
            "phoneNumberPrefix": 20,
            "autocompletionField": "address1",
            "provinceKey": "GOVERNORATE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省/行政区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{province}_{city}_{zip}_{country}_{phone}"
            },
            "zones": [{"name": "10 月 6 日", "code": "SU"}, {"name": "東部省", "code": "SHR"}, {
                "name": "亞歷山大省",
                "code": "ALX"
            }, {"name": "阿斯旺省", "code": "ASN"}, {"name": "艾斯尤特省", "code": "AST"}, {
                "name": "布海拉省",
                "code": "BH"
            }, {"name": "贝尼苏韦夫省", "code": "BNS"}, {"name": "开罗省", "code": "C"}, {
                "name": "代蓋赫利耶省",
                "code": "DK"
            }, {"name": "杜姆亞特省", "code": "DT"}, {"name": "法尤姆省", "code": "FYM"}, {
                "name": "西部省",
                "code": "GH"
            }, {"name": "吉薩省", "code": "GZ"}, {"name": "赫勒万", "code": "HU"}, {
                "name": "伊斯梅利亚省",
                "code": "IS"
            }, {"name": "謝赫村省", "code": "KFS"}, {"name": "盧克索省", "code": "LX"}, {
                "name": "馬特魯省",
                "code": "MT"
            }, {"name": "明亞省", "code": "MN"}, {"name": "米努夫省", "code": "MNF"}, {
                "name": "新河谷省",
                "code": "WAD"
            }, {"name": "北西奈省", "code": "SIN"}, {"name": "塞得港省", "code": "PTS"}, {
                "name": "蓋盧比尤省",
                "code": "KB"
            }, {"name": "基納省", "code": "KN"}, {"name": "红海省", "code": "BA"}, {
                "name": "索哈傑省",
                "code": "SHG"
            }, {"name": "南西奈省", "code": "JS"}, {"name": "蘇伊士省", "code": "SUZ"}]
        }, {
            "name": "埃塞俄比亚",
            "code": "ET",
            "continent": "非洲",
            "phoneNumberPrefix": 251,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "基里巴斯",
            "code": "KI",
            "continent": "大洋洲",
            "phoneNumberPrefix": 686,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "塔吉克斯坦",
            "code": "TJ",
            "continent": "亚洲",
            "phoneNumberPrefix": 992,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "塞内加尔",
            "code": "SN",
            "continent": "非洲",
            "phoneNumberPrefix": 221,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "塞尔维亚",
            "code": "RS",
            "continent": "欧洲",
            "phoneNumberPrefix": 381,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "塞拉利昂",
            "code": "SL",
            "continent": "非洲",
            "phoneNumberPrefix": 232,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "塞浦路斯",
            "code": "CY",
            "continent": "亚洲",
            "phoneNumberPrefix": 357,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "塞舌尔",
            "code": "SC",
            "continent": "非洲",
            "phoneNumberPrefix": 248,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "墨西哥",
            "code": "MX",
            "continent": "北美洲",
            "phoneNumberPrefix": 52,
            "autocompletionField": "address1",
            "provinceKey": "STATE",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "州"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city} {province}_{country}_{phone}"
            },
            "zones": [{"name": "阿瓜斯卡連特斯州", "code": "AGS"}, {
                "name": "下加利福尼亞州",
                "code": "BC"
            }, {"name": "南下加利福尼亞州", "code": "BCS"}, {"name": "坎佩切州", "code": "CAMP"}, {
                "name": "恰帕斯州",
                "code": "CHIS"
            }, {"name": "奇瓦瓦州", "code": "CHIH"}, {"name": "墨西哥城", "code": "DF"}, {
                "name": "科阿韋拉州",
                "code": "COAH"
            }, {"name": "科利馬州", "code": "COL"}, {"name": "杜蘭戈州", "code": "DGO"}, {
                "name": "瓜納華托州",
                "code": "GTO"
            }, {"name": "格雷羅州", "code": "GRO"}, {"name": "伊達爾戈州", "code": "HGO"}, {
                "name": "哈利斯科州",
                "code": "JAL"
            }, {"name": "墨西哥州", "code": "MEX"}, {"name": "米却肯州", "code": "MICH"}, {
                "name": "莫雷洛斯州",
                "code": "MOR"
            }, {"name": "納亞里特州", "code": "NAY"}, {"name": "新萊昂州", "code": "NL"}, {
                "name": "瓦哈卡州",
                "code": "OAX"
            }, {"name": "普埃布拉州", "code": "PUE"}, {"name": "克雷塔羅州", "code": "QRO"}, {
                "name": "金塔納羅奧州",
                "code": "Q ROO"
            }, {"name": "聖路易斯波托西州", "code": "SLP"}, {"name": "錫那羅亞州", "code": "SIN"}, {
                "name": "索諾拉州",
                "code": "SON"
            }, {"name": "塔巴斯科州", "code": "TAB"}, {
                "name": "塔毛利帕斯州",
                "code": "TAMPS"
            }, {"name": "特拉斯卡拉州", "code": "TLAX"}, {"name": "韋拉克魯斯州", "code": "VER"}, {
                "name": "尤卡坦州",
                "code": "YUC"
            }, {"name": "薩卡特卡斯州", "code": "ZAC"}]
        }, {
            "name": "多哥",
            "code": "TG",
            "continent": "非洲",
            "phoneNumberPrefix": 228,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "多米尼克",
            "code": "DM",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "多米尼加共和国",
            "code": "DO",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "奥兰群岛",
            "code": "AX",
            "continent": "欧洲",
            "phoneNumberPrefix": 358,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "奥地利",
            "code": "AT",
            "continent": "欧洲",
            "phoneNumberPrefix": 43,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "其他地址",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "其他地址（选填）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "委内瑞拉",
            "code": "VE",
            "continent": "南美洲",
            "phoneNumberPrefix": 58,
            "autocompletionField": "address1",
            "provinceKey": "STATE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip} {province}_{country}_{phone}"
            },
            "zones": [{"name": "亞馬遜州", "code": "VE-Z"}, {
                "name": "安索阿特吉州",
                "code": "VE-B"
            }, {"name": "阿普雷州", "code": "VE-C"}, {"name": "阿拉瓜州", "code": "VE-D"}, {
                "name": "巴里纳斯州",
                "code": "VE-E"
            }, {"name": "玻利瓦爾州", "code": "VE-F"}, {"name": "卡拉沃沃州", "code": "VE-G"}, {
                "name": "科赫德斯州",
                "code": "VE-H"
            }, {"name": "阿马库罗三角洲州", "code": "VE-Y"}, {
                "name": "聯邦屬地",
                "code": "VE-W"
            }, {"name": "聯邦區 (委內瑞拉)", "code": "VE-A"}, {"name": "法尔孔州", "code": "VE-I"}, {
                "name": "瓜里科州",
                "code": "VE-J"
            }, {"name": "瓦尔加斯州", "code": "VE-X"}, {"name": "拉腊州", "code": "VE-K"}, {
                "name": "梅里达州",
                "code": "VE-L"
            }, {"name": "米兰达州", "code": "VE-M"}, {"name": "莫納加斯州", "code": "VE-N"}, {
                "name": "新埃斯帕塔州",
                "code": "VE-O"
            }, {"name": "波图格萨州", "code": "VE-P"}, {"name": "苏克雷州", "code": "VE-R"}, {
                "name": "塔奇拉州",
                "code": "VE-S"
            }, {"name": "特鲁希略州", "code": "VE-T"}, {"name": "亚拉奎州", "code": "VE-U"}, {
                "name": "苏利亚州",
                "code": "VE-V"
            }]
        }, {
            "name": "孟加拉国",
            "code": "BD",
            "continent": "亚洲",
            "phoneNumberPrefix": 880,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "安哥拉",
            "code": "AO",
            "continent": "非洲",
            "phoneNumberPrefix": 244,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "安圭拉",
            "code": "AI",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country} {zip}_{phone}"
            },
            "zones": []
        }, {
            "name": "安提瓜和巴布达",
            "code": "AG",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "安道尔",
            "code": "AD",
            "continent": "欧洲",
            "phoneNumberPrefix": 376,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "尼加拉瓜",
            "code": "NI",
            "continent": "北美洲",
            "phoneNumberPrefix": 505,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "尼日利亚",
            "code": "NG",
            "continent": "非洲",
            "phoneNumberPrefix": 234,
            "autocompletionField": "address1",
            "provinceKey": "STATE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "州"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city} {province}_{country}_{phone}"
            },
            "zones": [{"name": "阿比亚州", "code": "AB"}, {"name": "聯邦首都特區", "code": "FC"}, {
                "name": "阿達馬瓦",
                "code": "AD"
            }, {"name": "阿夸伊博姆州", "code": "AK"}, {"name": "阿南布拉州", "code": "AN"}, {
                "name": "包奇州",
                "code": "BA"
            }, {"name": "巴耶尔萨州", "code": "BY"}, {"name": "贝努埃州", "code": "BE"}, {
                "name": "博尔诺州",
                "code": "BO"
            }, {"name": "克里斯河州", "code": "CR"}, {"name": "三角州", "code": "DE"}, {
                "name": "埃邦伊州",
                "code": "EB"
            }, {"name": "埃多州", "code": "ED"}, {"name": "埃基蒂州", "code": "EK"}, {
                "name": "埃努古州",
                "code": "EN"
            }, {"name": "贡贝州", "code": "GO"}, {"name": "伊莫州", "code": "IM"}, {
                "name": "吉加瓦州",
                "code": "JI"
            }, {"name": "卡杜纳州", "code": "KD"}, {"name": "卡诺州", "code": "KN"}, {
                "name": "卡齐纳州",
                "code": "KT"
            }, {"name": "凯比州", "code": "KE"}, {"name": "科吉州", "code": "KO"}, {
                "name": "夸拉州",
                "code": "KW"
            }, {"name": "拉各斯州", "code": "LA"}, {"name": "纳萨拉瓦州", "code": "NA"}, {
                "name": "尼日尔州",
                "code": "NI"
            }, {"name": "奥贡州", "code": "OG"}, {"name": "翁多州", "code": "ON"}, {
                "name": "奥孙州",
                "code": "OS"
            }, {"name": "奥约州", "code": "OY"}, {"name": "高原州", "code": "PL"}, {
                "name": "河流州",
                "code": "RI"
            }, {"name": "索科托州", "code": "SO"}, {"name": "塔拉巴州", "code": "TA"}, {
                "name": "约贝州",
                "code": "YO"
            }, {"name": "扎姆法拉州", "code": "ZA"}]
        }, {
            "name": "尼日尔",
            "code": "NE",
            "continent": "非洲",
            "phoneNumberPrefix": 227,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "尼泊尔",
            "code": "NP",
            "continent": "亚洲",
            "phoneNumberPrefix": 977,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "巴勒斯坦领土",
            "code": "PS",
            "continent": "亚洲",
            "phoneNumberPrefix": 970,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "巴哈马",
            "code": "BS",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "巴基斯坦",
            "code": "PK",
            "continent": "亚洲",
            "phoneNumberPrefix": 92,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "巴巴多斯",
            "code": "BB",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "巴布亚新几内亚",
            "code": "PG",
            "continent": "大洋洲",
            "phoneNumberPrefix": 675,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "巴拉圭",
            "code": "PY",
            "continent": "南美洲",
            "phoneNumberPrefix": 595,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "巴拿马",
            "code": "PA",
            "continent": "北美洲",
            "phoneNumberPrefix": 507,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "博卡斯德爾托羅省", "code": "PA-1"}, {
                "name": "奇里基省",
                "code": "PA-4"
            }, {"name": "科克萊省", "code": "PA-2"}, {"name": "科隆省", "code": "PA-3"}, {
                "name": "達連省",
                "code": "PA-5"
            }, {"name": "安貝拉自治區", "code": "PA-EM"}, {
                "name": "埃雷拉省",
                "code": "PA-6"
            }, {"name": "雅拉庫納族自治區", "code": "PA-KY"}, {
                "name": "洛斯桑托斯省",
                "code": "PA-7"
            }, {"name": "恩戈貝布格勒自治區", "code": "PA-NB"}, {
                "name": "巴拿馬省",
                "code": "PA-8"
            }, {"name": "西巴拿馬省", "code": "PA-10"}, {"name": "貝拉瓜斯省", "code": "PA-9"}]
        }, {
            "name": "巴林",
            "code": "BH",
            "continent": "亚洲",
            "phoneNumberPrefix": 973,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "巴西",
            "code": "BR",
            "continent": "南美洲",
            "phoneNumberPrefix": 55,
            "autocompletionField": "zip",
            "provinceKey": "STATE",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "州"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{zip}_{address1}_{address2}_{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city} {province}_{country}_{phone}"
            },
            "zones": [{"name": "阿克里州", "code": "AC"}, {"name": "阿拉戈斯州", "code": "AL"}, {
                "name": "阿马帕",
                "code": "AP"
            }, {"name": "亚马孙州", "code": "AM"}, {"name": "巴伊亚", "code": "BA"}, {
                "name": "塞阿腊",
                "code": "CE"
            }, {"name": "聯邦區", "code": "DF"}, {"name": "圣埃斯皮里图州", "code": "ES"}, {
                "name": "戈亚斯",
                "code": "GO"
            }, {"name": "马拉尼昂州", "code": "MA"}, {"name": "马托格罗索州", "code": "MT"}, {
                "name": "南马托格罗索州",
                "code": "MS"
            }, {"name": "米纳斯吉拉斯", "code": "MG"}, {"name": "帕拉", "code": "PA"}, {
                "name": "帕拉伊巴",
                "code": "PB"
            }, {"name": "巴拉那州", "code": "PR"}, {"name": "伯南布哥", "code": "PE"}, {
                "name": "皮奧伊州",
                "code": "PI"
            }, {"name": "北里约格朗德", "code": "RN"}, {
                "name": "南里奥格兰德州",
                "code": "RS"
            }, {"name": "里約熱內盧州", "code": "RJ"}, {"name": "朗多尼亚州", "code": "RO"}, {
                "name": "羅賴馬州",
                "code": "RR"
            }, {"name": "圣卡塔琳娜州", "code": "SC"}, {"name": "圣保罗州", "code": "SP"}, {
                "name": "塞尔希培州",
                "code": "SE"
            }, {"name": "托坎廷斯", "code": "TO"}]
        }, {
            "name": "布基纳法索",
            "code": "BF",
            "continent": "非洲",
            "phoneNumberPrefix": 226,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "布隆迪",
            "code": "BI",
            "continent": "非洲",
            "phoneNumberPrefix": 257,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "希腊",
            "code": "GR",
            "continent": "欧洲",
            "phoneNumberPrefix": 30,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "库克群岛",
            "code": "CK",
            "continent": "大洋洲",
            "phoneNumberPrefix": 682,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "库拉索",
            "code": "CW",
            "continent": "北美洲",
            "phoneNumberPrefix": 599,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "开曼群岛",
            "code": "KY",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "德国",
            "code": "DE",
            "continent": "欧洲",
            "phoneNumberPrefix": 49,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "其他地址",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "其他地址（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "意大利",
            "code": "IT",
            "continent": "欧洲",
            "phoneNumberPrefix": 39,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city} {province}_{country}_{phone}"
            },
            "zones": [{"name": "阿格里真托省", "code": "AG"}, {
                "name": "亞歷山德里亞省",
                "code": "AL"
            }, {"name": "安科納省", "code": "AN"}, {"name": "瓦莱达奥斯塔", "code": "AO"}, {
                "name": "阿雷佐省",
                "code": "AR"
            }, {"name": "阿斯科利皮切諾省", "code": "AP"}, {"name": "阿斯蒂省", "code": "AT"}, {
                "name": "阿韋利諾省",
                "code": "AV"
            }, {"name": "巴里省", "code": "BA"}, {
                "name": "巴爾萊塔-安德里亞-特蘭尼省",
                "code": "BT"
            }, {"name": "貝盧諾省", "code": "BL"}, {"name": "貝內文托省", "code": "BN"}, {
                "name": "貝加莫省",
                "code": "BG"
            }, {"name": "比耶拉省", "code": "BI"}, {"name": "博洛尼亚省", "code": "BO"}, {
                "name": "波爾扎諾自治省",
                "code": "BZ"
            }, {"name": "布雷西亞省", "code": "BS"}, {"name": "布林迪西省", "code": "BR"}, {
                "name": "卡利亞里省",
                "code": "CA"
            }, {"name": "卡爾塔尼塞塔省", "code": "CL"}, {
                "name": "坎波巴索省",
                "code": "CB"
            }, {"name": "卡博尼亞-伊格萊西亞斯省", "code": "CI"}, {
                "name": "卡塞塔省",
                "code": "CE"
            }, {"name": "卡塔尼亞省", "code": "CT"}, {"name": "卡坦札羅省", "code": "CZ"}, {
                "name": "基耶蒂省",
                "code": "CH"
            }, {"name": "科莫省", "code": "CO"}, {"name": "科森札省", "code": "CS"}, {
                "name": "克雷莫納省",
                "code": "CR"
            }, {"name": "克羅托內省", "code": "KR"}, {"name": "庫內奧省", "code": "CN"}, {
                "name": "恩納省",
                "code": "EN"
            }, {"name": "費爾莫省", "code": "FM"}, {"name": "費拉拉省", "code": "FE"}, {
                "name": "佛羅倫斯省",
                "code": "FI"
            }, {"name": "福賈省", "code": "FG"}, {"name": "費利-切塞納省", "code": "FC"}, {
                "name": "弗罗西诺内省",
                "code": "FR"
            }, {"name": "熱那亞廣域市", "code": "GE"}, {"name": "戈里齊亞省", "code": "GO"}, {
                "name": "格羅塞托省",
                "code": "GR"
            }, {"name": "因佩里亞省", "code": "IM"}, {"name": "伊塞爾尼亞省", "code": "IS"}, {
                "name": "阿奎拉省",
                "code": "AQ"
            }, {"name": "拉斯佩齊亞省", "code": "SP"}, {"name": "拉蒂纳省", "code": "LT"}, {
                "name": "萊切省",
                "code": "LE"
            }, {"name": "萊科省", "code": "LC"}, {"name": "利佛諾省", "code": "LI"}, {
                "name": "洛迪省",
                "code": "LO"
            }, {"name": "盧卡省", "code": "LU"}, {"name": "馬切拉塔省", "code": "MC"}, {
                "name": "曼托瓦省",
                "code": "MN"
            }, {"name": "馬薩-卡拉拉省", "code": "MS"}, {
                "name": "馬泰拉省",
                "code": "MT"
            }, {"name": "米迪奧-坎皮達諾省", "code": "VS"}, {"name": "墨西拿省", "code": "ME"}, {
                "name": "米蘭省",
                "code": "MI"
            }, {"name": "摩德納省", "code": "MO"}, {
                "name": "蒙薩和布里安薩省",
                "code": "MB"
            }, {"name": "那不勒斯廣域市", "code": "NA"}, {"name": "諾瓦拉省", "code": "NO"}, {
                "name": "努奧羅省",
                "code": "NU"
            }, {"name": "奧里亞斯特拉省", "code": "OG"}, {
                "name": "奧爾比亞-坦皮奧省",
                "code": "OT"
            }, {"name": "奧里斯塔諾省", "code": "OR"}, {"name": "帕多瓦省", "code": "PD"}, {
                "name": "巴勒莫省",
                "code": "PA"
            }, {"name": "帕爾馬省", "code": "PR"}, {"name": "帕維亞省", "code": "PV"}, {
                "name": "佩魯賈省",
                "code": "PG"
            }, {"name": "佩薩羅-烏爾比諾省", "code": "PU"}, {"name": "佩斯卡拉省", "code": "PE"}, {
                "name": "皮亚琴察省",
                "code": "PC"
            }, {"name": "比薩省", "code": "PI"}, {"name": "皮斯托亞省", "code": "PT"}, {
                "name": "波代諾內省",
                "code": "PN"
            }, {"name": "波坦察省", "code": "PZ"}, {"name": "普拉托省", "code": "PO"}, {
                "name": "拉古薩省",
                "code": "RG"
            }, {"name": "拉韋納省", "code": "RA"}, {
                "name": "雷焦卡拉布里亞省",
                "code": "RC"
            }, {"name": "雷焦艾米利亞省", "code": "RE"}, {"name": "列蒂省", "code": "RI"}, {
                "name": "里米尼省",
                "code": "RN"
            }, {"name": "羅馬省", "code": "RM"}, {"name": "羅維戈省", "code": "RO"}, {
                "name": "薩萊諾省",
                "code": "SA"
            }, {"name": "薩薩里省", "code": "SS"}, {"name": "薩沃納省", "code": "SV"}, {
                "name": "錫耶納省",
                "code": "SI"
            }, {"name": "錫拉庫薩省", "code": "SR"}, {"name": "松德里奧省", "code": "SO"}, {
                "name": "塔蘭托省",
                "code": "TA"
            }, {"name": "泰拉莫省", "code": "TE"}, {"name": "特爾尼省", "code": "TR"}, {
                "name": "都靈省",
                "code": "TO"
            }, {"name": "特拉帕尼省", "code": "TP"}, {"name": "特倫托自治省", "code": "TN"}, {
                "name": "特雷維索省",
                "code": "TV"
            }, {"name": "的里雅斯特省", "code": "TS"}, {"name": "烏迪內省", "code": "UD"}, {
                "name": "瓦雷澤省",
                "code": "VA"
            }, {"name": "威尼斯省", "code": "VE"}, {
                "name": "韋爾巴諾-庫西亞-奧索拉省",
                "code": "VB"
            }, {"name": "韋爾切利省", "code": "VC"}, {"name": "維羅納省", "code": "VR"}, {
                "name": "維博瓦倫蒂亞省",
                "code": "VV"
            }, {"name": "維琴察省", "code": "VI"}, {"name": "维泰博省", "code": "VT"}]
        }, {
            "name": "所罗门群岛",
            "code": "SB",
            "continent": "大洋洲",
            "phoneNumberPrefix": 677,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "托克劳",
            "code": "TK",
            "continent": "大洋洲",
            "phoneNumberPrefix": 690,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "拉脱维亚",
            "code": "LV",
            "continent": "欧洲",
            "phoneNumberPrefix": 371,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "挪威",
            "code": "NO",
            "continent": "欧洲",
            "phoneNumberPrefix": 47,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "捷克",
            "code": "CZ",
            "continent": "欧洲",
            "phoneNumberPrefix": 420,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "摩尔多瓦",
            "code": "MD",
            "continent": "欧洲",
            "phoneNumberPrefix": 373,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "摩洛哥",
            "code": "MA",
            "continent": "非洲",
            "phoneNumberPrefix": 212,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "摩纳哥",
            "code": "MC",
            "continent": "欧洲",
            "phoneNumberPrefix": 377,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "区",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "文莱",
            "code": "BN",
            "continent": "亚洲",
            "phoneNumberPrefix": 673,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "斐济",
            "code": "FJ",
            "continent": "大洋洲",
            "phoneNumberPrefix": 679,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "斯威士兰",
            "code": "SZ",
            "continent": "非洲",
            "phoneNumberPrefix": 268,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "斯洛伐克",
            "code": "SK",
            "continent": "欧洲",
            "phoneNumberPrefix": 421,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "斯洛文尼亚",
            "code": "SI",
            "continent": "欧洲",
            "phoneNumberPrefix": 386,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "斯瓦尔巴和扬马延",
            "code": "SJ",
            "continent": "欧洲",
            "phoneNumberPrefix": 47,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "斯里兰卡",
            "code": "LK",
            "continent": "亚洲",
            "phoneNumberPrefix": 94,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "新加坡",
            "code": "SG",
            "continent": "亚洲",
            "phoneNumberPrefix": 65,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{country} {zip}_{phone}"
            },
            "zones": []
        }, {
            "name": "新喀里多尼亚",
            "code": "NC",
            "continent": "大洋洲",
            "phoneNumberPrefix": 687,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "新西兰",
            "code": "NZ",
            "continent": "大洋洲",
            "phoneNumberPrefix": 64,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "郊区",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "郊区（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{province}_{city} {zip}_{country}_{phone}"
            },
            "zones": [{"name": "奥克兰大区", "code": "AUK"}, {
                "name": "普伦蒂湾大区",
                "code": "BOP"
            }, {"name": "坎特伯雷", "code": "CAN"}, {"name": "查塔姆群岛", "code": "CIT"}, {
                "name": "吉斯伯恩大区",
                "code": "GIS"
            }, {"name": "霍克湾大区", "code": "HKB"}, {"name": "马纳瓦图－旺加努伊", "code": "MWT"}, {
                "name": "马尔堡",
                "code": "MBH"
            }, {"name": "Nelson", "code": "NSN"}, {"name": "北地大区", "code": "NTL"}, {
                "name": "奥塔哥大区",
                "code": "OTA"
            }, {"name": "南地大区", "code": "STL"}, {"name": "塔拉纳基大区", "code": "TKI"}, {
                "name": "塔斯曼",
                "code": "TAS"
            }, {"name": "懷卡托", "code": "WKO"}, {"name": "惠灵顿大区", "code": "WGN"}, {
                "name": "西岸大区",
                "code": "WTC"
            }]
        }, {
            "name": "日本",
            "code": "JP",
            "continent": "亚洲",
            "phoneNumberPrefix": 81,
            "autocompletionField": "zip",
            "provinceKey": "PREFECTURE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "市/区/町/村",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "县"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{lastName}{firstName}_{company}_{zip}{province}_{city}_{address1}_{address2}_{phone}",
                "show": "{country} 〒{zip}_{province} {city}_{address1}_{address2}_{company}_{lastName} {firstName}様_{phone}"
            },
            "zones": [{"name": "北海道", "code": "JP-01"}, {"name": "青森縣", "code": "JP-02"}, {
                "name": "岩手县",
                "code": "JP-03"
            }, {"name": "宮城縣", "code": "JP-04"}, {"name": "秋田县", "code": "JP-05"}, {
                "name": "山形县",
                "code": "JP-06"
            }, {"name": "福岛县", "code": "JP-07"}, {"name": "茨城縣", "code": "JP-08"}, {
                "name": "栃木縣",
                "code": "JP-09"
            }, {"name": "群馬縣", "code": "JP-10"}, {"name": "埼玉縣", "code": "JP-11"}, {
                "name": "千葉縣",
                "code": "JP-12"
            }, {"name": "東京都", "code": "JP-13"}, {"name": "神奈川縣", "code": "JP-14"}, {
                "name": "新潟县",
                "code": "JP-15"
            }, {"name": "富山縣", "code": "JP-16"}, {"name": "石川縣", "code": "JP-17"}, {
                "name": "福井縣",
                "code": "JP-18"
            }, {"name": "山梨县", "code": "JP-19"}, {"name": "长野县", "code": "JP-20"}, {
                "name": "岐阜县",
                "code": "JP-21"
            }, {"name": "靜岡縣", "code": "JP-22"}, {"name": "愛知縣", "code": "JP-23"}, {
                "name": "三重县",
                "code": "JP-24"
            }, {"name": "滋贺县", "code": "JP-25"}, {"name": "京都府", "code": "JP-26"}, {
                "name": "大阪府",
                "code": "JP-27"
            }, {"name": "兵库县", "code": "JP-28"}, {"name": "奈良县", "code": "JP-29"}, {
                "name": "和歌山县",
                "code": "JP-30"
            }, {"name": "鳥取縣", "code": "JP-31"}, {"name": "岛根县", "code": "JP-32"}, {
                "name": "岡山縣",
                "code": "JP-33"
            }, {"name": "广岛县", "code": "JP-34"}, {"name": "山口县", "code": "JP-35"}, {
                "name": "德岛县",
                "code": "JP-36"
            }, {"name": "香川县", "code": "JP-37"}, {"name": "爱媛县", "code": "JP-38"}, {
                "name": "高知县",
                "code": "JP-39"
            }, {"name": "福冈县", "code": "JP-40"}, {"name": "佐贺县", "code": "JP-41"}, {
                "name": "长崎县",
                "code": "JP-42"
            }, {"name": "熊本縣", "code": "JP-43"}, {"name": "大分县", "code": "JP-44"}, {
                "name": "宮崎縣",
                "code": "JP-45"
            }, {"name": "鹿儿岛县", "code": "JP-46"}, {"name": "沖繩縣", "code": "JP-47"}]
        }, {
            "name": "智利",
            "code": "CL",
            "continent": "南美洲",
            "phoneNumberPrefix": 56,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "阿里卡和帕里纳科塔大区", "code": "AP"}, {
                "name": "塔拉帕卡大区",
                "code": "TA"
            }, {"name": "安托法加斯塔大区", "code": "AN"}, {
                "name": "阿塔卡马大区",
                "code": "AT"
            }, {"name": "科金博大区", "code": "CO"}, {
                "name": "瓦尔帕莱索大区",
                "code": "VS"
            }, {"name": "圣地亚哥首都大区", "code": "RM"}, {
                "name": "奥伊金斯将军解放者大区",
                "code": "LI"
            }, {"name": "马乌莱大区", "code": "ML"}, {"name": "Ñuble", "code": "NB"}, {
                "name": "比奥比奥大区",
                "code": "BI"
            }, {"name": "阿劳卡尼亚大区", "code": "AR"}, {"name": "河大区", "code": "LR"}, {
                "name": "湖大区",
                "code": "LL"
            }, {"name": "伊瓦涅斯将军艾森大区", "code": "AI"}, {"name": "麦哲伦-智利南极大区", "code": "MA"}]
        }, {
            "name": "柬埔寨",
            "code": "KH",
            "continent": "亚洲",
            "phoneNumberPrefix": 855,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "根西岛",
            "code": "GG",
            "continent": "欧洲",
            "phoneNumberPrefix": 44,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "格林纳达",
            "code": "GD",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "格陵兰",
            "code": "GL",
            "continent": "北美洲",
            "phoneNumberPrefix": 299,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "格鲁吉亚",
            "code": "GE",
            "continent": "亚洲",
            "phoneNumberPrefix": 995,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "梵蒂冈",
            "code": "VA",
            "continent": "欧洲",
            "phoneNumberPrefix": 39,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {country}_{phone}"
            },
            "zones": []
        }, {
            "name": "比利时",
            "code": "BE",
            "continent": "欧洲",
            "phoneNumberPrefix": 32,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "毛里塔尼亚",
            "code": "MR",
            "continent": "非洲",
            "phoneNumberPrefix": 222,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "毛里求斯",
            "code": "MU",
            "continent": "非洲",
            "phoneNumberPrefix": 230,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "汤加",
            "code": "TO",
            "continent": "大洋洲",
            "phoneNumberPrefix": 676,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "沙特阿拉伯",
            "code": "SA",
            "continent": "亚洲",
            "phoneNumberPrefix": 966,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "法国",
            "code": "FR",
            "continent": "欧洲",
            "phoneNumberPrefix": 33,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "法属南部领地",
            "code": "TF",
            "continent": "非洲",
            "phoneNumberPrefix": 262,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "法属圣马丁",
            "code": "MF",
            "continent": "北美洲",
            "phoneNumberPrefix": 590,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "法属圭亚那",
            "code": "GF",
            "continent": "南美洲",
            "phoneNumberPrefix": 594,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "法属波利尼西亚",
            "code": "PF",
            "continent": "大洋洲",
            "phoneNumberPrefix": 689,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "法罗群岛",
            "code": "FO",
            "continent": "欧洲",
            "phoneNumberPrefix": 298,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "波兰",
            "code": "PL",
            "continent": "欧洲",
            "phoneNumberPrefix": 48,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "波斯尼亚和黑塞哥维那",
            "code": "BA",
            "continent": "欧洲",
            "phoneNumberPrefix": 387,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "泰国",
            "code": "TH",
            "continent": "亚洲",
            "phoneNumberPrefix": 66,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{province} {zip}_{country}_{phone}"
            },
            "zones": [{"name": "安納乍能府", "code": "TH-37"}, {"name": "紅統府", "code": "TH-15"}, {
                "name": "曼谷",
                "code": "TH-10"
            }, {"name": "汶干府", "code": "TH-38"}, {"name": "武里喃府", "code": "TH-31"}, {
                "name": "北柳府",
                "code": "TH-24"
            }, {"name": "猜納府", "code": "TH-18"}, {"name": "猜也奔府", "code": "TH-36"}, {
                "name": "尖竹汶府",
                "code": "TH-22"
            }, {"name": "清邁府", "code": "TH-50"}, {"name": "清萊府", "code": "TH-57"}, {
                "name": "春武里府",
                "code": "TH-20"
            }, {"name": "春蓬府", "code": "TH-86"}, {"name": "加拉信府", "code": "TH-46"}, {
                "name": "甘烹碧府",
                "code": "TH-62"
            }, {"name": "北碧府", "code": "TH-71"}, {"name": "坤敬府", "code": "TH-40"}, {
                "name": "甲米府",
                "code": "TH-81"
            }, {"name": "南邦府", "code": "TH-52"}, {"name": "南奔府", "code": "TH-51"}, {
                "name": "黎府",
                "code": "TH-42"
            }, {"name": "華富里府", "code": "TH-16"}, {"name": "湄宏順府", "code": "TH-58"}, {
                "name": "瑪哈沙拉堪府",
                "code": "TH-44"
            }, {"name": "莫拉限府", "code": "TH-49"}, {"name": "坤西育府", "code": "TH-26"}, {
                "name": "佛統府",
                "code": "TH-73"
            }, {"name": "那空拍儂府", "code": "TH-48"}, {"name": "呵叻府", "code": "TH-30"}, {
                "name": "北欖坡府",
                "code": "TH-60"
            }, {"name": "洛坤府", "code": "TH-80"}, {"name": "楠府", "code": "TH-55"}, {
                "name": "陶公府",
                "code": "TH-96"
            }, {"name": "廊磨喃蒲府", "code": "TH-39"}, {"name": "廊開府", "code": "TH-43"}, {
                "name": "暖武里府",
                "code": "TH-12"
            }, {"name": "巴吞他尼府", "code": "TH-13"}, {"name": "北大年府", "code": "TH-94"}, {
                "name": "芭達亞",
                "code": "TH-S"
            }, {"name": "攀牙府", "code": "TH-82"}, {"name": "博他侖府", "code": "TH-93"}, {
                "name": "帕夭府",
                "code": "TH-56"
            }, {"name": "碧差汶府", "code": "TH-67"}, {"name": "佛丕府", "code": "TH-76"}, {
                "name": "披集府",
                "code": "TH-66"
            }, {"name": "彭世洛府", "code": "TH-65"}, {"name": "大城府", "code": "TH-14"}, {
                "name": "帕府",
                "code": "TH-54"
            }, {"name": "普吉府", "code": "TH-83"}, {"name": "巴真府", "code": "TH-25"}, {
                "name": "班武里府",
                "code": "TH-77"
            }, {"name": "拉廊府", "code": "TH-85"}, {"name": "叻丕府", "code": "TH-70"}, {
                "name": "羅勇府",
                "code": "TH-21"
            }, {"name": "黎逸府", "code": "TH-45"}, {"name": "沙繳府", "code": "TH-27"}, {
                "name": "色軍府",
                "code": "TH-47"
            }, {"name": "北欖府", "code": "TH-11"}, {"name": "龍仔厝府", "code": "TH-74"}, {
                "name": "夜功府",
                "code": "TH-75"
            }, {"name": "北標府", "code": "TH-19"}, {"name": "沙敦府", "code": "TH-91"}, {
                "name": "信武里府",
                "code": "TH-17"
            }, {"name": "四色菊府", "code": "TH-33"}, {"name": "宋卡府", "code": "TH-90"}, {
                "name": "素可泰府",
                "code": "TH-64"
            }, {"name": "素攀武里府", "code": "TH-72"}, {"name": "素叻府", "code": "TH-84"}, {
                "name": "素輦府",
                "code": "TH-32"
            }, {"name": "來興府", "code": "TH-63"}, {"name": "董里府", "code": "TH-92"}, {
                "name": "桐艾府",
                "code": "TH-23"
            }, {"name": "烏汶府", "code": "TH-34"}, {"name": "烏隆府", "code": "TH-41"}, {
                "name": "烏泰他尼府",
                "code": "TH-61"
            }, {"name": "程逸府", "code": "TH-53"}, {"name": "惹拉府", "code": "TH-95"}, {
                "name": "益梭通府",
                "code": "TH-35"
            }]
        }, {
            "name": "泽西岛",
            "code": "JE",
            "continent": "欧洲",
            "phoneNumberPrefix": 44,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "津巴布韦",
            "code": "ZW",
            "continent": "非洲",
            "phoneNumberPrefix": 263,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "洪都拉斯",
            "code": "HN",
            "continent": "北美洲",
            "phoneNumberPrefix": 504,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "海地",
            "code": "HT",
            "continent": "北美洲",
            "phoneNumberPrefix": 509,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "澳大利亚",
            "code": "AU",
            "continent": "大洋洲",
            "phoneNumberPrefix": 61,
            "autocompletionField": "address1",
            "provinceKey": "STATE_AND_TERRITORY",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "郊区",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "州/领地"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {province} {zip}_{country}_{phone}"
            },
            "zones": [{"name": "澳大利亞首都特區", "code": "ACT"}, {
                "name": "新南威爾士州",
                "code": "NSW"
            }, {"name": "北領地", "code": "NT"}, {"name": "昆士蘭州", "code": "QLD"}, {
                "name": "南澳大利亚州",
                "code": "SA"
            }, {"name": "塔斯馬尼亞州", "code": "TAS"}, {"name": "維多利亞州", "code": "VIC"}, {
                "name": "西澳大利亚州",
                "code": "WA"
            }]
        }, {
            "name": "澳门特别行政区",
            "code": "MO",
            "continent": "亚洲",
            "phoneNumberPrefix": 853,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "区域",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "爱尔兰",
            "code": "IE",
            "continent": "欧洲",
            "phoneNumberPrefix": 353,
            "autocompletionField": "address1",
            "provinceKey": "COUNTY",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "郡"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{province}_{zip}_{country}_{phone}"
            },
            "zones": [{"name": "卡洛郡", "code": "CW"}, {"name": "卡文郡", "code": "CN"}, {
                "name": "克莱尔郡",
                "code": "CE"
            }, {"name": "科克郡", "code": "CO"}, {"name": "多尼戈爾郡", "code": "DL"}, {
                "name": "都柏林地區",
                "code": "D"
            }, {"name": "戈尔韦郡", "code": "G"}, {"name": "凱里郡", "code": "KY"}, {
                "name": "基尔代尔郡",
                "code": "KE"
            }, {"name": "基爾肯尼郡", "code": "KK"}, {"name": "萊伊什郡", "code": "LS"}, {
                "name": "利特里姆郡",
                "code": "LM"
            }, {"name": "利默里克郡", "code": "LK"}, {"name": "朗福德郡", "code": "LD"}, {
                "name": "劳斯郡",
                "code": "LH"
            }, {"name": "梅奧郡", "code": "MO"}, {"name": "米斯郡", "code": "MH"}, {
                "name": "莫纳亨郡",
                "code": "MN"
            }, {"name": "奧法利郡", "code": "OY"}, {"name": "羅斯康芒郡", "code": "RN"}, {
                "name": "斯萊戈郡",
                "code": "SO"
            }, {"name": "蒂珀雷里郡", "code": "TA"}, {"name": "沃特福德郡", "code": "WD"}, {
                "name": "韋斯特米斯郡",
                "code": "WH"
            }, {"name": "韦克斯福德郡", "code": "WX"}, {"name": "威克洛郡", "code": "WW"}]
        }, {
            "name": "爱沙尼亚",
            "code": "EE",
            "continent": "欧洲",
            "phoneNumberPrefix": 372,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "牙买加",
            "code": "JM",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "特克斯和凯科斯群岛",
            "code": "TC",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "特立尼达和多巴哥",
            "code": "TT",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "特里斯坦-达库尼亚群岛",
            "code": "TA",
            "continent": "非洲",
            "phoneNumberPrefix": 2908,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "玻利维亚",
            "code": "BO",
            "continent": "南美洲",
            "phoneNumberPrefix": 591,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "瑙鲁",
            "code": "NR",
            "continent": "大洋洲",
            "phoneNumberPrefix": 674,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "瑞典",
            "code": "SE",
            "continent": "欧洲",
            "phoneNumberPrefix": 46,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "公寓、房间号等",
                "city": "市/镇",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "瑞士",
            "code": "CH",
            "continent": "欧洲",
            "phoneNumberPrefix": 41,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "其他地址",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "其他地址（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "瓜德罗普",
            "code": "GP",
            "continent": "北美洲",
            "phoneNumberPrefix": 590,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "瓦利斯和富图纳",
            "code": "WF",
            "continent": "大洋洲",
            "phoneNumberPrefix": 681,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "瓦努阿图",
            "code": "VU",
            "continent": "大洋洲",
            "phoneNumberPrefix": 678,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "留尼汪",
            "code": "RE",
            "continent": "非洲",
            "phoneNumberPrefix": 262,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "白俄罗斯",
            "code": "BY",
            "continent": "欧洲",
            "phoneNumberPrefix": 375,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "百慕大",
            "code": "BM",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "皮特凯恩群岛",
            "code": "PN",
            "continent": "大洋洲",
            "phoneNumberPrefix": 64,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "直布罗陀",
            "code": "GI",
            "continent": "欧洲",
            "phoneNumberPrefix": 350,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "福克兰群岛",
            "code": "FK",
            "continent": "南美洲",
            "phoneNumberPrefix": 500,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "科威特",
            "code": "KW",
            "continent": "亚洲",
            "phoneNumberPrefix": 965,
            "autocompletionField": "address1",
            "provinceKey": "GOVERNORATE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省/行政区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "艾哈迈迪省", "code": "KW-AH"}, {
                "name": "科威特省",
                "code": "KW-KU"
            }, {"name": "費爾瓦尼耶省", "code": "KW-FA"}, {"name": "傑赫拉省", "code": "KW-JA"}, {
                "name": "哈瓦利省",
                "code": "KW-HA"
            }, {"name": "大穆巴拉克省", "code": "KW-MU"}]
        }, {
            "name": "科摩罗",
            "code": "KM",
            "continent": "非洲",
            "phoneNumberPrefix": 269,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "科特迪瓦",
            "code": "CI",
            "continent": "非洲",
            "phoneNumberPrefix": 225,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "科科斯（基林）群岛",
            "code": "CC",
            "continent": "大洋洲",
            "phoneNumberPrefix": 891,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "科索沃",
            "code": "XK",
            "continent": "欧洲",
            "phoneNumberPrefix": 383,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "秘鲁",
            "code": "PE",
            "continent": "南美洲",
            "phoneNumberPrefix": 51,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "亚马孙大区", "code": "PE-AMA"}, {
                "name": "安卡什大区",
                "code": "PE-ANC"
            }, {"name": "阿普里马克大区", "code": "PE-APU"}, {
                "name": "阿雷基帕大区",
                "code": "PE-ARE"
            }, {"name": "阿亚库乔大区", "code": "PE-AYA"}, {
                "name": "卡哈马卡大区",
                "code": "PE-CAJ"
            }, {"name": "卡亚俄大区", "code": "PE-CAL"}, {
                "name": "库斯科大区",
                "code": "PE-CUS"
            }, {"name": "萬卡韋利卡大區", "code": "PE-HUV"}, {
                "name": "瓦努科大区",
                "code": "PE-HUC"
            }, {"name": "伊卡大区", "code": "PE-ICA"}, {
                "name": "胡宁大区",
                "code": "PE-JUN"
            }, {"name": "拉利伯塔德大区", "code": "PE-LAL"}, {
                "name": "兰巴耶克大区",
                "code": "PE-LAM"
            }, {"name": "利馬大區", "code": "PE-LIM"}, {"name": "利馬省", "code": "PE-LMA"}, {
                "name": "洛雷托大区",
                "code": "PE-LOR"
            }, {"name": "马德雷德迪奥斯大区", "code": "PE-MDD"}, {
                "name": "莫克瓜大区",
                "code": "PE-MOQ"
            }, {"name": "帕斯科大区", "code": "PE-PAS"}, {"name": "皮乌拉地区", "code": "PE-PIU"}, {
                "name": "普诺大区",
                "code": "PE-PUN"
            }, {"name": "圣马丁大区", "code": "PE-SAM"}, {
                "name": "塔克纳大区",
                "code": "PE-TAC"
            }, {"name": "通贝斯大区", "code": "PE-TUM"}, {"name": "乌卡亚利大区", "code": "PE-UCA"}]
        }, {
            "name": "突尼斯",
            "code": "TN",
            "continent": "非洲",
            "phoneNumberPrefix": 216,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "立陶宛",
            "code": "LT",
            "continent": "欧洲",
            "phoneNumberPrefix": 370,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "索马里",
            "code": "SO",
            "continent": "非洲",
            "phoneNumberPrefix": 252,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "约旦",
            "code": "JO",
            "continent": "亚洲",
            "phoneNumberPrefix": 962,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "纳米比亚",
            "code": "NA",
            "continent": "非洲",
            "phoneNumberPrefix": 264,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "纽埃",
            "code": "NU",
            "continent": "大洋洲",
            "phoneNumberPrefix": 683,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "缅甸",
            "code": "MM",
            "continent": "亚洲",
            "phoneNumberPrefix": 95,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "罗马尼亚",
            "code": "RO",
            "continent": "欧洲",
            "phoneNumberPrefix": 40,
            "autocompletionField": "address1",
            "provinceKey": "COUNTY",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "郡"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city} {province}_{country}_{phone}"
            },
            "zones": [{"name": "阿爾巴縣", "code": "AB"}, {"name": "阿拉德縣", "code": "AR"}, {
                "name": "阿爾傑什縣",
                "code": "AG"
            }, {"name": "巴克烏縣", "code": "BC"}, {"name": "比霍爾縣", "code": "BH"}, {
                "name": "比斯特里察-訥瑟烏德縣",
                "code": "BN"
            }, {"name": "博托沙尼縣", "code": "BT"}, {"name": "布勒伊拉縣", "code": "BR"}, {
                "name": "布拉索夫縣",
                "code": "BV"
            }, {"name": "布加勒斯特", "code": "B"}, {"name": "布澤烏縣", "code": "BZ"}, {
                "name": "卡拉什-塞維林縣",
                "code": "CS"
            }, {"name": "克魯日縣", "code": "CJ"}, {"name": "康斯坦察縣", "code": "CT"}, {
                "name": "科瓦斯納縣",
                "code": "CV"
            }, {"name": "克勒拉希縣", "code": "CL"}, {"name": "多爾日縣", "code": "DJ"}, {
                "name": "登博維察縣",
                "code": "DB"
            }, {"name": "加拉茨縣", "code": "GL"}, {"name": "久爾久縣", "code": "GR"}, {
                "name": "戈爾日縣",
                "code": "GJ"
            }, {"name": "哈爾吉塔縣", "code": "HR"}, {"name": "胡內多阿拉縣", "code": "HD"}, {
                "name": "雅洛米察縣",
                "code": "IL"
            }, {"name": "雅西縣", "code": "IS"}, {"name": "伊爾福夫縣", "code": "IF"}, {
                "name": "馬拉穆列什縣",
                "code": "MM"
            }, {"name": "梅赫丁茨縣", "code": "MH"}, {"name": "穆列什縣", "code": "MS"}, {
                "name": "尼亞姆茨縣",
                "code": "NT"
            }, {"name": "奧爾特縣", "code": "OT"}, {"name": "普拉霍瓦縣", "code": "PH"}, {
                "name": "瑟拉日縣",
                "code": "SJ"
            }, {"name": "薩圖馬雷縣", "code": "SM"}, {"name": "錫比烏縣", "code": "SB"}, {
                "name": "蘇恰瓦縣",
                "code": "SV"
            }, {"name": "特列奧爾曼縣", "code": "TR"}, {"name": "蒂米什縣", "code": "TM"}, {
                "name": "圖爾恰縣",
                "code": "TL"
            }, {"name": "沃爾恰縣", "code": "VL"}, {"name": "瓦斯盧伊縣", "code": "VS"}, {
                "name": "弗朗恰縣",
                "code": "VN"
            }]
        }, {
            "name": "美国",
            "code": "US",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "STATE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "州"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {province} {zip}_{country}_{phone}"
            },
            "zones": [{"name": "亚拉巴马州", "code": "AL"}, {"name": "阿拉斯加州", "code": "AK"}, {
                "name": "美属萨摩亚",
                "code": "AS"
            }, {"name": "亞利桑那州", "code": "AZ"}, {"name": "阿肯色州", "code": "AR"}, {
                "name": "加利福尼亚州",
                "code": "CA"
            }, {"name": "科羅拉多州", "code": "CO"}, {"name": "康乃狄克州", "code": "CT"}, {
                "name": "特拉华州",
                "code": "DE"
            }, {"name": "華盛頓哥倫比亞特區", "code": "DC"}, {
                "name": "密克罗尼西亚",
                "code": "FM"
            }, {"name": "佛罗里达州", "code": "FL"}, {"name": "喬治亞州", "code": "GA"}, {
                "name": "关岛",
                "code": "GU"
            }, {"name": "夏威夷州", "code": "HI"}, {"name": "爱达荷州", "code": "ID"}, {
                "name": "伊利诺伊州",
                "code": "IL"
            }, {"name": "印第安纳州", "code": "IN"}, {"name": "艾奥瓦州", "code": "IA"}, {
                "name": "堪薩斯州",
                "code": "KS"
            }, {"name": "肯塔基州", "code": "KY"}, {"name": "路易斯安那州", "code": "LA"}, {
                "name": "缅因州",
                "code": "ME"
            }, {"name": "马绍尔群岛", "code": "MH"}, {"name": "马里兰州", "code": "MD"}, {
                "name": "麻薩諸塞州",
                "code": "MA"
            }, {"name": "密歇根州", "code": "MI"}, {"name": "明尼蘇達州", "code": "MN"}, {
                "name": "密西西比州",
                "code": "MS"
            }, {"name": "密蘇里州", "code": "MO"}, {"name": "蒙大拿州", "code": "MT"}, {
                "name": "內布拉斯加州",
                "code": "NE"
            }, {"name": "内华达州", "code": "NV"}, {"name": "新罕布什尔州", "code": "NH"}, {
                "name": "新泽西州",
                "code": "NJ"
            }, {"name": "新墨西哥州", "code": "NM"}, {"name": "纽约州", "code": "NY"}, {
                "name": "北卡罗来纳州",
                "code": "NC"
            }, {"name": "北达科他州", "code": "ND"}, {"name": "北马里亚纳群岛", "code": "MP"}, {
                "name": "俄亥俄州",
                "code": "OH"
            }, {"name": "奧克拉荷馬州", "code": "OK"}, {"name": "俄勒冈州", "code": "OR"}, {
                "name": "帕劳",
                "code": "PW"
            }, {"name": "宾夕法尼亚州", "code": "PA"}, {"name": "波多黎各", "code": "PR"}, {
                "name": "羅德島州",
                "code": "RI"
            }, {"name": "南卡罗来纳州", "code": "SC"}, {"name": "南达科他州", "code": "SD"}, {
                "name": "田纳西州",
                "code": "TN"
            }, {"name": "得克萨斯州", "code": "TX"}, {"name": "犹他州", "code": "UT"}, {
                "name": "佛蒙特州",
                "code": "VT"
            }, {"name": "美属维尔京群岛", "code": "VI"}, {"name": "弗吉尼亚州", "code": "VA"}, {
                "name": "华盛顿州",
                "code": "WA"
            }, {"name": "西維吉尼亞州", "code": "WV"}, {"name": "威斯康辛州", "code": "WI"}, {
                "name": "怀俄明州",
                "code": "WY"
            }, {"name": "美洲武装部队", "code": "AA"}, {
                "name": "欧洲武装部队",
                "code": "AE"
            }, {"name": "太平洋武装部队", "code": "AP"}]
        }, {
            "name": "美国本土外小岛屿",
            "code": "UM",
            "continent": "大洋洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "STATE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "老挝",
            "code": "LA",
            "continent": "亚洲",
            "phoneNumberPrefix": 856,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "肯尼亚",
            "code": "KE",
            "continent": "非洲",
            "phoneNumberPrefix": 254,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "芬兰",
            "code": "FI",
            "continent": "欧洲",
            "phoneNumberPrefix": 358,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "苏丹",
            "code": "SD",
            "continent": "非洲",
            "phoneNumberPrefix": 249,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "苏里南",
            "code": "SR",
            "continent": "南美洲",
            "phoneNumberPrefix": 597,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "英国",
            "code": "GB",
            "continent": "欧洲",
            "phoneNumberPrefix": 44,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": [{"name": "英国军队", "code": "BFP"}, {"name": "英格兰", "code": "ENG"}, {
                "name": "北爱尔兰",
                "code": "NIR"
            }, {"name": "苏格兰", "code": "SCT"}, {"name": "威尔士", "code": "WLS"}]
        }, {
            "name": "英属印度洋领地",
            "code": "IO",
            "continent": "非洲",
            "phoneNumberPrefix": 246,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "英属维尔京群岛",
            "code": "VG",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "荷兰",
            "code": "NL",
            "continent": "欧洲",
            "phoneNumberPrefix": 31,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "荷属加勒比区",
            "code": "BQ",
            "continent": "北美洲",
            "phoneNumberPrefix": 599,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "荷属圣马丁",
            "code": "SX",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "莫桑比克",
            "code": "MZ",
            "continent": "非洲",
            "phoneNumberPrefix": 258,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "莱索托",
            "code": "LS",
            "continent": "非洲",
            "phoneNumberPrefix": 266,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "菲律宾",
            "code": "PH",
            "continent": "亚洲",
            "phoneNumberPrefix": 63,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "阿布拉省", "code": "PH-ABR"}, {
                "name": "北阿古桑省",
                "code": "PH-AGN"
            }, {"name": "南阿古桑省", "code": "PH-AGS"}, {"name": "阿克兰省", "code": "PH-AKL"}, {
                "name": "阿尔拜省",
                "code": "PH-ALB"
            }, {"name": "安蒂克省", "code": "PH-ANT"}, {"name": "阿巴尧省", "code": "PH-APA"}, {
                "name": "奥罗拉省",
                "code": "PH-AUR"
            }, {"name": "巴西兰省", "code": "PH-BAS"}, {"name": "巴丹省", "code": "PH-BAN"}, {
                "name": "巴丹群島省",
                "code": "PH-BTN"
            }, {"name": "八打雁省", "code": "PH-BTG"}, {"name": "本格特省", "code": "PH-BEN"}, {
                "name": "比利兰省",
                "code": "PH-BIL"
            }, {"name": "保和省", "code": "PH-BOH"}, {"name": "布基农省", "code": "PH-BUK"}, {
                "name": "布拉干省",
                "code": "PH-BUL"
            }, {"name": "卡加延省", "code": "PH-CAG"}, {"name": "北甘馬粦省", "code": "PH-CAN"}, {
                "name": "南甘馬粦省",
                "code": "PH-CAS"
            }, {"name": "卡米金省", "code": "PH-CAM"}, {"name": "卡皮茲省", "code": "PH-CAP"}, {
                "name": "卡坦端内斯省",
                "code": "PH-CAT"
            }, {"name": "甲米地省", "code": "PH-CAV"}, {"name": "宿霧省", "code": "PH-CEB"}, {
                "name": "哥打巴托省",
                "code": "PH-NCO"
            }, {"name": "西達沃省", "code": "PH-DVO"}, {
                "name": "东达沃省",
                "code": "PH-DAO"
            }, {"name": "康波斯特拉谷省", "code": "PH-COM"}, {
                "name": "北達沃省",
                "code": "PH-DAV"
            }, {"name": "南達沃省", "code": "PH-DAS"}, {"name": "迪纳加特群岛", "code": "PH-DIN"}, {
                "name": "東薩馬省",
                "code": "PH-EAS"
            }, {"name": "吉馬拉斯省", "code": "PH-GUI"}, {"name": "伊富高省", "code": "PH-IFU"}, {
                "name": "北伊羅戈省",
                "code": "PH-ILN"
            }, {"name": "南伊羅戈省", "code": "PH-ILS"}, {
                "name": "伊洛伊洛省",
                "code": "PH-ILI"
            }, {"name": "伊莎貝拉省", "code": "PH-ISA"}, {"name": "卡林阿省", "code": "PH-KAL"}, {
                "name": "聯合省",
                "code": "PH-LUN"
            }, {"name": "內湖省", "code": "PH-LAG"}, {"name": "北拉瑙省", "code": "PH-LAN"}, {
                "name": "南拉瑙省",
                "code": "PH-LAS"
            }, {"name": "雷伊泰省", "code": "PH-LEY"}, {"name": "馬京達瑙省", "code": "PH-MAG"}, {
                "name": "馬林杜克省",
                "code": "PH-MAD"
            }, {"name": "馬斯巴特省", "code": "PH-MAS"}, {
                "name": "馬尼拉大都會",
                "code": "PH-00"
            }, {"name": "西米薩米斯省", "code": "PH-MSC"}, {
                "name": "東米薩米斯省",
                "code": "PH-MSR"
            }, {"name": "高山省", "code": "PH-MOU"}, {"name": "西內格羅省", "code": "PH-NEC"}, {
                "name": "東內格羅省",
                "code": "PH-NER"
            }, {"name": "北薩馬省", "code": "PH-NSA"}, {"name": "新怡詩夏省", "code": "PH-NUE"}, {
                "name": "新比斯開省",
                "code": "PH-NUV"
            }, {"name": "西民都洛省", "code": "PH-MDC"}, {"name": "東民都洛省", "code": "PH-MDR"}, {
                "name": "巴拉望省",
                "code": "PH-PLW"
            }, {"name": "邦板牙省", "code": "PH-PAM"}, {"name": "邦阿西楠省", "code": "PH-PAN"}, {
                "name": "奎松省",
                "code": "PH-QUE"
            }, {"name": "季里諾省", "code": "PH-QUI"}, {"name": "黎剎省", "code": "PH-RIZ"}, {
                "name": "朗布隆省",
                "code": "PH-ROM"
            }, {"name": "薩馬省", "code": "PH-WSA"}, {"name": "薩蘭加尼省", "code": "PH-SAR"}, {
                "name": "錫基霍爾省",
                "code": "PH-SIG"
            }, {"name": "索索貢省", "code": "PH-SOR"}, {"name": "南哥打巴托省", "code": "PH-SCO"}, {
                "name": "南萊特省",
                "code": "PH-SLE"
            }, {"name": "蘇丹庫達拉省", "code": "PH-SUK"}, {"name": "蘇祿省", "code": "PH-SLU"}, {
                "name": "北苏里高省",
                "code": "PH-SUN"
            }, {"name": "南苏里高省", "code": "PH-SUR"}, {"name": "丹轆省", "code": "PH-TAR"}, {
                "name": "塔威塔威省",
                "code": "PH-TAW"
            }, {"name": "三描礼士省", "code": "PH-ZMB"}, {
                "name": "三寶顏錫布格省",
                "code": "PH-ZSI"
            }, {"name": "北三寶顏省", "code": "PH-ZAN"}, {"name": "南三寶顏省", "code": "PH-ZAS"}]
        }, {
            "name": "萨尔瓦多",
            "code": "SV",
            "continent": "北美洲",
            "phoneNumberPrefix": 503,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "部门"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "阿瓦查潘", "code": "SV-AH"}, {
                "name": "卡瓦尼亚斯",
                "code": "SV-CA"
            }, {"name": "查拉特南戈", "code": "SV-CH"}, {"name": "库斯卡特兰", "code": "SV-CU"}, {
                "name": "拉利伯塔德",
                "code": "SV-LI"
            }, {"name": "拉巴斯", "code": "SV-PA"}, {"name": "拉乌尼翁", "code": "SV-UN"}, {
                "name": "莫拉桑",
                "code": "SV-MO"
            }, {"name": "圣米格尔", "code": "SV-SM"}, {"name": "聖薩爾瓦多", "code": "SV-SS"}, {
                "name": "圣维森特",
                "code": "SV-SV"
            }, {"name": "圣安娜", "code": "SV-SA"}, {"name": "松索纳特", "code": "SV-SO"}, {
                "name": "乌苏卢坦",
                "code": "SV-US"
            }]
        }, {
            "name": "萨摩亚",
            "code": "WS",
            "continent": "大洋洲",
            "phoneNumberPrefix": 685,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "葡萄牙",
            "code": "PT",
            "continent": "欧洲",
            "phoneNumberPrefix": 351,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "亚速尔群岛", "code": "PT-20"}, {"name": "阿威羅區", "code": "PT-01"}, {
                "name": "貝雅區",
                "code": "PT-02"
            }, {"name": "布拉加區", "code": "PT-03"}, {"name": "布拉干薩區", "code": "PT-04"}, {
                "name": "布朗庫堡區",
                "code": "PT-05"
            }, {"name": "科英布拉區", "code": "PT-06"}, {"name": "埃武拉區", "code": "PT-07"}, {
                "name": "法魯區",
                "code": "PT-08"
            }, {"name": "瓜達區", "code": "PT-09"}, {"name": "萊里亞區", "code": "PT-10"}, {
                "name": "里斯本區",
                "code": "PT-11"
            }, {"name": "馬德拉", "code": "PT-30"}, {"name": "波塔萊格雷區", "code": "PT-12"}, {
                "name": "波爾圖區",
                "code": "PT-13"
            }, {"name": "聖塔倫區", "code": "PT-14"}, {"name": "塞圖巴爾區", "code": "PT-15"}, {
                "name": "維亞納堡區",
                "code": "PT-16"
            }, {"name": "雷亞爾城區", "code": "PT-17"}, {"name": "維塞烏區", "code": "PT-18"}]
        }, {
            "name": "蒙古",
            "code": "MN",
            "continent": "亚洲",
            "phoneNumberPrefix": 976,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "蒙特塞拉特",
            "code": "MS",
            "continent": "北美洲",
            "phoneNumberPrefix": 1,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "西撒哈拉",
            "code": "EH",
            "continent": "非洲",
            "phoneNumberPrefix": 212,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "西班牙",
            "code": "ES",
            "continent": "欧洲",
            "phoneNumberPrefix": 34,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "街道和门牌号",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "拉科鲁尼亚省", "code": "C"}, {
                "name": "阿拉瓦省",
                "code": "VI"
            }, {"name": "阿爾瓦塞特省", "code": "AB"}, {"name": "阿利坎特省", "code": "A"}, {
                "name": "阿爾梅里亞省",
                "code": "AL"
            }, {"name": "Asturias Province", "code": "O"}, {"name": "阿维拉省", "code": "AV"}, {
                "name": "巴达霍斯省",
                "code": "BA"
            }, {"name": "巴利阿里群島²", "code": "PM"}, {"name": "巴塞罗那省", "code": "B"}, {
                "name": "布尔戈斯省",
                "code": "BU"
            }, {"name": "卡塞雷斯省", "code": "CC"}, {"name": "加的斯省", "code": "CA"}, {
                "name": "坎塔布里亚²",
                "code": "S"
            }, {"name": "卡斯特利翁省", "code": "CS"}, {"name": "休达", "code": "CE"}, {
                "name": "雷阿爾城省",
                "code": "CR"
            }, {"name": "科爾多瓦省", "code": "CO"}, {"name": "昆卡省", "code": "CU"}, {
                "name": "赫羅納省",
                "code": "GI"
            }, {"name": "格拉納達省", "code": "GR"}, {"name": "瓜達拉哈拉省", "code": "GU"}, {
                "name": "吉普斯夸省",
                "code": "SS"
            }, {"name": "韋爾瓦省", "code": "H"}, {"name": "韋斯卡省", "code": "HU"}, {
                "name": "哈恩省",
                "code": "J"
            }, {"name": "拉里奥哈", "code": "LO"}, {"name": "拉斯帕爾馬斯省", "code": "GC"}, {
                "name": "莱昂省",
                "code": "LE"
            }, {"name": "莱里达省", "code": "L"}, {"name": "卢戈省", "code": "LU"}, {
                "name": "Madrid Province",
                "code": "M"
            }, {"name": "馬拉加省", "code": "MA"}, {"name": "梅利利亚", "code": "ML"}, {
                "name": "Murcia",
                "code": "MU"
            }, {"name": "納瓦拉²", "code": "NA"}, {"name": "奥伦塞省", "code": "OR"}, {
                "name": "帕伦西亚省",
                "code": "P"
            }, {"name": "蓬特韋德拉省", "code": "PO"}, {
                "name": "萨拉曼卡省",
                "code": "SA"
            }, {"name": "聖克魯斯-德特內里費省", "code": "TF"}, {
                "name": "塞哥維亞省",
                "code": "SG"
            }, {"name": "塞維利亞省", "code": "SE"}, {"name": "索里亚省", "code": "SO"}, {
                "name": "塔拉戈纳省",
                "code": "T"
            }, {"name": "特魯埃爾省", "code": "TE"}, {"name": "托萊多省", "code": "TO"}, {
                "name": "巴倫西亞省",
                "code": "V"
            }, {"name": "巴利亞多利德省", "code": "VA"}, {"name": "比斯開省", "code": "BI"}, {
                "name": "萨莫拉省",
                "code": "ZA"
            }, {"name": "薩拉戈薩省", "code": "Z"}]
        }, {
            "name": "诺福克岛",
            "code": "NF",
            "continent": "大洋洲",
            "phoneNumberPrefix": 672,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country} {zip}_{phone}"
            },
            "zones": []
        }, {
            "name": "贝宁",
            "code": "BJ",
            "continent": "非洲",
            "phoneNumberPrefix": 229,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "赞比亚",
            "code": "ZM",
            "continent": "非洲",
            "phoneNumberPrefix": 260,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "赤道几内亚",
            "code": "GQ",
            "continent": "非洲",
            "phoneNumberPrefix": 240,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "越南",
            "code": "VN",
            "continent": "亚洲",
            "phoneNumberPrefix": 84,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "阿塞拜疆",
            "code": "AZ",
            "continent": "亚洲",
            "phoneNumberPrefix": 994,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "阿富汗",
            "code": "AF",
            "continent": "亚洲",
            "phoneNumberPrefix": 93,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "阿尔及利亚",
            "code": "DZ",
            "continent": "非洲",
            "phoneNumberPrefix": 213,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "阿尔巴尼亚",
            "code": "AL",
            "continent": "欧洲",
            "phoneNumberPrefix": 355,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "阿拉伯联合酋长国",
            "code": "AE",
            "continent": "亚洲",
            "phoneNumberPrefix": 971,
            "autocompletionField": "address1",
            "provinceKey": "EMIRATE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "酋长国"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {province}_{country}_{phone}"
            },
            "zones": [{"name": "阿布扎比", "code": "AZ"}, {"name": "阿吉曼", "code": "AJ"}, {
                "name": "迪拜酋长国",
                "code": "DU"
            }, {"name": "富吉拉", "code": "FU"}, {"name": "拉斯海玛", "code": "RK"}, {
                "name": "夏尔迦",
                "code": "SH"
            }, {"name": "欧姆古温", "code": "UQ"}]
        }, {
            "name": "阿曼",
            "code": "OM",
            "continent": "亚洲",
            "phoneNumberPrefix": 968,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "阿根廷",
            "code": "AR",
            "continent": "南美洲",
            "phoneNumberPrefix": 54,
            "autocompletionField": "address1",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city} {province}_{country}_{phone}"
            },
            "zones": [{"name": "布宜诺斯艾利斯省", "code": "B"}, {"name": "卡塔马卡省", "code": "K"}, {
                "name": "查科省",
                "code": "H"
            }, {"name": "丘布特省", "code": "U"}, {"name": "布宜诺斯艾利斯自治市", "code": "C"}, {
                "name": "科尔多瓦省",
                "code": "X"
            }, {"name": "科连特斯省", "code": "W"}, {"name": "恩特雷里奥斯省", "code": "E"}, {
                "name": "福爾摩沙省",
                "code": "P"
            }, {"name": "胡胡伊省", "code": "Y"}, {"name": "拉潘帕省", "code": "L"}, {
                "name": "拉里奥哈省",
                "code": "F"
            }, {"name": "门多萨省", "code": "M"}, {"name": "米西奧內斯省", "code": "N"}, {
                "name": "内乌肯省",
                "code": "Q"
            }, {"name": "内格罗河省", "code": "R"}, {"name": "萨尔塔省", "code": "A"}, {
                "name": "圣胡安省",
                "code": "J"
            }, {"name": "圣路易省", "code": "D"}, {"name": "圣克鲁斯省", "code": "Z"}, {
                "name": "聖大非省",
                "code": "S"
            }, {"name": "圣地亚哥－德尔埃斯特罗省", "code": "G"}, {"name": "火地岛省", "code": "V"}, {
                "name": "图库曼省",
                "code": "T"
            }]
        }, {
            "name": "阿森松岛",
            "code": "AC",
            "continent": "非洲",
            "phoneNumberPrefix": 247,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "阿鲁巴",
            "code": "AW",
            "continent": "北美洲",
            "phoneNumberPrefix": 297,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "韩国",
            "code": "KR",
            "continent": "亚洲",
            "phoneNumberPrefix": 82,
            "autocompletionField": "zip",
            "provinceKey": "PROVINCE",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "省"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{company}_{lastName}{firstName}_{zip}_{province}{city}_{address1}_{address2}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "釜山", "code": "KR-26"}, {"name": "忠清北道", "code": "KR-43"}, {
                "name": "忠清南道",
                "code": "KR-44"
            }, {"name": "大邱廣域市", "code": "KR-27"}, {"name": "大田广域市", "code": "KR-30"}, {
                "name": "江原道",
                "code": "KR-42"
            }, {"name": "光州廣域市", "code": "KR-29"}, {"name": "庆尚北道", "code": "KR-47"}, {
                "name": "京畿道",
                "code": "KR-41"
            }, {"name": "庆尚南道", "code": "KR-48"}, {
                "name": "仁川廣域市",
                "code": "KR-28"
            }, {"name": "濟州特別自治道", "code": "KR-49"}, {"name": "全羅北道", "code": "KR-45"}, {
                "name": "全羅南道",
                "code": "KR-46"
            }, {"name": "世宗特別自治市", "code": "KR-50"}, {"name": "首爾", "code": "KR-11"}, {
                "name": "蔚山广域市",
                "code": "KR-31"
            }]
        }, {
            "name": "香港特别行政区",
            "code": "HK",
            "continent": "亚洲",
            "phoneNumberPrefix": 852,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "区",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{province} {country}_{phone}"
            },
            "zones": [{"name": "九龙", "code": "KL"}, {"name": "新界", "code": "NT"}, {"name": "香港岛", "code": "HK"}]
        }, {
            "name": "马尔代夫",
            "code": "MV",
            "continent": "亚洲",
            "phoneNumberPrefix": 960,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "马恩岛",
            "code": "IM",
            "continent": "欧洲",
            "phoneNumberPrefix": 44,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "马拉维",
            "code": "MW",
            "continent": "非洲",
            "phoneNumberPrefix": 265,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "马提尼克",
            "code": "MQ",
            "continent": "北美洲",
            "phoneNumberPrefix": 596,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "马来西亚",
            "code": "MY",
            "continent": "亚洲",
            "phoneNumberPrefix": 60,
            "autocompletionField": "address1",
            "provinceKey": "STATE_AND_TERRITORY",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "州/领地"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}{province}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{province}_{country}_{phone}"
            },
            "zones": [{"name": "柔佛州", "code": "JHR"}, {"name": "吉打", "code": "KDH"}, {
                "name": "吉兰丹",
                "code": "KTN"
            }, {"name": "吉隆坡", "code": "KUL"}, {"name": "纳闽", "code": "LBN"}, {
                "name": "马六甲",
                "code": "MLK"
            }, {"name": "森美兰", "code": "NSN"}, {"name": "彭亨", "code": "PHG"}, {
                "name": "槟城",
                "code": "PNG"
            }, {"name": "霹靂州", "code": "PRK"}, {"name": "玻璃市", "code": "PLS"}, {
                "name": "布城",
                "code": "PJY"
            }, {"name": "沙巴", "code": "SBH"}, {"name": "砂拉越", "code": "SWK"}, {
                "name": "雪蘭莪",
                "code": "SGR"
            }, {"name": "登嘉樓", "code": "TRG"}]
        }, {
            "name": "马约特",
            "code": "YT",
            "continent": "非洲",
            "phoneNumberPrefix": 262,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "马耳他",
            "code": "MT",
            "continent": "欧洲",
            "phoneNumberPrefix": 356,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "马达加斯加",
            "code": "MG",
            "continent": "非洲",
            "phoneNumberPrefix": 261,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "马里",
            "code": "ML",
            "continent": "非洲",
            "phoneNumberPrefix": 223,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "黎巴嫩",
            "code": "LB",
            "continent": "亚洲",
            "phoneNumberPrefix": 961,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{city}{zip}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{city} {zip}_{country}_{phone}"
            },
            "zones": []
        }, {
            "name": "黑山",
            "code": "ME",
            "continent": "欧洲",
            "phoneNumberPrefix": 382,
            "autocompletionField": "address1",
            "provinceKey": "REGION",
            "labels": {
                "address1": "地址",
                "address2": "公寓、房间号等。",
                "city": "城市",
                "company": "公司",
                "country": "国家/地区",
                "firstName": "名字",
                "lastName": "姓氏",
                "phone": "电话号码",
                "postalCode": "邮政编码",
                "zone": "地区"
            },
            "optionalLabels": {"address2": "公寓、房间号等。（可选）"},
            "formatting": {
                "edit": "{country}_{firstName}{lastName}_{company}_{address1}_{address2}_{zip}{city}_{phone}",
                "show": "{firstName} {lastName}_{company}_{address1}_{address2}_{zip} {city}_{country}_{phone}"
            },
            "zones": []
        }]
    }
}
let orderData = null;

function extractDomain(url) {
    try {
        const urlObj = new URL(url); // 解析 URL
        return `${urlObj.protocol}//${urlObj.hostname}`; // 拼接协议和主机名
    } catch (error) {
        console.error('Invalid URL:', error);
        return null; // 如果 URL 无效，返回 null
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
        textItem[i] = `${orderData.order.line_items[i].name} x ${orderData.order.line_items[i].fulfillable_quantity} ${orderData.order.line_items[i].price_set.shop_money.currency_code}${orderData.order.line_items[i].price_set.shop_money.amount}`
    }
    textItem = textItem.join('\n')

    let textPhone = orderData.order.shipping_address.phone
    if (orderData.order.shipping_address.phone[0] !== '+') {
        for (let i = 0, len = countryData.data.countries.length; i < len; i++) {
            if (countryData.data.countries[i].code === orderData.order.shipping_address.country_code) {
                textPhone = `${countryData.data.countries[i].phoneNumberPrefix}${orderData.order.shipping_address.phone}`
                break
            }
        }
    }

    let textLandingSite = ''
    if (orderData.order.landing_site && orderData.order.order_status_url) {
        // orderData.order.landing_site 去掉问号后面的参数
        orderData.order.landing_site = orderData.order.landing_site.split('?')[0]
        // orderData.order.order_status_url 去掉域名后面的参数，只保留域名
        orderData.order.order_status_url = extractDomain(orderData.order.order_status_url)
        if (orderData.order.order_status_url) {
            // 把 landing_site 和 order_status_url 拼接起来，组合成 https://ilovesupermarket.com/products/laser-level-line-tool🛠️🛠️
            textLandingSite = `Landing site: ${orderData.order.order_status_url}${orderData.order.landing_site}\n`
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

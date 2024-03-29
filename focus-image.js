// ==UserScript==
// @name         专注看图
// @version      1.0.0
// @description  专注查看所有图片
// @author       lennon
// @license      MIT
// @match        https://www.xgmn01.com/*
// @match        https://mrcong.com/*
// @match        https://misskon.com/*
// @match        https://studio.youtube.com/channel/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://unpkg.com/swiper@8/swiper-bundle.min.js
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
'use strict';

let keyEsc = 27
let keyLeft = 37
let keyUp = 38
let keyRight = 39
let keyDown = 40

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

function fullscreen() {
    let elem = document.body;
    if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.requestFullScreen) {
        elem.requestFullscreen();
    } else {
        console.debug('浏览器不支持全屏API或已被禁用')
    }
}

function siteJPMN5() {
    function removeShit() {
        $('img[src$=".gif"], .article-meta').remove()
        $('.logo, .title-h2l, .sidebar, #NavTop, .footer').remove()
        $('.content').css('margin-right', 'unset')
        $('.container').css('max-width', 'unset')
    }

    function indexPage() {
        var swiper
        var urlList = {}

        // swiper container
        $('body').prepend(`<div class="swiper mySwiper" style="display: none"><div class="swiper-wrapper"></div><div class="swiper-pagination"></div></div>`);

        swiper = new Swiper('.mySwiper', {
            direction: 'vertical',
            virtual: {
                cache: false, //关闭缓存
            },
            grabCursor: true,
            mousewheel: true,
            keyboard: {
                enabled: true,
                pageUpDown: true,
            },
            on: {
                keyPress: function (event, keyboard) {
                    switch (keyboard) {
                        case keyEsc:
                            $('.mySwiper').hide()
                            $('.container').show()
                            $('header.header').show()
                            $('.focusbox').show()
                            break;
                    }
                },
            },
            parallax: true,
            effect: 'fade',
        });

        //列出所有图片
        function listPicAll() {
            fullscreen()
            $('header.header').hide()
            $('.container').hide()
            $('.focusbox').hide()

            $('.related_posts >>> a').each((function (index, element) {
                if (index <= 8) {
                    return
                }

                // todo fast test
                if (index > 9) {
                    return
                }

                var url = window.location.origin + $(element).attr('href')
                // urlList.push(url)
                urlList[index] = {pageUrl: url, imgSrc: []}
                $.get(url, function (data) {
                    let page = $(data).find('.pagination').first();
                    let page_current = parseInt(page.find('.current').first().text());//判断是否是第一页
                    let page_url = '';
                    let page_url_str = '';
                    let page_num = '';
                    if (page_current === 1) {
                        page_url = page.children('ul').children('a')[0]['href'];
                        page_url_str = page_url.substr(0, page_url.length - 5);
                        page_num = page.children('ul').children('a').length / 2 - 1;
                    } else {
                        page_url = page.children('ul').children('a')[1]['href'];
                        page_url_str = page_url.substr(0, page_url.length - 5);
                        page_num = page.children('ul').children('a').length / 2 - 2;
                    }
                    //获取首页图片数据
                    let img_p = $(data).find('.article-content').children("p");
                    let img_p_num = img_p.children('img').length;
                    //获取首页图片
                    let tempHtml = [];
                    for (let i = 0; i < img_p_num; i++) {
                        let imgSrc = img_p.children('img')[i]['src']
                        urlList[index].imgSrc.push(imgSrc)
                        tempHtml.push(`<div class="swiper-slide"><img src="${imgSrc}" /></div>`)

                    }
                    swiper.virtual.appendSlide(tempHtml);  //插入Slide 数组
                    // console.log('urlList[index].imgSrc: ', urlList[index].imgSrc)
                    //获取其他标签页的图片
                    for (let i = 1; i <= page_num; i++) {
                        let page_urls = page_url_str + "_" + i + ".html";
                        getPaginationPicUrl(urlList[index].imgSrc, page_urls);
                    }
                });
            }))
            $('.mySwiper').show();
            setTimeout(scroll(0, 0), 300)
        }

        //获取指定页面的图片
        function getPaginationPicUrl(pic_all, page_url) {
            $.get(page_url, function (data) {
                let tempHtml = [];
                let res_img_num = $(data).find(".article-content").children("p").children('img').length;
                for (let i = 0; i < res_img_num; i++) {
                    let imgSrc = $(data).find(".article-content").children("p").children('img')[i]['src']
                    pic_all.push(imgSrc)
                    tempHtml.push(`<div class="swiper-slide"><img src="${imgSrc}" /></div>`)
                }
                swiper.virtual.appendSlide(tempHtml);  //插入Slide 数组
            });
            return pic_all;
        }

        $('.sitenav > ul').append(`<li class="menu-item"><a href="javascript:;" id="focus-image">专注看图</a></li>`)
        $(document).on('click', '#focus-image', function () {
            listPicAll();
        });
    }

    function searchPage() {
        function scrollNextTransitionStart() {
            if (page_current > page_total_num) {
                return
            }

            page_current++;

            let nextPageUrl = `${location.href}&p=${page_current}`
            $.get(nextPageUrl, function (dom) {
                showImg($(dom).find('.list > .node > p > a'))
            });
        }

        function showImg(dom) {
            $('.description, .info').hide()

            dom.each(function () {
                let href = $(this).attr('href')
                $.get(href, function (dom2) {
                    let tempHtmlImg = ''
                    let tempHtmlTitle = $(dom2).find('.article-title').text()
                    $(dom2).find('.article-content > p > img').each(function () {
                        let imgSrc = $(this).attr('src')
                        tempHtmlImg += `<img src="${imgSrc}" style="width: 100px;">`
                    });

                    $('.node').append(`<a href="${href}" target="_blank">${tempHtmlTitle}<br/>${tempHtmlImg}</a><hr>`)
                });
            });
        }

        //插入
        $('body').prepend(`<div class="swiper mySwiper hide"><div class="swiper-wrapper"></div></div>`);

        let page_total_num = $('.list .pagination a:not(:first)').length;
        let page_current = 0;

        $(document).scroll(function () {
            scrollNextTransitionStart()
        });

        $('.node').html('')
        scrollNextTransitionStart()
    }

    function listPage() {
        function slideNextTransitionStart() {
            if (!page_current || page_current >= page_total_num) {
                return
            }

            page_current++;
            let nextPageUrl = `${page_url}page_${page_current}.html`
            $.get(nextPageUrl, function (dom) {
                let tempHtml = [];
                $(dom).find('.related_posts img').each(function () {
                    let imgSrc = $(this).attr('src')
                    tempHtml.push(`<div class="swiper-slide"><img src="${imgSrc}" /></div>`)
                });
                if (tempHtml.length > 0) {
                    swiperList.appendSlide(tempHtml);
                }
            });
        }

        function scrollNextTransitionStart() {
            if (!page_current_too || page_current_too >= page_total_num) {
                return
            }

            page_current_too++;
            let nextPageUrl = `${page_url}page_${page_current_too}.html`
            $.get(nextPageUrl, function (dom) {
                $('.related_posts').append($(dom).find('.related_posts li'))
            });
        }


        function backToList() {
            $('#detailList').css('height', '0').css('width', '0').hide()
            $('#firstList').css('height', '100%').css('width', '100%').show()
        }

        function backToDetailList() {
            $('#detailList').show()
            $('.focusbox').show()
            $('#detailSingle').hide()
        }

        function intoDetail(url) {
            function getPaginationPicUrl(url) {
                $.get(url, function (data) {
                    let tempHtml = [];
                    let res_img_num = $(data).find(".article-content").children("p").children('img').length;
                    for (let i = 0; i < res_img_num; i++) {
                        let imgSrc = $(data).find(".article-content").children("p").children('img')[i]['src']
                        tempHtml.push(`<div class="swiper-slide"><img src="${imgSrc}" /></div>`)
                    }
                    if (tempHtml.length > 0) {
                        mySwiperDetailList.appendSlide(tempHtml);
                        mySwiperDetailSingle.virtual.appendSlide(tempHtml);
                    }
                });
            }

            mySwiperDetailList.removeAllSlides()
            mySwiperDetailSingle.virtual.removeAllSlides()

            // $.ajaxSettings.async = false;
            $.get(url, function (data) {
                let page = $(data).find('.pagination').first();
                let page_current = parseInt(page.find('.current').first().text());//判断是否是第一页
                let page_url = '';
                let page_url_str = '';
                let page_num = '';
                if (page_current === 1) {
                    page_url = page.children('ul').children('a')[0]['href'];
                    page_url_str = page_url.substr(0, page_url.length - 5);
                    page_num = page.children('ul').children('a').length - 1;
                } else {
                    page_url = page.children('ul').children('a')[1]['href'];
                    page_url_str = page_url.substr(0, page_url.length - 5);
                    page_num = page.children('ul').children('a').length - 2;
                }

                //获取首页图片数据
                let img_p = $(data).find('.article-content').children("p");
                let img_p_num = img_p.children('img').length;
                //获取首页图片
                let tempHtml = [];
                for (let i = 0; i < img_p_num; i++) {
                    let imgSrc = img_p.children('img')[i]['src']
                    tempHtml.push(`<div class="swiper-slide"><img src="${imgSrc}" /></div>`)
                }
                if (tempHtml.length > 0) {
                    mySwiperDetailList.appendSlide(tempHtml);
                    mySwiperDetailSingle.virtual.appendSlide(tempHtml);
                }

                $('#firstList').css('height', '0').css('width', '0').hide()
                $('#detailList').css('height', '100%').css('width', '100%').show()

                //获取其他标签页的图片
                for (let i = 1; i <= page_num; i++) {
                    let page_urls = page_url_str + "_" + i + ".html";
                    getPaginationPicUrl(page_urls);
                }
            });
            // $.ajaxSettings.async = true;
        }

        function intoDetailSingle(clickedIndex) {
            $('#detailList').hide()
            $('#detailSingle').show()

            if (clickedIndex !== undefined) {
                mySwiperDetailSingle.slideTo(mySwiperDetailList.clickedIndex)
            }
        }

        function run() {
            fullscreen()
            $('.focusbox').hide()
            setTimeout(function () {
                $('#detailList').hide()
                $('#detailSingle').hide()
            }, 300)

            $('body').html(`
<div id="firstList" class="swiper mySwiperList"><div class="swiper-wrapper"></div></div>
<div id="detailList" class="swiper mySwiperList myDetail hide" style="display: none !important;"><div class="swiper-wrapper"></div></div>
<div id="detailSingle" class="swiper mySwiperDetail myDetail" style="display: none !important;"><div class="swiper-wrapper"></div></div>
`);

            swiperList = new Swiper('#firstList', {
                slidesPerView: 4,
                slidesPerGroup: 12,
                grid: {
                    fill: 'column',
                    rows: 3,
                },
                spaceBetween: 0,
                grabCursor: true,
                mousewheel: true,
                keyboard: {
                    enabled: true,
                    pageUpDown: true,
                },
                on: {
                    slideNextTransitionStart: slideNextTransitionStart,
                    tap: function (swiper, event) {
                        intoDetail($(event.target).data('href'))
                    }
                },
            });
            if (tempHtml.length > 0) {
                swiperList.appendSlide(tempHtml);  //插入Slide 数组
                $('.mySwiperList').show();
            }

            for (let i = 0, len = 5; i < len; i++) {
                slideNextTransitionStart()
            }

            mySwiperDetailList = new Swiper('#detailList', {
                slidesPerView: 4,
                slidesPerGroup: 12,
                grid: {
                    fill: 'column',
                    rows: 3,
                },
                spaceBetween: 0,
                grabCursor: true,
                mousewheel: true,
                keyboard: {
                    enabled: true,
                    pageUpDown: true,
                },
                on: {
                    tap: function (swiper) {
                        intoDetailSingle(swiper.clickedIndex)
                    },
                    keyPress: function (event, keyboard) {
                        switch (keyboard) {
                            case keyEsc:
                                backToList()
                                break;
                        }
                    },
                    touchMoveOpposite(swiper, event) {
                        if (event.width === 50 && event.height === 50 && event.pressure === 0.5) {
                            backToList()
                        }
                    },
                },
            });

            mySwiperDetailSingle = new Swiper('#detailSingle', {
                slidesPerView: 1,
                virtual: {
                    cache: false, //关闭缓存
                },
                mousewheel: true,
                keyboard: {
                    enabled: true,
                    pageUpDown: true,
                },
                on: {
                    tap: function () {
                        backToDetailList()
                    },
                    keyPress: function (event, keyboard) {
                        switch (keyboard) {
                            case keyEsc:
                                backToDetailList()
                                break;
                        }
                    },
                    touchMoveOpposite(swiper, event) {
                        if (event.width === 50 && event.height === 50 && event.pressure === 0.5) {
                            backToDetailList()
                        }
                    },
                },
                parallax: true,
                effect: 'fade',
            });
        }

        let swiperList;
        let mySwiperDetailList;
        let mySwiperDetailSingle;
        let page_total_num = 0;
        if ($('.pagination strong').length > 0) {
            page_total_num = Math.ceil(parseInt($('.pagination strong').text()) / 20);
        }
        let page_currentDom = $('.current');
        let page_current = parseInt(page_currentDom.first().text());
        let page_current_too = page_current;
        let page_url = page_currentDom.attr('href');

        let tempHtml = [];
        $('.related_posts img').each(function () {
            let imgSrc = $(this).attr('src')
            let href = $(this).parent().attr('href')
            tempHtml.push(`<div class="swiper-slide"><img src="${imgSrc}" data-href="${href}" /></div>`)
        });


        $('.sitenav > ul').append(`<li class="menu-item"><a href="javascript:;" id="focus-image">专注看图</a></li>`)
        $(document).on('click', '#focus-image', function () {
            run();
        });

        let startX, startY;

        // 获得角度
        function getAngle(x, y) {
            return Math.atan2(y, x) * 180 / Math.PI;
        }

        // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        function getDirection(startx, starty, endx, endy) {
            var angx = endx - startx;
            var angy = endy - starty;
            var result = 0;

            // 如果滑动距离太短
            if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                return result;
            }

            var angle = getAngle(angx, angy);
            if (angle >= -135 && angle <= -45) {
                result = 1;
            } else if (angle > 45 && angle < 135) {
                result = 2;
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            } else if (angle >= -45 && angle <= 45) {
                result = 4;
            }

            return result;
        }

        // 手指接触屏幕
        document.addEventListener("touchstart", function (e) {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        }, false);
        // 手指离开屏幕
        document.addEventListener("touchend", function (e) {
            var endX, endY;
            endX = e.changedTouches[0].pageX;
            endY = e.changedTouches[0].pageY;
            var direction = getDirection(startX, startY, endX, endY);
            switch (direction) {
                case 1:
                    // console.log("向上！")
                    scrollNextTransitionStart()
                    break;
                case 4:
                    // console.log("向右！")
                    scrollNextTransitionStart()
                    break;
                default:
            }
        }, false);

        $(document).scroll(function () {
            scrollNextTransitionStart()
        });
    }

    function detailPage() {
        function intoDetailSingle(imgUrl) {
            fullscreen()
            $('header.header').hide()
            $('.container').hide()

            setTimeout(function () {
                $('.mySwiper').show();
                if (imgUrl) {
                    $(swiper.virtual.slides).each(function (index, element) {
                        if ($(element).find('img').attr('src') !== imgUrl) {
                            return
                        }

                        swiper.slideTo(index)
                    });
                }
            }, 500);
        }

        function getNextUrl(url) {
            if (!url) {
                return
            }

            $.get(url, function (data) {
                let tagImg = '.article-content img'
                let tempHtml = [];
                $(data).find(tagImg).each(function () {
                    let imgSrc = $(this).attr('src')
                    tempHtml.push(`<div class="swiper-slide"><img src="${imgSrc}" /></div>`)
                    imgThumbnailContainer.append(`<img src="${imgSrc}" style="width: 100px;" class="focus-image">`)
                });
                swiper.virtual.appendSlide(tempHtml);  //插入Slide 数组

                let nextUrl = $(data).find('.pagination a:contains(下一页)').first().attr('href')
                if (nextUrl) {
                    getNextUrl(nextUrl)
                }
            });
        }

        var swiper
        var imgThumbnailContainer = $('.article-header').first()

        // swiper container
        $('body').prepend(`<div class="swiper mySwiper" style="display: none"><div class="swiper-wrapper"></div><div class="swiper-pagination"></div></div>`);

        swiper = new Swiper('.mySwiper', {
            direction: 'vertical',
            virtual: {
                cache: false, //关闭缓存
            },
            grabCursor: true,
            mousewheel: true,
            keyboard: {
                enabled: true,
                pageUpDown: true,
            },
            on: {
                keyPress: function (event, keyboard) {
                    switch (keyboard) {
                        case keyEsc:
                            $('.mySwiper').hide()
                            $('.container').show()
                            $('header.header').show()
                            break;
                    }
                },
            },
            parallax: true,
            effect: 'fade',
        });

        getNextUrl(location.href);

        $(document).on('click', '.focus-image', function () {
            intoDetailSingle($(this).attr('src'));
        });
    }

    removeShit()

    if (location.pathname === '/') {
        indexPage()
    } else if (location.pathname === '/plus/search/index.asp') {
        searchPage()
    } else if ($('.article-header').length === 1) {
        detailPage()
    } else if ($('.related_img').length > 0) {
        listPage()
    }
}

function siteMrcong() {
    function removeShit() {
        $('img[src$=".gif"]').remove()
        $('#theme-header, .post-title, .post-meta, #topcontrol').remove()
        $('#main-content, #wrapper').css('width', '100%')
    }

    function detailPage() {
        function intoDetailSingle(imgUrl) {
            fullscreen()

            $('body').children().each(function (index, element) {
                if (!$(element).hasClass('swiper')) {
                    $(element).hide()
                }
            });

            setTimeout(function () {
                $('.mySwiper').show();
                if (imgUrl) {
                    $(swiper.virtual.slides).each(function (index, element) {
                        if ($(element).find('img').attr('src') !== imgUrl) {
                            return
                        }

                        swiper.slideTo(index)
                    });
                }
            }, 500);
        }

        function getNextUrl(url) {
            if (!url) {
                return
            }

            $.get(url, function (data) {
                let tagImg = 'img.aligncenter'
                let tempHtml = [];
                $(data).find(tagImg).each(function () {
                    let imgSrc = $(this).attr('src')
                    tempHtml.push(`<div class="swiper-slide"><img src="${imgSrc}" /></div>`)
                    imgThumbnailContainer.append(`<img src="${imgSrc}" style="width: 100px;" class="focus-image">`)
                });
                swiper.virtual.appendSlide(tempHtml);  //插入Slide 数组

                let currentPageNumber = parseInt(jQuery('.post-page-numbers.current').first().text())
                if (currentPageNumber < 1) {
                    return
                }

                let nextUrl = $(data).find('.post-page-numbers.current').first().next().attr('href')
                if (nextUrl) {
                    getNextUrl(nextUrl)
                }
            });
        }

        var imgThumbnailContainer = $('.share-post').first()
        var swiper

        // swiper container
        $('body').prepend(`<div class="swiper mySwiper" style="display: none"><div class="swiper-wrapper"></div><div class="swiper-pagination"></div></div>`);

        swiper = new Swiper('.mySwiper', {
            direction: 'vertical',
            virtual: {
                cache: false, //关闭缓存
            },
            grabCursor: true,
            mousewheel: true,
            keyboard: {
                enabled: true,
                pageUpDown: true,
            },
            on: {
                keyPress: function (event, keyboard) {
                    switch (keyboard) {
                        case keyEsc:
                            $('.mySwiper').hide()

                            $('body').children().each(function (index, element) {
                                if (!$(element).hasClass('swiper')) {
                                    $(element).show()
                                }
                            });

                            break;
                    }
                },
            },
            parallax: true,
            effect: 'fade',
        });

        imgThumbnailContainer.html('')
        getNextUrl(location.href);

        $(document).on('click', '.focus-image', function () {
            intoDetailSingle($(this).attr('src'));
        });
    }

    if ($('#disqus_thread').length === 1) {
        detailPage()
        removeShit()
    }
}

async function siteYoutube() {
    await sleep(5000);

    async function doPublish(e) {
        console.log('click: open dialog')
        e.click()
        await sleep(3000);

        console.log('click: 视频元素')
        $('#next-button').click()
        await sleep(3000);

        console.log('click: 检查1')
        $('#next-button').click()
        await sleep(3000);

        console.log('click: 检查2')
        $('#next-button').click()
        await sleep(3000);

        console.log('click: 公开范围')
        $('#done-button').click()
        await sleep(10000);

        console.log('click: close dialog')
        $('div.ytcp-button:contains(关闭)').click()
        await sleep(1000);
    }

    let editButtons = []
    $('div.ytcp-button:contains(编辑草稿)').each(function () {
        editButtons.push($(this))
    });

    if (editButtons.length === 0) {
        return
    }

    $('#tabsContent').append(`<button type="button" class="l-batch-publish">发布全部草稿</button>`)
    $(document).on('click', '.l-batch-publish', async function () {
        console.log('start')
        for (var i = 0, len = editButtons.length; i < len; i++) {
            console.log('i: ', i)
            await doPublish($('div.ytcp-button:contains(编辑草稿)').last())
        }
        console.log('end')
    });
}

function main() {
    var link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://unpkg.com/swiper@8/swiper-bundle.min.css';
    document.getElementsByTagName("HEAD")[0].appendChild(link);

    var css = 'html,body{position:relative;height:100%;}body{background:#eee;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:14px;color:#000;margin:0;padding:0;}.swiper{height:100%;}.swiper-slide{text-align:center;font-size:18px;background:black;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;}.swiper-slide img{display:block;height:100%;object-fit:cover;}' +
        '        .mySwiperList .swiper-slide {\n' +
        '            text-align: center;\n' +
        '            font-size: 18px;\n' +
        '            background: #fff;\n' +
        '            height: calc((100%) / 3);\n' +
        '\n' +
        '            /* Center slide text vertically */\n' +
        '            display: -webkit-box;\n' +
        '            display: -ms-flexbox;\n' +
        '            display: -webkit-flex;\n' +
        '            display: flex;\n' +
        '            -webkit-box-pack: center;\n' +
        '            -ms-flex-pack: center;\n' +
        '            -webkit-justify-content: center;\n' +
        '            justify-content: center;\n' +
        '            -webkit-box-align: center;\n' +
        '            -ms-flex-align: center;\n' +
        '            -webkit-align-items: center;\n' +
        '            align-items: center;\n' +
        '        }\n' +
        '\n' +
        '\n' +
        '        .mySwiperList .swiper-slide img {\n' +
        '            display: block;\n' +
        '            height: 100%;\n' +
        '            object-fit: cover;\n' +
        '        }\n';

    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    var heads = document.getElementsByTagName("head");
    heads[0].appendChild(node);


    // 主程序入口，获取url判断网站类型
    let url = window.location.host;
    if (url.indexOf('xgmn01.com') >= 0) {
        siteJPMN5();
    } else if (url.indexOf('mrcong.com') >= 0 || url.indexOf('misskon.com') >= 0) {
        siteMrcong();
    } else if (window.location.host === 'studio.youtube.com') {
        siteYoutube();
    }
}

main()
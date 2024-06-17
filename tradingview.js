// ==UserScript==
// @name         tradingview
// @version      1.0.0
// @description
// @author       lennon
// @license      MIT
// @match        https://www.tradingview.com/chart/*
// @match        https://cn.tradingview.com/chart/*
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://unpkg.com/swiper@8/swiper-bundle.min.js
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==
'use strict';

//补0操作
function setZeroFill(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

/**
 * 当前日期时间
 * @returns {string}
 */
function now() {
    let oDate = new Date(),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes();
    return oYear + setZeroFill(oMonth) + setZeroFill(oDay) + setZeroFill(oHour) + setZeroFill(oMin);
}

function tableToCSV($table) {
    // Initialize CSV content
    var csv = [];

    // head start
    var row = [];
    $table.find('.ka-thead th').each(function () {
        var $col = $(this);
        // Clean innertext to remove multiple spaces and newline characters
        var data = $col.text().replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s+)/gm, ' ').trim();
        // Escape double quotes
        data = data.replace(/"/g, '""');
        // Push data to row array
        row.push(data);
    });
    // Join row array and push it to csv array
    csv.push(row);
    // head end

    // body start
    var $rows = $table.find("tr");

    // Loop through each row of the table
    $rows.each(function (index) {
        if (index === 0) {
            return;
        }

        var $row = $(this), $cols = $row.find("td");
        var row = [];
        var row2 = [];

        // Loop through each cell in the row
        $cols.each(function (index) {
            var $col = $(this);

            if ($.inArray(index, [1, 2, 3, 4]) >= 0) {
                // Clean innertext to remove multiple spaces and newline characters
                // var data = $col.fir.text().replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s+)/gm, ' ').trim();
                // // Escape double quotes
                // data = data.replace(/"/g, '""');
                // Push data to row array
                row.push($col.find('.valueCell-GcyAnig1').first().text());
                row2.push($col.find('.valueCell-GcyAnig1').last().text());
            } else if ($.inArray(index, [6, 7, 8, 9]) >= 0) {
                if ($col.find('div').length > 2) {
                    row.push($col.find('.negativeValue-GcyAnig1').first().text());
                } else {
                    // Clean innertext to remove multiple spaces and newline characters
                    var data = $col.text().replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s+)/gm, ' ').trim();
                    // Escape double quotes
                    data = data.replace(/"/g, '""');
                    // Push data to row array
                    row.push(data);
                }

                row2.push('');
            } else {
                // Clean innertext to remove multiple spaces and newline characters
                var data = $col.text().replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s+)/gm, ' ').trim();
                // Escape double quotes
                data = data.replace(/"/g, '""');
                // Push data to row array
                row.push(data);
                row2.push('');
            }
        });

        if (row.length === 1) {
            return
        }

        // Join row array and push it to csv array
        csv.push(row);
        if (row2.length > 1) {
            csv.push(row2);
        }
    });
    // body end

    return csv
}

function Tools_saveStringAsFile(obj) {
    const blob = new Blob([obj.content], {type: obj.type});
    const objectURL = URL.createObjectURL(blob);

    // 创建一个 a 元素
    const anchor = document.createElement("a");
    anchor.href = objectURL;
    anchor.download = obj.filename; // 文件名称

    anchor.click(); // 模拟点击 a 元素，触发下载

    URL.revokeObjectURL(objectURL);
}

function siteTradingView() {
    function strategyExport() {
        $('.fixedContent-zf0MHBzY').append(`<button id="diyExport">DIY Export</button>`)

        function diyExport() {
            let tableElement = $('.ka-table')
            if (!tableElement || tableElement.length === 0) {
                return
            }

            const array = tableToCSV(tableElement);
            // const array = [
            //     ['B1', '3.3000', '45.0000', '120', 'B', 'BUZZER-HNB09A05', '\r\n'],
            //     ['LEDM1', '44.3000', '74.0000', '0', 'T', 'LEDM-JMM-757BW3-P12D5-S', '\r\n'],
            //     ['LEDM2', '30.3000', '74.0000', '0', 'T', 'LEDM-JMM-757BW3-P12D5-S', '\r\n'],
            //     ['U9', '42.6000', '89.7000', '180', 'T', 'SOT23-3', '\r\n'],
            // ];

            console.log(array);

            let content = "";
            for (let i = 0; i < array.length; i++) {
                content += array[i].toString() + '\r\n';
            }

            Tools_saveStringAsFile({
                filename: now() + ".csv",
                type: "text/csv;charset=utf-8",
                content: content
            });
        }

        $(document).on('click', '#diyExport', function () {
            $('#id_report-tabs_tablist button:nth-child(3)').click()
            setTimeout(function () {
                diyExport();
            }, 1000)
        });
    }

    strategyExport()
}

function main() {
    siteTradingView();
}

setTimeout(function () {
    main()
}, 5000)

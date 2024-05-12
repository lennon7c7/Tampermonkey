// ==UserScript==
// @name         bet365
// @version      1.0
// @description
// @author       Lennon
// @match        https://extra.365-023.com/ResultsApi/GetResults?fixtureId=154928801&fromDate=2024-05-10&toDate=2024-05-10&competitionId=0&challengeId=0&marketOverride=&isVirtual=false&ct=42&lng=10&st=108&tz=GMTPlus8&ot=Decimals&sportName=sport&sportId=1&
// @require      https://code.jquery.com/jquery-2.1.1.min.js
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

//补0操作
function setZeroFill(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}

function timestamp2Date(timestamp) {
    if (!timestamp) {
        return '';
    }

    let oDate = new Date(timestamp * 1000),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate();//最后拼接时间
    return oYear + '-' + setZeroFill(oMonth) + '-' + setZeroFill(oDay);
}

async function curlGet(reqUrl) {
    return await fetch(reqUrl)
        .then((response) => response.json())
        .then((result) => {
            return result
        })
        .catch((error) => console.error(error));
}

async function apiSqlRaw(sql) {
    let reqUrl = 'http://127.0.0.1:31050/i-am-not-sql-raw'
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "sql": sql
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    return await fetch(reqUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (!result || !result.data || result.data.length === 0) {
                return []
            }

            return result.data
        })
        .catch((error) => console.error(error));
}

async function apiSqlExec(sql) {
    console.debug(sql)
    let reqUrl = 'http://127.0.0.1:31050/i-am-not-sql-exec'
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "sql": sql
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    return await fetch(reqUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            return result.data
        })
        .catch((error) => console.error(error));
}

async function doUpdateScore() {
    let resp
    let sqlRaw = "SELECT * FROM bet365_info WHERE gametimestamp < unix_timestamp() - 24*60*60 AND score = '' ORDER BY gametimestamp"
    resp = await apiSqlRaw(sqlRaw)
    for (let i = 0; i < resp.length; i++) {
        await sleep(1000);
        let reqUrl = location.href
        let resp2 = ''
        let replaceValue = 'fixtureId=' + resp[i].id + '&fromDate=' + timestamp2Date(resp[i].gametimestamp) + '&toDate=' + timestamp2Date(resp[i].gametimestamp)
        reqUrl = reqUrl.replaceAll('fixtureId=154928801&fromDate=2024-05-10&toDate=2024-05-10', replaceValue)
        console.debug(reqUrl)
        resp2 = await curlGet(reqUrl)
        console.debug(resp2)
        if (!resp2 || !resp2.scores || !resp2.scores.rows || resp2.scores.rows.length !== 2) {
            console.error('empty data', replaceValue)
            continue
        }

        let homeHalfScore = resp2.scores.rows[0].split('@')[0].replaceAll('|', '').split(';')[0]
        if (homeHalfScore === '-') {
            console.error('empty home score', replaceValue, resp2.scores.rows[0])
            continue
        }
        let guestHalfScore = resp2.scores.rows[1].split('@')[0].replaceAll('|', '').split(';')[0]
        if (guestHalfScore === '-') {
            console.error('empty guest score', replaceValue, resp2.scores.rows[1])
            continue
        }

        let homeScore = resp2.scores.rows[0].split('@')[0].replaceAll('|', '').split(';')[1]
        if (homeScore === '-') {
            console.error('empty home score', replaceValue, resp2.scores.rows[0])
            continue
        }
        let guestScore = resp2.scores.rows[1].split('@')[0].replaceAll('|', '').split(';')[1]
        if (guestScore === '-') {
            console.error('empty guest score', replaceValue, resp2.scores.rows[1])
            continue
        }

        console.debug(resp2.scores.rows)
        let sqlExec = `UPDATE bet365_info
                       SET score  = '${homeScore}-${guestScore}',
                           Hscore = '${homeHalfScore}-${guestHalfScore}'
                       WHERE id = ${resp[i].id}`
        apiSqlExec(sqlExec);
    }
}

async function main() {
    console.debug('---------- start ----------');

    if (location.pathname === '/ResultsApi/GetResults') {
        await doUpdateScore();
    }

    console.debug('---------- end ----------');
}

main()
// ==UserScript==
// @name        Youtube Playback Rate
// @namespace   Violentmonkey Scripts
// @match       *://youtube.com/*
// @match       *://www.youtube.com/*
// @grant       Any
// @version     1.0
// @author      Jason Miller
// @description 12/1/2019, 8:00:00 AM
// @run-at      document-start
// ==/UserScript==

sessionStorage.setItem("yt-player-playback-rate", JSON.stringify({
    "data": "2",
    "creation": Date.now(),
}));
// ==UserScript==
// @name        New script - violentmonkey.github.io
// @namespace   Violentmonkey Scripts
// @match       https://www.tiktok.com/search
// @grant       none
// @version     1.0
// @author      -
// @description 8/25/2022, 9:29:24 PM
// ==/UserScript==

function handleUrlChange(url) {
  alert(`URL changed to ${location.href}`);
}

let previousUrl = "";
const observer = new MutationObserver(function (mutations) {
  if (location.href !== previousUrl) {
    previousUrl = location.href;
    handleUrlChange(location.href);
  }
});
const config = { subtree: true, childList: true };
observer.observe(document, config);

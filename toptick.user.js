// ==UserScript==
// @name        TopTick - TikTok Play Count Viewer
// @namespace   Violentmonkey Scripts
// @match       https://www.tiktok.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 8/25/2022, 9:29:24 PM
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

let previousUrl = "";

let previousCardCount = 0;

const observer = new MutationObserver(function (mutations) {
  const browserShareElement = document.querySelector(
    '[data-e2e="browse-share-group"]'
  );
  if (browserShareElement) {
    if (location.href !== previousUrl) {
      previousUrl = location.href;
      const url = window.location.href.split("?")[0];
      const plays = window.localStorage.getItem(url);
      if (plays) {
        let playCountElement = document.querySelector("#playCount");
        if (!playCountElement) {
          playCountElement = document.createElement("b");
        }
        playCountElement.innerText = `${plays} plays`;
        playCountElement.id = "playCount";
        browserShareElement.parentElement.insertBefore(
          playCountElement,
          browserShareElement
        );
      }
    }
  }

  const cardElements = document.querySelectorAll(
    '[data-e2e="search_top-item"]'
  );

  if (cardElements.length !== previousCardCount) {
    previousCardCount = cardElements.length;
    for (const cardElement of cardElements) {
      const url = cardElement.querySelector("div div a").href;

      const playCountElement = cardElement.nextElementSibling.querySelector(
        '[data-e2e="search-card-like-container"]'
      );
      const plays = playCountElement.querySelector("strong").innerText;
      console.log(url, plays);
      window.localStorage.setItem(url, plays);
      // GM.setValue(url, plays)
    }
  }
});
const config = { subtree: true, childList: true };
observer.observe(document, config);

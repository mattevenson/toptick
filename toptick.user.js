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

function handleUrlChange() {
  alert(`URL changed to ${location.href}`);
}

const likeIconHTML = `<svg class="like-icon tiktok-b82ygf-StyledPlay etrd4pu9" width="16" height="16" viewBox="0 0 48 48" fill="rgba(22, 24, 35, 0.75)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 10.554V37.4459L38.1463 24L16 10.554ZM12 8.77702C12 6.43812 14.5577 4.99881 16.5569 6.21266L41.6301 21.4356C43.5542 22.6038 43.5542 25.3962 41.6301 26.5644L16.5569 41.7873C14.5577 43.0012 12 41.5619 12 39.223V8.77702Z"></path></svg>`;

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

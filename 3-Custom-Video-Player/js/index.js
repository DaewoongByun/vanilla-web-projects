"use-strict";

const $ = (query) => document.querySelector(query);

const store = {};

function App() {
  init();
  $("video").addEventListener("ended", pauseVideo);
  $(".play-btn").addEventListener("click", playVideo);
  $(".pause-btn").addEventListener("click", pauseVideo);
  $(".stop-btn").addEventListener("click", stopVideo);
}
function init() {
  $(".pause-btn").style.display = "none";
}

function playVideo() {
  $("video").play();
  $(".play-btn").style.display = "none";
  $(".pause-btn").style.display = "";
}
function pauseVideo() {
  $("video").pause();
  $(".play-btn").style.display = "";
  $(".pause-btn").style.display = "none";
}
function stopVideo() {
  pauseVideo();
  $("video").currentTime = 0;
}

App();

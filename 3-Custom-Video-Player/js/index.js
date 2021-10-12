"use-strict";

const $ = (query) => document.querySelector(query);

const store = {};

function App() {
  init();
  $("video").addEventListener("ended", pauseVideo);
  $("video").addEventListener("timeupdate", changeTime);
  $(".play-btn").addEventListener("click", playVideo);
  $(".pause-btn").addEventListener("click", pauseVideo);
  $(".stop-btn").addEventListener("click", stopVideo);
  $(".bar-background").addEventListener("mousedown", handleBarClick);
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
function changeTime(e, clickedTime = -1) {
  const video = $("video");
  const duration = video.duration;
  const curTime = clickedTime === -1 ? video.currentTime : clickedTime;
  let percent = (curTime / duration) * 100;
  percent = percent.toFixed(3);
  $(".bar").style.width = `${percent}%`;
  if (clickedTime !== -1) {
    video.currentTime = clickedTime;
  }
}

function handleBarClick(e) {
  const width = e.currentTarget.offsetWidth;
  const clickedX = e.offsetX;
  const clickedTime = (clickedX / width) * $("video").duration;
  changeTime(e, clickedTime);
}

App();

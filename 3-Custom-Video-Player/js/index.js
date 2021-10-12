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
  setTime(0);
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
    video.currentTime = curTime;
  }
  setTime(curTime);
}

function setTime(curTime) {
  function toLength2(str) {
    if (str.length < 2) {
      return "0" + str;
    }
    return str;
  }
  const video = $("video");
  const duration = video.duration;
  let durationHour = toLength2(`${parseInt(duration / 60)}`);
  let durationMinute = toLength2(`${parseInt(duration % 60)}`);
  let curHour = toLength2(`${parseInt(curTime / 60)}`);
  let curMinute = toLength2(`${parseInt(curTime % 60)}`);

  const timeString = `${curHour}:${curMinute} / ${durationHour}:${durationMinute}`;
  $(".time").innerText = timeString;
}

function handleBarClick(e) {
  const width = e.currentTarget.offsetWidth;
  const clickedX = e.offsetX;
  const clickedTime = (clickedX / width) * $("video").duration;
  changeTime(e, clickedTime);
}

App();

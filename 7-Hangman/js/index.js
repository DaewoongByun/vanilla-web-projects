"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  words: [
    "javascript",
    "hangman",
    "google",
    "programming",
    "computer",
    "develop",
    "console",
    "frontend",
  ],
  word: "",
  wrongs: [],
  corrects: [],
  life: 6,
  numberWordAlphabet: 0,

  reset: function () {
    // 0 ~ words.length - 1
    const index = parseInt(Math.random() * this.words.length);
    this.word = this.words[index];
    this.wrongs = [];
    this.corrects = [];
    this.life = 6;
    this.setNumberWordAlphabet();

    this.render();
  },

  setNumberWordAlphabet: function () {
    const set = new Set();
    this.word.split("").forEach((al) => {
      set.add(al);
    });
    this.numberWordAlphabet = set.size;
  },

  handleKeyPress: function (key) {
    if (this.wrongs.includes(key) || this.corrects.includes(key)) {
      alert("이미 입력한 알파벳입니다.");
      return;
    }
    let status = 0;
    if (this.word.includes(key)) {
      this.corrects.push(key);
      if (this.corrects.length === this.numberWordAlphabet) {
        status = 1;
      }
    } else {
      this.wrongs.push(key);
      this.life--;
      if (this.life === 0) {
        status = -1;
      }
    }
    this.render();
    if (status === 1) {
      setTimeout(() => {
        alert("정답!");
        this.reset();
      }, 100);
    } else if (status === -1) {
      setTimeout(() => {
        alert("실패!");
        this.reset();
      }, 100);
    }
  },

  render: function () {
    let spaces = "";
    for (let i = 0; i < this.word.length; i++) {
      const alphabet = this.word[i];
      const hide = this.corrects.includes(alphabet) ? "" : "hide";
      const space = `<div class="space">
        <div class="alphabet ${hide}">${alphabet}</div>
        <div class="underline"></div>
      </div>`;
      spaces += space;
    }
    $(".word").innerHTML = spaces;
    $(".wrong-words").innerText = this.wrongs.join(", ");
    $(".life-count").innerText = `${this.life}개`;
    for (let i = 1; i <= 6; i++) {
      if (i <= 6 - this.life) {
        $(`.hang-${i}`).classList.remove("hide");
      } else {
        $(`.hang-${i}`).classList.add("hide");
      }
    }
  },
};

function App() {
  store.reset();
  window.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();
    if (key.length === 1 && key >= "a" && key <= "z") {
      store.handleKeyPress(key);
    }
  });
}

App();

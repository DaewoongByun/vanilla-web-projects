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

  reset: function () {
    // 0 ~ words.length - 1
    const index = parseInt(Math.random() * this.words.length);
    this.word = this.words[index];
    this.wrongs = [];
    this.corrects = [];

    this.render();
  },

  handleKeyPress: function (key) {
    if (this.wrongs.includes(key) || this.corrects.includes(key)) {
      alert("이미 입력한 알파벳입니다.");
      return;
    }
    if (this.word.includes(key)) {
      this.corrects.push(key);
    } else {
      this.wrongs.push(key);
    }
    this.render();
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

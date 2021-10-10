"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  movies: [
    { name: "인터스텔라", price: 8, isSelected: false },
    { name: "매트릭스3", price: 10, isSelected: false },
    { name: "악인전", price: 14, isSelected: true },
    { name: "범죄도시", price: 6, isSelected: false },
  ],
  seats: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 2],
  ],
  totalPrice: 0,
  selectCount: 0,

  renderSelect: function () {
    const $options = this.movies
      .map(
        (movie, i) =>
          `<option value=${i} ${movie.isSelected ? "selected" : ""}>${
            movie.name
          } ($${movie.price})</option>`
      )
      .join("");
    $("#movie-select").innerHTML = $options;
  },
  renderSeat: function () {
    $(".seat").innerHTML = "";
    for (let r = 0; r < this.seats.length; r++) {
      const $row = document.createElement("div");
      $row.classList.add("row");
      for (let c = 0; c < this.seats[0].length; c++) {
        const $icon = document.createElement("div");
        $icon.classList.add("icon");
        $icon.classList.add(`r-${r}`);
        $icon.classList.add(`c-${c}`);
        if (this.seats[r][c] === 0) {
          $icon.classList.add(`na`);
        } else if (this.seats[r][c] === 1) {
          $icon.classList.add(`selected`);
        } else if (this.seats[r][c] === 2) {
          $icon.classList.add(`occupied`);
        }
        $row.appendChild($icon);
      }
      $(".seat").appendChild($row);
    }
  },
  renderTotalPrice: function () {
    $(
      ".total-price"
    ).innerHTML = `You have selected <span>${this.selectCount}</span> seats for a price of $<span>${this.totalPrice}</span>`;
  },
  save: function () {
    const data = {
      movies: this.movies,
      seats: this.seats,
      totalPrice: this.totalPrice,
      selectCount: this.selectCount,
    };
    localStorage.setItem("store", JSON.stringify(data));
  },
  load: function () {
    const data = JSON.parse(localStorage.getItem("store"));
    if (data) {
      this.movies = data.movies;
      this.seats = data.seats;
      this.totalPrice = data.totalPrice;
      this.selectCount = data.selectCount;
    }
  },
  changeMovie: function (index) {
    this.movies = this.movies.map((movie, i) => {
      return i === index
        ? { ...movie, isSelected: true }
        : { ...movie, isSelected: false };
    });
    this.getTotalPrice();
  },
  getTotalPrice: function () {
    let total = 0;
    let totalPrice = 0;
    let price = this.movies.find((movie) => movie.isSelected).price;
    for (let i = 0; i < this.seats.length; i++) {
      for (let j = 0; j < this.seats[0].length; j++) {
        if (this.seats[i][j] === 1) {
          total++;
        }
      }
    }
    totalPrice = total * price;
    this.selectCount = total;
    this.totalPrice = totalPrice;
    this.renderTotalPrice();
    this.save();
  },
  clickSeat: function (r, c) {
    this.seats[r][c] = 1 - this.seats[r][c];
    this.renderSeat();
    this.getTotalPrice();
    this.save();
  },
};

function App() {
  store.load();
  store.renderSelect();
  store.renderSeat();
  store.renderTotalPrice();

  $("select").addEventListener("change", function (e) {
    store.changeMovie(parseInt(e.target.value));
  });
  $(".seat").addEventListener("click", function (e) {
    if (!e.target.classList.contains("icon")) return;
    if (e.target.classList.contains("occupied")) return;
    let r = -1;
    let c = -1;
    e.target.classList.forEach((item) => {
      if (item.startsWith("r")) {
        r = parseInt(item.split("-")[1]);
      } else if (item.startsWith("c")) {
        c = parseInt(item.split("-")[1]);
      }
    });
    store.clickSeat(r, c);
  });
}

App();

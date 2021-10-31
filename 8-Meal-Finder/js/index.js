"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  foods: [],

  search: function (keyword) {
    if (!keyword.split(" ").join("")) {
      alert("검색어를 입력하세요!");
      return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert("서버에러");
        }
      })
      .then((data) => {
        console.log(data);
        if (data.meals) {
          this.foods = data.meals;
          $(".search-info").innerText = `'${keyword}' 검색 결과`;
        } else {
          this.foods = [];
          $(
            ".search-info"
          ).innerText = `'${keyword}'에 대한 검색 결과가 없습니다`;
        }
        this.render();
      });
  },
  render: function () {
    const cards = this.foods
      .map(
        (food) => `<div class="card">
    <img src='${food.strMealThumb}' />
    <div class='card-hover'  data-meal-id='${food.idMeal}'>${food.strMeal}</div>
    </div>`
      )
      .join("");
    $(".search-result").innerHTML = cards;
  },
};

function App() {
  store.render();
  $(".search > input").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      store.search(e.target.value);
    }
  });
  $(".icon-search").addEventListener("click", () => {
    const keyword = $(".search > input").value;
    store.search(keyword);
  });
  $(".search-result").addEventListener("mouseover", (e) => {
    if (e.target.className === "card-hover") {
      e.target.style.opacity = 1;
    }
  });
  $(".search-result").addEventListener("mouseout", (e) => {
    if (e.target.className === "card-hover") {
      e.target.style.opacity = 0;
    }
  });
}

App();

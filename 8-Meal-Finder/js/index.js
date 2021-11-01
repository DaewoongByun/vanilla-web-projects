"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  foods: [],
  selectedFood: {},

  search: function (keyword) {
    if (!keyword.split(" ").join("")) {
      alert("검색어를 입력하세요!");
      return;
    }
    this.selectedFood = {};
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
  randomSearch: function () {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert("서버에러");
        }
      })
      .then((data) => {
        console.log(data);
        this.selectedFood = data.meals[0];
        this.foods = [];
        $(".search-info").innerText = ``;
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

    if (this.selectedFood.idMeal) {
      $(".selected-food").style.display = "flex";
      $(".selected-food > h1").innerText = this.selectedFood.strMeal;
      const img = `<img src=${this.selectedFood.strMealThumb} />`;
      $(".selected-food > .image-container").innerHTML = img;
      $(".selected-food .category").innerText = this.selectedFood.strCategory;
      $(".selected-food .area").innerText = this.selectedFood.strArea;
      $(".selected-food > .instructions").innerText =
        this.selectedFood.strInstructions;

      let tags = "";
      for (let i = 1; i <= 20; i++) {
        if (!this.selectedFood[`strIngredient${i}`]) break;
        const ingredient = this.selectedFood[`strIngredient${i}`];
        const measure = this.selectedFood[`strMeasure${i}`];
        tags += `<div class='ingredient'>${ingredient} - ${measure}</div>`;
      }
      $(".selected-food > .ingredients").innerHTML = tags;
    } else {
      $(".selected-food").style.display = "none";
    }
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
  $(".icon-random").addEventListener("click", () => {
    store.randomSearch();
  });
}

App();

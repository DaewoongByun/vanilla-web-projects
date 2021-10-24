"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  id: 1,
  personList: [],
  filter: 0,

  addUser: function () {
    let wealth = Math.random() * 900000000 + 100000000;
    wealth = parseInt(wealth / 1000000) * 1000000;
    this.personList.push({
      name: `아무개${this.id++}`,
      wealth: wealth,
    });
    this.render();
  },

  twice: function () {
    this.personList.forEach((person) => {
      person.wealth = person.wealth * 2;
    });
    this.render();
  },

  sort: function () {
    this.personList.sort((p1, p2) => p2.wealth - p1.wealth);
    this.render();
  },

  setFilter: function (filter) {
    this.filter = filter;
    this.render();
  },

  render: function () {
    const renderPeople = this.personList.filter(
      (person) => person.wealth >= this.filter
    );
    const totalWealth = renderPeople.reduce(
      (sum, person) => sum + person.wealth,
      0
    );
    const items = renderPeople
      .map(
        (person) =>
          `<div class="item">
      <span>${person.name}</span>
      <span>${person.wealth.toLocaleString()}원</span>
    </div>`
      )
      .join("");
    $(".people").innerHTML = items;
    $(
      ".total > span:last-child"
    ).innerText = `${totalWealth.toLocaleString()}원`;
  },
};

function App() {
  store.render();
  $(".add").addEventListener("click", function (e) {
    store.addUser();
  });
  $(".twice").addEventListener("click", function (e) {
    store.twice();
  });
  $(".sort").addEventListener("click", function (e) {
    store.sort();
  });
  $(".filter > input").addEventListener("input", function (e) {
    if (!e.target.value) store.setFilter(0);
    else store.setFilter(parseInt(e.target.value));
  });
}

App();

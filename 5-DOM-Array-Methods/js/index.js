"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  personList: [
    {
      name: "아무개1",
      wealth: 300,
    },
  ],
  filter: 0,

  render: function () {
    const renderPeople = this.personList.filter(
      (person) => person.wealth >= this.filter
    );
    const totalWealth = this.personList.reduce(
      (sum, person) => sum + person.wealth,
      0
    );
    const items = renderPeople
      .map(
        (person) =>
          `<div class="item">
      <span>${person.name}</span>
      <span>${person.wealth}원</span>
    </div>`
      )
      .join("");
    $(".people").innerHTML = items;
    $(".total > span:last-child").innerText = `${totalWealth}원`;
  },
};

function App() {
  store.render();
}

App();

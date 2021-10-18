"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  fromCurrency: "USD",
  toCurrency: "KRW",
  fromAmount: 1,
  toAmount: 0,
  rate: 1000,
  rates: {},
  renderAmount: function () {
    $(".from > input").value = this.fromAmount;
    $(".to > input").value = this.toAmount;
  },
  renderRate: function () {
    $(
      ".text"
    ).innerText = `1 ${this.fromCurrency} = ${this.rate} ${this.toCurrency}`;
  },
  renderSelect: function () {
    $(".from > select").value = this.fromCurrency;
    $(".to > select").value = this.toCurrency;
  },
  setFromAcount: function (amount) {
    this.fromAmount = amount;
    this.toAmount = (this.fromAmount * this.rate).toFixed(2);
    this.renderAmount();
  },
  setFromCurrency: async function (currency) {
    this.fromCurrency = currency;
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/81a24801eabd8893c27453b3/latest/${this.fromCurrency}`
    );
    if (response.status !== 200) {
      alert("데이터를 가져올수 없습니다.");
      return;
    }
    const data = await response.json();
    const rates = data.conversion_rates;
    this.rates = rates;
    this.rate = rates[this.toCurrency];
    this.fromAmount = 1;
    this.toAmount = (this.fromAmount * this.rate).toFixed(2);
    this.renderRate();
    this.renderAmount();
  },
  setToCurrency: function (currency) {
    this.toCurrency = currency;
    this.rate = this.rates[this.toCurrency];
    this.toAmount = (this.fromAmount * this.rate).toFixed(2);
    this.renderAmount();
    this.renderRate();
  },
  swap: async function () {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/81a24801eabd8893c27453b3/latest/${this.fromCurrency}`
    );
    if (response.status !== 200) {
      alert("데이터를 가져올수 없습니다.");
      return;
    }
    const data = await response.json();
    const rates = data.conversion_rates;
    this.rates = rates;
    this.rate = rates[this.toCurrency];
    this.toAmount = (this.fromAmount * this.rate).toFixed(2);
    this.renderSelect();
    this.renderRate();
    this.renderAmount();
  },
};

function App() {
  init();
  $(".from > input").addEventListener("input", function (e) {
    const value = e.target.value;
    if (value < 0 || !value) {
      store.setFromAcount(0);
    } else {
      store.setFromAcount(parseInt(e.target.value));
    }
  });
  $("#from-select").addEventListener("change", function (e) {
    store.setFromCurrency(e.target.value);
  });
  $("#to-select").addEventListener("change", function (e) {
    store.setToCurrency(e.target.value);
  });
  $(".swap").addEventListener("click", function (e) {
    store.swap();
  });
}

async function init() {
  const response = await fetch(
    "https://v6.exchangerate-api.com/v6/81a24801eabd8893c27453b3/latest/USD"
  );
  if (response.status !== 200) {
    alert("데이터를 가져올수 없습니다.");
    return;
  }
  const data = await response.json();
  const rates = data.conversion_rates;
  store.rates = rates;
  const currencyList = [];
  for (const currency in rates) {
    currencyList.push(currency);
  }
  currencyList.sort();
  const fromOptions = currencyList.map(
    (currency) => `<option value=${currency}>${currency}</option>`
  );
  const toOptions = currencyList.map(
    (currency) => `<option value=${currency}>${currency}</option>`
  );
  $("#from-select").innerHTML = fromOptions;
  $("#to-select").innerHTML = toOptions;
  $("#from-select").value = "USD";
  $("#to-select").value = "KRW";
  $(".mid > .text").innerText = `1 USD = ${rates.KRW} KRW`;
  $(".from > input").value = 1;
  $(".to > input").value = rates.KRW;
  store.toAmount = rates.KRW;
  store.rate = rates.KRW;
}

App();

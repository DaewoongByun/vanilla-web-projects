"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  fromCurrency: "USD",
  toCurrency: "KRW",
  fromAmount: 1,
  toAmount: 0,
  rate: 1000,
};

function App() {
  init();
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

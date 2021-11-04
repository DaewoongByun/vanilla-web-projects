"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  id: 0,
  logs: [],
  save: function () {
    localStorage.setItem(
      "expenseStore",
      JSON.stringify({
        id: this.id,
        logs: this.logs,
      })
    );
  },
  load: function () {
    const store = JSON.parse(localStorage.getItem("expenseStore"));
    if (store) {
      this.id = store.id;
      this.logs = store.logs;
    }
    this.render();
  },
  addLog: function () {
    const text = $("#transaction-text").value;
    const amount = parseInt($("#transaction-amount").value);
    if (!text.split(" ").join("")) {
      alert("내용을 입력하세요");
      return;
    }
    if (!amount || amount === 0) {
      alert("금액을 입력하세요");
      return;
    }
    const type = amount > 0 ? "income" : "expense";
    this.logs.push({
      id: this.id++,
      text,
      amount,
      type,
    });
    this.render();
    $("#transaction-text").value = "";
    $("#transaction-amount").value = "";
    $("#transaction-text").focus();
    this.save();
  },

  deleteLog: function (id) {
    this.logs = this.logs.filter((log) => log.id !== id);
    this.render();
    this.save();
  },

  getTotal: function () {
    const total = this.logs.reduce((prev, cur) => prev + cur.amount, 0);
    return total;
  },
  getTotalIncome: function () {
    const totalIncome = this.logs.reduce(
      (prev, cur) => (cur.type === "income" ? prev + cur.amount : prev),
      0
    );
    return totalIncome;
  },
  getTotalExpense: function () {
    const totalExpense = this.logs.reduce(
      (prev, cur) => (cur.type === "income" ? prev : prev - cur.amount),
      0
    );
    return totalExpense;
  },

  render: function () {
    $(".total-money").innerText = `${store.getTotal().toLocaleString()}원`;
    $(".income").innerText = `${store.getTotalIncome().toLocaleString()}원`;
    $(".expense").innerText = `${store.getTotalExpense().toLocaleString()}원`;

    const histories = this.logs
      .map(
        (log) => `
    <div class="history-item history-item-${
      log.type === "income" ? "income" : "expense"
    }" data-id=${log.id}>
      <span class="text">${log.text}</span>
      <span class="amount">${
        log.type === "income" ? "+" : ""
      }${log.amount.toLocaleString()}</span>
      <div class="delete-button">X</div>
    </div>
    `
      )
      .join("");
    $(".history").innerHTML = histories;
  },
};

function App() {
  store.load();
  $(".add").addEventListener("click", () => {
    store.addLog();
  });
  $("#transaction-text").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      store.addLog();
    }
  });
  $("#transaction-amount").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      store.addLog();
    }
  });
  $(".history").addEventListener("click", (e) => {
    if (e.target.className === "delete-button") {
      const parent = e.target.closest(".history-item");
      store.deleteLog(parseInt(parent.dataset.id));
    }
  });
}

App();

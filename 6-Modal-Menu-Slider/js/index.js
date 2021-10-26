"use-strict";

const $ = (query) => document.querySelector(query);

const store = {
  sideMenuShow: false,
  modalShow: false,
  modalContent: "",

  setModalContent: function (value) {
    this.modalContent = value;
  },

  toggleSideMenu: function () {
    this.sideMenuShow = !this.sideMenuShow;
    this.render();
  },

  toggleModal: function () {
    this.modalShow = !this.modalShow;
    this.render();
  },
  render: function () {
    if (this.sideMenuShow) {
      $("aside").style.opacity = "1";
      $("aside").style.transform = "translateX(0)";
    } else {
      $("aside").style.transform = "translateX(-180px)";
    }

    if (this.modalShow) {
      $(".modal-background").style.display = "flex";
      $(".modal-container > .content").innerText = this.modalContent;
    } else {
      $(".modal-background").style.display = "none";
    }
  },
};

function App() {
  document.querySelectorAll(".aside-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      store.toggleSideMenu();
    });
  });

  $("#modal-input").addEventListener("input", (e) => {
    store.setModalContent(e.target.value);
  });

  $(".modal-btn").addEventListener("click", (e) => {
    store.toggleModal();
  });

  $(".icon").addEventListener("click", (e) => {
    console.log(e.target);
    store.toggleModal();
  });

  $(".modal-container").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  $(".modal-background").addEventListener("click", (e) => {
    store.toggleModal();
    e.stopPropagation();
  });
}

App();

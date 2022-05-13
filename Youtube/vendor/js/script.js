const btnActive = document.querySelectorAll(".btn-content");

const btnHeaderIcon = document.querySelector(".header__icon-grid");
const SmallYoutube = document.querySelector(".header__small");
const btnRounded = document.querySelector(".header__rounded");
const btnGird = document.querySelector(".header__grid");
const btnRounded2 = document.querySelectorAll(".container__rounded");
const menuMobile = document.querySelectorAll(".container__mobile-link");

const btnSub = document.querySelector("#container__mobile-link__sub");

const activeUserMobile = document.querySelector(".header__icon-mobile__user");
const removeActiveUserMobile = document.querySelector(
  ".container__mobile-user__close"
);

// Active User Mobile
removeActiveUserMobile.addEventListener("click", () => {
  document.querySelector(".container__mobile-user").classList.remove("active");
});

activeUserMobile.addEventListener("click", () => {
  document.querySelector(".container__mobile-sub").classList.remove("active");
  document.querySelector(".container__mobile-lib").classList.remove("active");
  document.querySelector(".container__mobile-user").classList.add("active");
});

// Active menu Mobile
const removeMobi = () => {
  menuMobile.forEach((mobi) => {
    mobi.classList.remove("active");
  });
};

menuMobile.forEach((mobi) => {
  mobi.addEventListener("click", () => {
    removeMobi();
    mobi.classList.add("active");
    if (mobi.id == "container__mobile-link__lib") {
      document
        .querySelector(".container__mobile-sub")
        .classList.remove("active");

      document
        .querySelector(".container__mobile-user")
        .classList.remove("active");

      document
        .querySelector(".container__mobile-lib")
        .classList.toggle("active");
    } else if (mobi.id == "container__mobile-link__sub") {
      document
        .querySelector(".container__mobile-sub")
        .classList.toggle("active");
      document
        .querySelector(".container__mobile-lib")
        .classList.remove("active");
      document
        .querySelector(".container__mobile-user")
        .classList.remove("active");
    } else if (mobi.id == "container__mobile-link__home") {
      document
        .querySelector(".container__mobile-sub")
        .classList.remove("active");
      document
        .querySelector(".container__mobile-lib")
        .classList.remove("active");
      document
        .querySelector(".container__mobile-user")
        .classList.remove("active");
    }
  });
});

// Sidebar
const sidebar = document.querySelector(".header__menu-icon");
const removeSidebar = document.querySelector(".header__menu-icon-2");
const btnSidebar = document.querySelectorAll(".container__sidebar__link");

sidebar.addEventListener("click", () => {
  document.querySelector(".container__sidebar").classList.add("active");
});

removeSidebar.addEventListener("click", () => {
  document.querySelector(".container__sidebar").classList.remove("active");
});

// Toggle btn Rounded
btnRounded.addEventListener("click", () => {
  btnRounded.classList.toggle("active");
});

// Toggle btn Grid
btnGird.addEventListener("click", () => {
  btnGird.classList.toggle("active");
});

// Toggle btn Grid
btnRounded2.forEach((btn2) => {
  btn2.addEventListener("click", () => {
    btn2.classList.toggle("active");
  });
});

// Active container__header
const removeActive = () => {
  btnActive.forEach((btn) => {
    btn.classList.remove("active");
  });
};
btnActive.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeActive();
    btn.classList.add("active");
  });
});

// Active container__header-sidebar
const removeActiveSidebar = () => {
  btnSidebar.forEach((side) => {
    side.classList.remove("active");
  });
};
btnSidebar.forEach((side) => {
  side.addEventListener("click", () => {
    removeActiveSidebar();
    side.classList.add("active");
  });
});

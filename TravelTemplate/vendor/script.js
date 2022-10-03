const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".container--sliders__tab--item");
const panes = $$(".container--sliders__tab--pane");

tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    $(".container--sliders__tab--item.active").classList.remove("active");
    $(".container--sliders__tab--pane.active").classList.remove("active");

    this.classList.add("active");
    pane.classList.add("active");
  };
});

const signinBtn = document.querySelector(".signinBtn");
const signupBtn = document.querySelector(".signupBtn");
const formBx = document.querySelector(".formBx");
const body = document.querySelector("body");
const btnLogin = document.querySelector(".header--nav__item--contact__login");
const formLogin = document.querySelector(".overlayLogin");
const formClose = document.querySelector(".overlayLogin i");

signupBtn.addEventListener("click", () => {
  formBx.classList.add("active");
});
signinBtn.addEventListener("click", () => {
  formBx.classList.remove("active");
});

btnLogin.addEventListener("click", () => {
  formLogin.style.display = "flex";
});
formClose.addEventListener("click", () => {
  formLogin.style.display = "none";
});

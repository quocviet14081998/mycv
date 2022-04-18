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

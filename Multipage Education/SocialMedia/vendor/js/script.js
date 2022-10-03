// SIDEBAR
const menuItem = document.querySelectorAll(".main__left-menu__item");

// Like By
const likeHeart = document.querySelectorAll(
  ".middle-action__interaction-buttons span:first-child"
);

// Message
const messageNotification = document.querySelector("#message__notification");
const messages = document.querySelector(".main__right-messages");
const message = document.querySelectorAll(".main__right-message");
const messageSearch = document.querySelector("#message__search");

// Theme
const theme = document.querySelector("#theme");
const themeModal = document.querySelector(".customize__theme");

// Font Size
const fontSizes = document.querySelectorAll(".choose__size span");
var root = document.querySelector(":root");

// Color
const colorPalette = document.querySelectorAll(".choose__color span");

// Background
const Bg1 = document.querySelector(".bg__1");
const Bg2 = document.querySelector(".bg__2");
const Bg3 = document.querySelector(".bg__3");

// Like Heart
likeHeart.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("active");
  });
});

// Active Menu
const changeActive = () => {
  menuItem.forEach((item) => {
    item.classList.remove("active");
  });
};
menuItem.forEach((item) => {
  item.addEventListener("click", () => {
    changeActive();
    item.classList.add("active");
    if (item.id != "notification") {
      document.querySelector(".notifications__popup").style.display = "none";
    } else {
      document.querySelector(".notifications__popup").style.display = "block";
      document.querySelector(".notification__count").style.display = "none";
    }
  });
});

// Hightlight message
messageNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)";
  messageNotification.querySelector(".notification__count").style.display =
    "none";
  setTimeout(() => {
    messages.style.boxShadow = "none";
  }, 2000);
});

// Search chat
const searchMessage = () => {
  const val = messageSearch.value.toLowerCase();

  message.forEach((chat) => {
    let name = chat
      .querySelector(".right__message-body__name")
      .textContent.toLowerCase();

    if (name.indexOf(val) != -1) {
      chat.style.display = "flex";
    } else {
      chat.style.display = "none";
    }
  });
};
messageSearch.addEventListener("keyup", searchMessage);

// Theme/ Display customization
// open modal theme
const openThemeModal = () => {
  themeModal.style.display = "grid";
};
theme.addEventListener("click", openThemeModal);

// close modal

const closeThemeModal = (e) => {
  if (e.target.classList.contains("customize__theme")) {
    themeModal.style.display = "none";
  }
};

themeModal.addEventListener("click", closeThemeModal);

// FontSizes

// remove active class font-size
const removeSizeSelector = () => {
  fontSizes.forEach((size) => {
    size.classList.remove("active");
  });
};

fontSizes.forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle("active");
    if (size.classList.contains("font__size-1")) {
      fontSize = "10px";
      root.style.setProperty("--sticky-top-left", "5.4rem");
      root.style.setProperty("--sticky-top-right", "5.4rem");
    } else if (size.classList.contains("font__size-2")) {
      fontSize = "13px";
      root.style.setProperty("--sticky-top-left", "5.4rem");
      root.style.setProperty("--sticky-top-right", "-7rem");
    } else if (size.classList.contains("font__size-3")) {
      fontSize = "16px";
      root.style.setProperty("--sticky-top-left", "2rem");
      root.style.setProperty("--sticky-top-right", "-17rem");
    } else if (size.classList.contains("font__size-4")) {
      fontSize = "19px";
      root.style.setProperty("--sticky-top-left", "-5rem");
      root.style.setProperty("--sticky-top-right", "-25rem");
    } else if (size.classList.contains("font__size-5")) {
      fontSize = "22px";
      root.style.setProperty("--sticky-top-left", "-12rem");
      root.style.setProperty("--sticky-top-right", "-35rem");
    }
    //   change fontSize
    document.querySelector("html").style.fontSize = fontSize;
  });
});

// Change Primary colors

// remove active class color

const removeColorSelector = () => {
  colorPalette.forEach((color) => {
    color.classList.remove("active");
  });
};

colorPalette.forEach((color) => {
  color.addEventListener("click", () => {
    removeColorSelector();
    let primary;

    if (color.classList.contains("color__1")) {
      primaryHue = 252;
    } else if (color.classList.contains("color__2")) {
      primaryHue = 52;
    } else if (color.classList.contains("color__3")) {
      primaryHue = 352;
    } else if (color.classList.contains("color__4")) {
      primaryHue = 152;
    } else if (color.classList.contains("color__5")) {
      primaryHue = 202;
    }
    color.classList.add("active");

    root.style.setProperty("--primary-color-hue", primaryHue);
  });
});

// theme Background values

let lightColorLightNess;
let whiteColorLightNess;
let darkColorLightNess;

// change background color
const changeBG = () => {
  root.style.setProperty("--light-color-lightness", lightColorLightNess);
  root.style.setProperty("--white-color-lightness", whiteColorLightNess);
  root.style.setProperty("--dark-color-lightness", darkColorLightNess);
};

Bg1.addEventListener("click", () => {
  Bg1.classList.add("active");
  Bg2.classList.remove("active");
  Bg3.classList.remove("active");
  window.location.reload();
});

Bg2.addEventListener("click", () => {
  darkColorLightNess = "95%";
  whiteColorLightNess = "20%";
  lightColorLightNess = "15%";

  // add active class
  Bg2.classList.add("active");

  // remove active class
  Bg1.classList.remove("active");
  Bg3.classList.remove("active");
  changeBG();
});

Bg3.addEventListener("click", () => {
  darkColorLightNess = "95%";
  whiteColorLightNess = "10%";
  lightColorLightNess = "0%";

  // add active class
  Bg3.classList.add("active");

  // remove active class
  Bg1.classList.remove("active");
  Bg2.classList.remove("active");
  changeBG();
});

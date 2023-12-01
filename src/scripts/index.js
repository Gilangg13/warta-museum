import "../styles/main.css";
import "./views/templates/template-creator";
import App from "./views/app";

const app = new App({
  content: document.querySelector("main"),
  menuBtn: document.querySelector(".navbar-toggler"),
  searchBtn: document.querySelector(".search-icon"),
  cancelBtn: document.querySelector(".cancel-icon"),
  items: document.querySelector(".navbar-nav"),
  form: document.querySelector(".form"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
});

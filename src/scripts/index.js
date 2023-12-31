import "regenerator-runtime";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "../styles/main.css";
import "../styles/responsive.css";
import "./views/templates/template-creator";
import App from "./views/app";
import swRegister from "./utils/sw-register";

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
  swRegister();
});

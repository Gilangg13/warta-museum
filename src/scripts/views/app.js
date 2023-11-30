/* eslint-disable no-promise-executor-return */
/* eslint-disable class-methods-use-this */
import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";
import DrawerInitiator from "../utils/drawer-initiator";

class App {
  constructor({
    // button,
    // drawer,
    content,
    menuBtn,
    searchBtn,
    cancelBtn,
    items,
    form,
  }) {
    // this.button = button;
    // this.drawer = drawer;
    this._content = content;

    this._menuBtn = menuBtn;
    this._searchBtn = searchBtn;
    this._cancelBtn = cancelBtn;
    this._items = items;
    this._form = form;

    // this._content = document.getElementById("content");

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      // button: this._button,
      // drawer: this._drawer,
      content: this._content,
      menuBtn: this._menuBtn,
      searchBtn: this._searchBtn,
      cancelBtn: this._cancelBtn,
      items: this._items,
      form: this._form,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (page) {
      //   this._showLoading();
      try {
        // await this._wait(500);
        this._content.innerHTML = await page.render();
        await page.afterRender();
      } catch (error) {
        console.log("Failed to render page", error);
      }
      //   this._hideLoading();
    }

    // const skipLinkElem = document.querySelector(".skip-to-content");
    // skipLinkElem.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   document.querySelector("#mainContent").focus();
    // });
  }

  // _wait(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
}

export default App;

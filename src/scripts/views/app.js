/* eslint-disable object-curly-newline */
/* eslint-disable no-promise-executor-return */
/* eslint-disable class-methods-use-this */
import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";
import DrawerInitiator from "../utils/drawer-initiator";
import SearchResult from "./pages/search-result";

class App {
  constructor({ content, menuBtn, searchBtn, cancelBtn, items, form }) {
    this._content = content;

    this._menuBtn = menuBtn;
    this._searchBtn = searchBtn;
    this._cancelBtn = cancelBtn;
    this._items = items;
    this._form = form;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      content: this._content,
      menuBtn: this._menuBtn,
      searchBtn: this._searchBtn,
      cancelBtn: this._cancelBtn,
      items: this._items,
      form: this._form,
      searchHandler: this._searchHandler.bind(this),
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (page) {
      this._showLoading();
      try {
        await this._wait(500);
        this._content.innerHTML = await page.render();
        await page.afterRender();
      } catch (error) {
        console.log("Failed to render page", error);
      }
      this._hideLoading();
    }

    // untuk route pencarian
    const searchRoute = url.resource === "search";
    if (searchRoute) {
      try {
        this._content.innerHTML = await SearchResult.render();
        await SearchResult.afterRender(url.id || "");
      } catch (error) {
        console.error(`Gagal merender hasil pencarian: ${error}`);
      }
    }

    const skipLinkElem = document.querySelector(".skip-to-content");
    skipLinkElem.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#mainContent").focus();
    });
  }

  _searchHandler(query) {
    window.location.hash = `/search?q=${query}`;
    this.renderPage();
  }

  _wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  _showLoading() {
    this._content.innerHTML = `
      <div class="loading-indicator">
        <div class="loading-indicator-circle"></div>
        <span class="loading-indicator-text">Loading...</span>
      </div>
    `;
  }

  _hideLoading() {
    const loadingIndicator = this._content.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
}

export default App;

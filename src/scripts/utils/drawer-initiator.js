/* eslint-disable object-curly-newline */
const DrawerInitiator = {
  init({ menuBtn, searchBtn, cancelBtn, items, form, searchHandler }) {
    menuBtn.addEventListener("click", () => {
      this._toggleMenuSearch(items, menuBtn, searchBtn, cancelBtn);
    });

    searchBtn.addEventListener("click", () => {
      this._openSearch(form, searchBtn, cancelBtn);
    });

    cancelBtn.addEventListener("click", () => {
      this._closeSearch(items, menuBtn, searchBtn, cancelBtn, form);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = form.querySelector(".search-data").value;
      searchHandler(query);
    });
  },

  _toggleMenuSearch(items, menuBtn, searchBtn, cancelBtn) {
    items.classList.add("active");
    menuBtn.classList.add("hide");
    searchBtn.classList.add("show");
    cancelBtn.classList.add("hide");
  },

  _openSearch(form, searchBtn, cancelBtn) {
    form.classList.add("active");
    searchBtn.classList.add("hide");
    cancelBtn.classList.add("show");
  },

  _closeSearch(items, menuBtn, searchBtn, cancelBtn, form) {
    items.classList.remove("active");
    menuBtn.classList.remove("hide");
    searchBtn.classList.remove("hide");
    cancelBtn.classList.remove("show");
    form.classList.remove("active");
  },
};

export default DrawerInitiator;

/* eslint-disable object-curly-newline */
const DrawerInitiator = {
  init({ menuBtn, searchBtn, cancelBtn, items, form }) {
    menuBtn.addEventListener("click", () => {
      this._toggleMenuSearch(items, menuBtn, searchBtn, cancelBtn);
    });

    searchBtn.addEventListener("click", () => {
      this._openSearch(form, searchBtn, cancelBtn);
    });

    cancelBtn.addEventListener("click", () => {
      this._closeSearch(items, menuBtn, searchBtn, cancelBtn, form);
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

/* eslint-disable object-curly-newline */
const DrawerInitiator = {
  init({ menuBtn, searchBtn, cancelBtn, items, form }) {
    // button.addEventListener("click", (event) => {
    //   //   this._toggleDrawer(event, drawer);
    //   this._toggleMenuSearch(event, menuBtn, searchBtn, cancelBtn, items, form);
    // });

    // content.addEventListener("click", (event) => {
    //   //   this._closeDrawer(event, drawer);
    //   this._closeMenuSearch(menuBtn, searchBtn, cancelBtn, items, form);
    // });

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

  //   _toggleDrawer(event, drawer) {
  //     event.stopPropagation();
  //     drawer.classList.toggle("active");
  //   },

  //   _closeDrawer(event, drawer) {
  //     event.stopPropagation();
  //     drawer.classList.remove("active");
  //   },

  _toggleMenuSearch(items, menuBtn, searchBtn, cancelBtn) {
    items.classList.add("active");
    menuBtn.classList.add("hide");
    searchBtn.classList.add("show");
    cancelBtn.classList.add("hide");
  },

  //   _closeMenuSearch(items, menuBtn, searchBtn, cancelBtn, form) {
  //     items.classList.remove("active");
  //     menuBtn.classList.remove("hide");
  //     searchBtn.classList.remove("hide");
  //     cancelBtn.classList.remove("show");
  //     form.classList.remove("active");
  //   },

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

import { createAboutTemplate } from "../templates/template-creator";

const AboutUs = {
  async render() {
    return `
        <section class="museum-about-container"></section>        
    `;
  },

  async afterRender() {
    // const url = UrlParser.parseActiveUrlWithoutCombiner();
    const museumAbout = document.querySelector(".museum-about-container");

    museumAbout.innerHTML += createAboutTemplate();
  },
};

export default AboutUs;

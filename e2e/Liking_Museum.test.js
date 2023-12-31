/* eslint-disable no-undef */
Feature("Liking Museum");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

const likingMuseum = async ({ I }) => {
  I.amOnPage("/");

  I.waitForElement(locate(".card-link a"), 5);

  const firstMuseum = locate(".card-link a").first();
  I.click(firstMuseum);

  I.waitForElement({ id: "likeButton" }, 5);
  I.waitForClickable("#likeButton", 5);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.waitForElement(".museum-item-category", 20);
};

Scenario("Menyukai satu museum", async ({ I }) => {
  I.wait(3);
  await likingMuseum({ I });
});

Scenario("Unliking one museum", async ({ I }) => {
  I.wait(2);
  await likingMuseum({ I });

  I.amOnPage("/#/favorite");

  I.waitForElement(locate(".card-link a"), 5);

  I.click(locate(".card-link a").first());

  I.waitForElement({ id: "likeButton" }, 5);
  I.waitForClickable("#likeButton", 5);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
});

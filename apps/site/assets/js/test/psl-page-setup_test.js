import { assert } from "chai";
import jsdom from "mocha-jsdom";
import { setupPslFilterButtons } from "../psl-page-setup";
import testConfig from "../../ts/jest.config";

const { testURL } = testConfig;

const pslHtml = `
  <div class="psl-types-buttons hidden">
    <button class="psl-type-button" data-group="All Location Types">All Location Types</button>
    <button class="psl-type-button" data-group="Charlie Retailer">Charlie Retailer</button>
    <button class="psl-type-button" data-group="Fare Vending Machine">Fare Vending Machine</button>
  </div>
  <div class="c-sales-locations__cards">
    ${[1, 2, 3, 4, 5, 6, 7, 8]
      .map(
        () =>
          `<div class="c-sales-locations__card" data-psltype="Both fare vending machine and Charlie retailer">
        Empty Card
      </div>`
      )
      .join("")}
    ${[1, 2, 3]
      .map(
        () =>
          `<div class="c-sales-locations__card" data-psltype="Charlie retailer">
        Empty Card
      </div>`
      )
      .join("")}
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
      .map(
        () =>
          `<div class="c-sales-locations__card" data-psltype="Fare vending machine">
        Empty Card
      </div>`
      )
      .join("")}
  </div>
`;

describe("psl-filters", () => {
  let $;
  jsdom({ url: testURL });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    $("body").html(pslHtml);
    setupPslFilterButtons();
  });

  it("Default state:  'All Location Types' selected", () => {
    // Button is selected
    const firstPslButton = $(".psl-type-button")[0];
    assert.isTrue(firstPslButton.classList.contains("selected"));

    // All the cards are relevant
    const cards = $(".c-sales-locations__card");
    const visibleCards = cards.filter(
      x => !cards[x].classList.contains("hidden")
    );
    // There are only 12 cards
    assert.isTrue(visibleCards.length === 12);
    // The cards are of all types
    assert.isTrue(
      visibleCards.filter(
        x =>
          cards[x].dataset.psltype ===
          "Both fare vending machine and Charlie retailer"
      ).length > 0
    );
    assert.isTrue(
      visibleCards.filter(x => cards[x].dataset.psltype === "Charlie retailer")
        .length > 0
    );
    assert.isTrue(
      visibleCards.filter(
        x => cards[x].dataset.psltype === "Fare vending machine"
      ).length > 0
    );
  });

  it("Clicking 'Charlie Retailer' filters down the list", () => {
    const retailerButton = $(".psl-type-button")[1];
    retailerButton.click();
    const allTypesButton = $(".psl-type-button")[0];

    // Button is selected, not the default button
    assert.isTrue(retailerButton.classList.contains("selected"));
    assert.isFalse(allTypesButton.classList.contains("selected"));

    // All the cards are relevant
    const cards = $(".c-sales-locations__card");
    const visibleCards = cards.filter(
      x => !cards[x].classList.contains("hidden")
    );
    // There are only 11 cards
    assert.isTrue(visibleCards.length === 11);
    // The cards are only Charlie Retailer type or the BOTH type
    assert.isTrue(
      visibleCards.filter(
        x =>
          visibleCards[x].dataset.psltype ===
          "Both fare vending machine and Charlie retailer"
      ).length > 0
    );
    assert.isTrue(
      visibleCards.filter(
        x => visibleCards[x].dataset.psltype === "Charlie retailer"
      ).length > 0
    );
    assert.isFalse(
      visibleCards.filter(
        x => visibleCards[x].dataset.psltype === "Fare vending machine"
      ).length > 0
    );
  });

  it("Clicking 'Fare vending machine' filters down the list", () => {
    const vendingButton = $(".psl-type-button")[2];
    vendingButton.click();
    const allTypesButton = $(".psl-type-button")[0];

    // Button is selected, not the default button
    assert.isTrue(vendingButton.classList.contains("selected"));
    assert.isFalse(allTypesButton.classList.contains("selected"));

    // All the cards are relevant
    const cards = $(".c-sales-locations__card");
    const visibleCards = cards.filter(
      x => !cards[x].classList.contains("hidden")
    );
    // There are only 12 cards
    assert.isTrue(visibleCards.length === 12);
    // The cards are only Charlie Retailer type or the BOTH type
    assert.isTrue(
      visibleCards.filter(
        x =>
          visibleCards[x].dataset.psltype ===
          "Both fare vending machine and Charlie retailer"
      ).length > 0
    );
    assert.isFalse(
      visibleCards.filter(
        x => visibleCards[x].dataset.psltype === "Charlie retailer"
      ).length > 0
    );
    assert.isTrue(
      visibleCards.filter(
        x => visibleCards[x].dataset.psltype === "Fare vending machine"
      ).length > 0
    );
  });
});

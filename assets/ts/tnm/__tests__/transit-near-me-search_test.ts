import TransitNearMeSearch from "../search";

describe("TransitNearMeSearch", () => {
  beforeEach(() => {
    const {
      container,
      input,
      resetButton,
      goBtn,
      latitude,
      longitude
    } = TransitNearMeSearch.SELECTORS;

    document.body.innerHTML = `
      <div id="address-search-message"></div>
      <form id="${container}">
        <input id="${input}"></input>
        <div id="${resetButton}"></div>
        <button id ="${goBtn}"></button>
        <input type="text" id="${latitude}" />
        <input type="text" id="${longitude}" />
      </form>
    `;
  });

  describe("constructor", () => {
    it("initializes a TransitNearMeSearch instance", () => {
      const search = new TransitNearMeSearch();
      expect(search).toBeInstanceOf(TransitNearMeSearch);
    });
  });

  describe("showLocation", () => {
    it("submits the form with lat, lng, and formatted address", () => {
      const search = new TransitNearMeSearch();
      search.submit = jest.fn();
      search.showLocation("42.1", "-71.2");
      expect(search.submit).toHaveBeenCalled();
      const { latitude, longitude } = TransitNearMeSearch.SELECTORS;
      const latElement = document.getElementById(latitude) as HTMLInputElement;
      const longElement = document.getElementById(
        longitude
      ) as HTMLInputElement;

      expect(latElement.value).toBe("42.1");
      expect(longElement.value).toBe("-71.2");
    });
  });
});

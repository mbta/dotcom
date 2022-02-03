import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import createLocationServiceMock from "./helpers/stubs/googleMaps";

configure({ adapter: new Adapter() });

export {};
declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Turbolinks: any;
    decodeURIComponent(component: string): string;
    encodeURIComponent(component: string): string;
    autocomplete: any;
    jQuery: any;
    HTMLElement: any;
    /* eslint-enable typescript/no-explicit-any */
  }
}
window.jQuery = require("jquery");
window.autocomplete = require("autocomplete.js");
window.Turbolinks = require("turbolinks");

document.title = "MBTA";

window.google = {
  maps: createLocationServiceMock()
};

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});

window.HTMLElement.prototype.scrollIntoView = jest.fn();

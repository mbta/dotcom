import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import createGoogleMapsMock from "./helpers/stubs/googleMaps";

configure({ adapter: new Adapter() });

export {};
declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
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

document.title = "MBTA";

window.google = {
  maps: createGoogleMapsMock()
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

/*
  Extend JSDOM SVGSVGElement by introducing createSVGRect as an empty function

  This technique allows us to emulate SVG support in JSDOM in order to pass Jest tests
  for vector overlays such as Polyline

  Found here: https://github.com/bcgov/biohubbc/blob/032710042000df75b21dbdc6170124afc9daf026/app/src/setupTests.ts#L12
*/
const createElementNSOrig = global.document.createElementNS;

// @ts-ignore
global.document.createElementNS = function(namespaceURI, qualifiedName) {
  if (
    namespaceURI === "http://www.w3.org/2000/svg" &&
    qualifiedName === "svg"
  ) {
    // eslint-disable-next-line prefer-rest-params
    // @ts-ignore
    const element = createElementNSOrig.apply(this, arguments) as SVGSVGElement;
    // @ts-ignore
    element.createSVGRect = function() {
      // This is intentional
    };

    return element;
  }

  // eslint-disable-next-line prefer-rest-params
  return createElementNSOrig.apply(this, arguments as any);
};

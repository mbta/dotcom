import { assert } from "chai";
import jsdom from "mocha-jsdom";
import mobileMenu from "../mobile-menu";
import testConfig from "../../ts/jest.config";

const { testURL } = testConfig;

const header = `
  <header class="header">
    <div class="container">
      <button class="m-menu__toggle></button>
      <a class="navbar-logo"></a>
      <div class="hidden-no-js">
        <div class="search></div>
      </div>
      <button class="header-search__toggle"></button>
      <nav id="desktop-menu"></nav>
    </div>
    <nav class="m-menu" id="navmenu"></nav>
  </header>
`

// describe.only("mobile menu", () => {
//   let $;
//   jsdom({ url: testURL });
  
//   beforeEach(() => {
//     $ = jsdom.rerequire("jquery");
//     $("body").html(header);
//     mobileMenu();
//   });

//   it("opening/closing via mobile menu button", () => {
//     const menuButton = $("button.m-menu__toggle");
//     const menu = document.querySelector(".m-menu__content")//$("#navmenu");
//     console.log('menu', menu)
//     //console.log('width', menu.offsetWidth)
//     //assert.isTrue(menu.offsetWidth === 0);

//     menuButton.click();
//     const menu2 = document.querySelector(".m-menu__content")
//     console.log('menu2', menu2)
//     console.log('width', menu2.offsetWidth)
//     assert.isTrue(menu2.offsetWidth > 0);
//   })
//   it("closing menu by clicking veil")
//   it("closing search by clicking veil")
//   it("closing menu by esc key")
//   it("closing search by esc key")
// })
import { assert, expect } from "chai";
import sinon from "sinon";
import jsdom from "mocha-jsdom";
import { setupEventsPage } from "../event-page-setup";
import testConfig from "../../ts/jest.config";

const { testURL } = testConfig;

const eventsHubHTML = `
    <div class="container m-events-hub">
      <h1>Events</h1>
      <div class="row">
        <nav class="m-event-list__nav col-sm-3 fixedsticky sticky-top"></nav>
        <div class="col-sm-offset-1 col-sm-8">
          <div class="event-listing">
            <nav class="m-event-list__nav--mobile-controls fixedsticky sticky-top">
              <select class="c-select m-event-list__select">
                <option>Jump to</option>
                <option value="/events?month=1&year=2021">January 2021</option>
                <option value="/events?month=2&year=2021">February 2021</option>
                <option value="/events?month=3&year=2021">March 2021</option>
              </select>
            </nav>
            ${[1, 2, 3]
              .map(
                m => `<section id="${m}-2021" class="m-event-list__month 
                ${m === 2 ? "m-event-list__month--active" : ""}">
                <h2 class="m-event-list__month-header fixedsticky sticky-top">${m} 2021</h2>
                <ul>
                  <li>Event 1</li>
                  <li>Event 2</li>
                </ul>
                </section>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
    `;

describe("setupEventsPage", () => {
  let $;
  jsdom({ url: testURL });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    $("body").append("<div id=test />");
    $("#test").html(eventsHubHTML);
  });

  afterEach(() => {
    $("#test").remove();
  });

  it("scrolls to .m-event-list__month--active", () => {
    const scrollIntoViewSpy = sinon.spy();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewSpy;
    sinon.assert.notCalled(scrollIntoViewSpy);

    const activeMonth = $("section.m-event-list__month--active");
    assert.isOk(activeMonth);
    assert.equal(activeMonth.length, 1);

    setupEventsPage();

    sinon.assert.calledOnce(scrollIntoViewSpy);
  });

  it("navigates when .m-event-list__select changes", () => {
    setupEventsPage();

    const windowLocationSpy = sinon.spy(window.location, "assign");
    sinon.assert.notCalled(windowLocationSpy);

    const dateSelect = document.querySelector("select.m-event-list__select");
    const optionValue = "/events?month=2&year=2021";
    $(dateSelect)
      .find(`option[value="${optionValue}"]`)
      .attr("selected", "selected");
    const event = new window.Event("change", { bubbles: true });
    dateSelect.dispatchEvent(event);

    sinon.assert.calledOnce(windowLocationSpy);
    sinon.assert.calledWithExactly(windowLocationSpy, optionValue);
  });
});

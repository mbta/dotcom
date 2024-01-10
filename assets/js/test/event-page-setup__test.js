import { assert, expect } from "chai";
import sinon from "sinon";
import jsdom from "mocha-jsdom";
import { setupEventsListing, setupEventPopups } from "../event-page-setup";
import testConfig from "../../ts/jest.config";

const { testURL } = testConfig;

const eventsHubListViewHTML = `
    <div class="container m-events-hub m-events-hub--list-view">
      <h1>Events</h1>
      <div class="row">
        <nav class="m-event-list__nav col-sm-3 fixedsticky sticky-top"></nav>
        <div class="col-sm-offset-1 col-sm-8">
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
                <button class="c-expandable-block__link sticky-top sticky-month" data-target="#panel-1" tabindex="0" id="header-1" aria-expanded="true" aria-controls="panel-1" data-toggle="collapse">
                  <h2 class="m-event-list__month-header">
                    ${m} 2021<span class="c-expandable-block-caret"></span>
                  </h2>
                </button>
                <div class="collapse in js-focus-on-expand" tabindex="0" role="region" id="panel-${m}" aria-labelledby="header-${m}">
                  <ul>
                    <li>Event 1</li>
                    <li>Event 2</li>
                  </ul>
                </div>
              </section>`
            )
            .join("")}
        </div>
      </div>
    </div>
    `;

const eventsHubCalendarViewHTML = `
<div class="m-events-hub">
<div class="col-sm-10">
   <h2 class="m-event-list__month-header">May 2021</h2>
   <table class="m-event-calendar">
      <thead>
         <tr>
            <th scope="col">Monday</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td class="m-event-calendar__day">
               <div class="m-event-calendar__day-label">1</div>
               <button class="m-event-calendar__event" data-a11y-dialog-show="5304">
                  <i class="fa fa-circle " aria-hidden="true"></i>
                  <div class="m-event-calendar__event-time">6 PM</div>
                  <div class="m-event-calendar__event-title">East Cottage Street and Norfolk Avenue Bridges Replacement Project Virtual Public Meeting</div>
               </button>
               <div class="m-event-overlay open-left" id="5304" aria-label="Event summary for East Cottage Street and Norfolk Avenue Bridges Replacement Project Virtual Public Meeting" aria-modal="true" role="dialog" aria-hidden="true">
                  <div role="document">
                     <div class="u-flex-container">
                        <div class="m-event__title">
                           <a href="/events/2021-05-06/east-cottage-street-and-norfolk-avenue-bridges-replacement-project-virtual-public">East Cottage Street and Norfolk Avenue Bridges Replacement Project Virtual Public Meeting</a>
                        </div>
                        <button type="button" data-a11y-dialog-hide="" aria-label="Close dialog">
                        ×
                        </button>
                     </div>
                     <div class="u-flex-container">
                        <div class="m-event__status-message popup-version">
                           <a class="btn btn-secondary btn-lg" data-turbolinks="false" href="/events/icalendar/2021-05-06/east-cottage-street-and-norfolk-avenue-bridges-replacement-project-virtual-public"><i aria-hidden="true" class="notranslate fa fa-calendar-plus-o "></i></a>
                        </div>
                        <div class="u-flex-one">
                           <strong>Thursday, May 6, 2021</strong>
                           <div class="m-event__date-range">6 PM</div>
                        </div>
                     </div>
                  </div>
               </div>
            </td>
         </tr>
      </tbody>
   </table>
</div>
</div>
`;

function triggerScrollEvent(clock) {
  document.dispatchEvent(new window.Event("scroll"));
  clock.tick(); // fast forward set timeout (gets past window.requestAnimationFrame)
}

describe("setupEventsListing", () => {
  let $;
  let scrollIntoViewSpy;
  let getComputedStyleSpy;
  let getBoundingClientRectSpy;
  let toggleAttributeSpy;
  jsdom({ url: testURL });

  before(() => {
    /**
     * Set up sinon stubs to watch DOM functions we want to assert.
     *
     * JSDOM lacks various DOM API features, so for those functions we have to
     * manually assign the stubs to window.HTMLElement.prototype
     */
    scrollIntoViewSpy = sinon.stub();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewSpy;

    toggleAttributeSpy = sinon.stub();
    window.HTMLElement.prototype.toggleAttribute = toggleAttributeSpy;
    getBoundingClientRectSpy = sinon.stub(
      window.HTMLElement.prototype,
      "getBoundingClientRect"
    );
    getComputedStyleSpy = sinon.stub(window, "getComputedStyle");
  });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    $("body").append("<div id=test />");
    $("#test").html(eventsHubListViewHTML);
  });

  afterEach(() => {
    $("#test").remove();
    // reset all the stubs
    scrollIntoViewSpy.resetHistory();
    getComputedStyleSpy.resetHistory();
    getBoundingClientRectSpy.resetHistory();
    toggleAttributeSpy.resetHistory();
  });

  describe("scroll event listeners", () => {
    /**
     * Because the logic in these event listeners are inside a
     * window.requestAnimationFrame() call, we need to let the test bypass that.
     */
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
      window.requestAnimationFrame = setTimeout;
      window.cancelAnimationFrame = clearTimeout;
    });

    afterEach(() => {
      clock.restore();
    });

    it("will toggle 'stuck' attribute based on calculations on scroll", () => {
      // mock the positions. making these equal triggers the attribute!
      const t = 22;
      getBoundingClientRectSpy.callsFake(() => ({ top: t }));
      getComputedStyleSpy.callsFake(el => ({ top: `${t}px` }));

      setupEventsListing();
      sinon.assert.notCalled(getComputedStyleSpy);
      sinon.assert.notCalled(getBoundingClientRectSpy);
      sinon.assert.notCalled(toggleAttributeSpy);

      triggerScrollEvent(clock);
      sinon.assert.called(getComputedStyleSpy);
      sinon.assert.called(getBoundingClientRectSpy);
      sinon.assert.called(toggleAttributeSpy);
      sinon.assert.calledWith(toggleAttributeSpy, "stuck", true);

      // try not equal values. getComputedStyle().top will keep returning "22px"
      // but now getBoundingClientRect().top will return 20!
      getBoundingClientRectSpy.callsFake(() => ({ top: 20 }));

      triggerScrollEvent(clock);
      sinon.assert.calledWith(toggleAttributeSpy, "stuck", false);
    });

    it("will toggle 'js-nav-*' class name based on scroll direction", () => {
      const eventsListing = document.querySelector(".m-events-hub");
      getBoundingClientRectSpy.callsFake(() => ({ height: 10 }));

      // mock window.Y for this test with initial scroll position
      global.window = Object.assign(global.window, {
        scrollY: 222
      });
      setupEventsListing();
      assert.isFalse(eventsListing.classList.contains("js-nav-up"));
      assert.isFalse(eventsListing.classList.contains("js-nav-down"));

      // mock scroll up
      global.window = Object.assign(global.window, {
        scrollY: 20
      });
      triggerScrollEvent(clock);
      assert.isTrue(eventsListing.classList.contains("js-nav-up"));
      assert.isFalse(eventsListing.classList.contains("js-nav-down"));

      // mock scroll down
      global.window = Object.assign(global.window, {
        scrollY: 442
      });
      triggerScrollEvent(clock);
      assert.isTrue(eventsListing.classList.contains("js-nav-down"));
      assert.isFalse(eventsListing.classList.contains("js-nav-up"));
    });
  });

  it("scrolls to .m-event-list__month--active", () => {
    sinon.assert.notCalled(scrollIntoViewSpy);

    const activeMonth = $("section.m-event-list__month--active");
    assert.isOk(activeMonth);
    assert.equal(activeMonth.length, 1);

    setupEventsListing();

    sinon.assert.calledOnce(scrollIntoViewSpy);
  });

  it("navigates when .m-event-list__select changes", () => {
    setupEventsListing();

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

describe("setupEventPopups", () => {
  let $;

  jsdom({ url: testURL });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    $("body").append("<div id=test />");
    $("#test").html(eventsHubCalendarViewHTML);
  });

  afterEach(() => {
    $("#test").remove();
  });

  it("displays an overlay for the clicked event", () => {
    setupEventPopups();

    // display overlay
    $(".m-event-calendar__event").trigger("click");

    const overlayDiv = document.getElementById("5304");

    // attribute "aria-hidden" should be null since the overlay is being shown
    expect(!!overlayDiv.getAttribute("aria-hidden")).to.equal(false);
  });

  it("closes the overlay for the clicked event", () => {
    setupEventPopups();

    // display overlay
    $(".m-event-calendar__event").trigger("click");

    // now close overlay
    $("[aria-label='Close dialog']").trigger("click");

    const overlayDiv = document.getElementById("5304");

    // "aria-hidden" should be true since the overlay should not be shown at this point
    expect(!!overlayDiv.getAttribute("aria-hidden")).to.equal(true);
  });
});

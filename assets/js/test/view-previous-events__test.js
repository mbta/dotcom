import { assert } from "chai";
import jsdom from "mocha-jsdom";
import { setupViewPreviousEventsButton } from "../view-previous-events";
import testConfig from "../../ts/jest.config";

const { testURL } = testConfig;

const endedEventContent = `
  <div class="m-event__date-circle">
    <div class="font-bold m-event__month">Month</div>
    <div class="font-bold m-event__day">Day</div>
  </div>
  <div class="u-flex-one">
    <div class="m-event__date-range">Date Range</div>
    <div class="m-event__title">
      <a href="/events/link">Title</a>
    </div>
  </div>
  <div>
      <div class="m-event__ended-message">Ended</div>
  </div>
`;
const pendingEventContent = `
  <div class="m-event__date-circle">
    <div class="font-bold m-event__month">Mon</div>
    <div class="font-bold m-event__day">Day</div>
  </div>
  <div class="u-flex-one">
    <div class="m-event__date-range">Date Range</div>
    <div class="m-event__title">
      <a href="/events/link">Meeting Title</a>
    </div>
  </div>
  <div>
    <a href="/events/icalendar/">
      <div class="btn btn-secondary m-event__calendar-add">
        <i aria-hidden="true" class="notranslate fa fa-calendar-plus-o "></i>                    <span class="m-event__add-text">Add</span>
      </div>
    </a>
  </div>
`;

const eventListHtml = `
  <div>
    <section id="1-2021" class="m-event-list__month">
      <button class="c-expandable-block__link sticky-top" data-target="#panel-1" tabindex="0" id="header-1" aria-expanded="true" aria-controls="panel-1" data-toggle="collapse">
        <h2 class="m-event-list__month-header">
          January 2021<span class="c-expandable-block-caret"></span>
        </h2>
      </button>
      <div class="collapse in js-focus-on-expand" tabindex="0" role="region" id="panel-1" aria-labelledby="header-1">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <a tabindex="0" role="button" class="m-previous-events-button" data-group="january-2021">
              View Previous January 2021 Events
              <i class="fa fa-angle-down down" aria-hidden="true"></i>
            </a>
          </li>
          ${[1, 2]
            .map(
              () => `
              <li class="list-group-item u-flex-container m-event hidden" data-group="january-2021">
                ${endedEventContent}
              </li>
            `
            )
            .join("")}
        </ul>
      </div>
    </section>
    <section id="2-2021" class="m-event-list__month m-event-list__month--active">
      <button class="c-expandable-block__link sticky-top" data-target="#panel-1" tabindex="0" id="header-1" aria-expanded="true" aria-controls="panel-1" data-toggle="collapse">
        <h2 class="m-event-list__month-header">
          February 2021<span class="c-expandable-block-caret"></span>
        </h2>
      </button>
      <div class="collapse in js-focus-on-expand" tabindex="0" role="region" id="panel-2" aria-labelledby="header-2">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <a role="button" class="m-previous-events-button" data-group="february-2021">
              View Previous February 2021 Events
              <i class="fa fa-angle-down down" aria-hidden="true"></i>
            </a>
          </li>
          ${[3, 4]
            .map(
              () => `
              <li class="list-group-item u-flex-container m-event hidden" data-group="february-2021">
                ${endedEventContent}
              </li>
            `
            )
            .join("")}
          <li class="list-group-item u-flex-container m-event " data-group="march-2021">
            ${pendingEventContent}
          </li>
        </ul>
      </div>
    </section>
  </div>
`;

describe("previous-events-button", () => {
  let $;
  jsdom({ url: testURL });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    $("body").html(eventListHtml);
    setupViewPreviousEventsButton();
  });

  it("clicking 'previous-button' for Jan affects Jan, not Feb", () => {
    const januaryButton = $("a.m-previous-events-button")[0];
    const februaryButton = $("a.m-previous-events-button")[1];
    const firstJanuaryEvent = $(".m-event")[0];
    const firstFebruaryEvent = $(".m-event")[2];
    const pendingFebEvent = $(".m-event")[4];

    januaryButton.click();

    // Parent element of clicked button is now hidden
    assert.isTrue(januaryButton.parentElement.classList.contains("hidden"));
    assert.isFalse(februaryButton.parentElement.classList.contains("hidden"));

    // Originally hidden January event is visible
    assert.isFalse(firstJanuaryEvent.classList.contains("hidden"));
    assert.isTrue(firstFebruaryEvent.classList.contains("hidden"));
    assert.isFalse(pendingFebEvent.classList.contains("hidden"));
  });
});

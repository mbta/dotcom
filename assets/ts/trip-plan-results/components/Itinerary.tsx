import React, { ReactElement, useEffect } from "react";
import Accordion, { AccordionNoJS } from "../../components/Accordion";
import { Itinerary } from "./TripPlannerResults";
import Map from "../../leaflet/components/Map";
import {
  addAlertItemEventHandlers,
  removeAlertItemEventHandlers
} from "../../../js/alert-item";
import FeedbackForm from "../../components/FeedbackForm";

/*
The following ignored functions are vanilla JS event handlers
that are for HTML that gets injected into itinerary rows.
Ideally, all the HTML of this component would be built in React
which would make it easy to test in this file. Since that HTML is
server rendered and injected, it is difficult to test from jest.
It is being ignored now to prevent a codecov ding.
*/

/* istanbul ignore next */
const toggleTextContent = (e: Event): void => {
  if ((e.target! as HTMLElement).textContent!.trim() === "(view alert)") {
    (e.target! as HTMLElement).textContent = "(hide alert)";
  } else {
    (e.target! as HTMLElement).textContent = "(view alert)";
  }
};

/* istanbul ignore next */
export const addToggleAlertHandlers = (): void => {
  Array.from(document.querySelectorAll(`.js-trip-plan-alert-toggle`)).forEach(
    elem => {
      elem.addEventListener("click", toggleTextContent);
    }
  );
};

/* istanbul ignore next */
export const removeToggleAlertHandlers = (): void => {
  Array.from(document.querySelectorAll(`.js-trip-plan-alert-toggle`)).forEach(
    elem => {
      elem.removeEventListener("click", toggleTextContent);
    }
  );
};

interface Props {
  itinerary: Itinerary;
  feedbackCallback: (formData: Record<string, string>) => void;
}

const ItineraryBody = (itinerary: Itinerary): ReactElement<HTMLElement> => {
  useEffect(() => {
    addAlertItemEventHandlers();
    addToggleAlertHandlers();
    /* istanbul ignore next */
    return () => {
      removeAlertItemEventHandlers();
      removeToggleAlertHandlers();
    };
  }, []);

  return (
    <div className="m-trip-plan-results__itinerary-body">
      <div className="trip-plan-map map">
        <Map mapData={itinerary.map} boundsByMarkers />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: itinerary.html }} // eslint-disable-line react/no-danger
      />
    </div>
  );
};

const ItineraryAccordion = ({
  itinerary,
  feedbackCallback
}: Props): ReactElement<HTMLElement> => (
  <div className="m-trip-plan-results__itinerary">
    <div className="m-trip-plan-results__itinerary-header">
      {itinerary.tag && (
        <div className="m-trip-plan-results__itinerary-tag u-small-caps">
          {itinerary.tag}
        </div>
      )}
      <div className="m-trip-plan-results__itinerary-header-content">
        <div
          className="m-trip-plan-results__itinerary-summary"
          dangerouslySetInnerHTML={{ __html: itinerary.tab_html }} // eslint-disable-line react/no-danger
        />
        <div
          className="m-trip-plan-results__itinerary-accessible"
          dangerouslySetInnerHTML={{ __html: itinerary.access_html }} // eslint-disable-line react/no-danger
        />
      </div>
      <div
        className="m-trip-plan-results__itinerary-fares"
        dangerouslySetInnerHTML={{ __html: itinerary.fares_estimate_html }} // eslint-disable-line react/no-danger
      />
      <div style={{ gridColumn: "1 / -1" }}>
        <hr />
        <FeedbackForm
          promptText="Is this trip plan helpful?"
          upLabel="Yes, it is helpful"
          downLabel="No, it is not helpful"
          commentPromptText="Share more details"
          commentLabel="Why is this trip plan not helpful?"
          commentPlaceholder="Ex. too many transfers, would take too long, etc."
          formDataCallback={feedbackCallback}
        />
      </div>
    </div>
    <Accordion
      id={`itinerary-${itinerary.id}`}
      title={{
        collapsed: "Show map and trip details",
        expanded: "Hide map and trip details"
      }}
    >
      <ItineraryBody {...itinerary} />
    </Accordion>
    <noscript>
      <AccordionNoJS id={`itinerary-${itinerary.id}`}>
        <ItineraryBody {...itinerary} />
      </AccordionNoJS>
    </noscript>

    <Accordion
      id={`itinerary-${itinerary.id}-fare-calculator`}
      title={{
        collapsed: "Show fare calculator",
        expanded: "Hide fare calculator"
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: itinerary.fare_calculator_html }} // eslint-disable-line react/no-danger
      />
    </Accordion>
    <noscript>
      <AccordionNoJS id={`itinerary-${itinerary.id}-fare-calculator`}>
        <div
          dangerouslySetInnerHTML={{ __html: itinerary.fare_calculator_html }} // eslint-disable-line react/no-danger
        />
      </AccordionNoJS>
    </noscript>
  </div>
);

export default ItineraryAccordion;

import React, { ReactElement, useEffect } from "react";
import { Itinerary } from "./TripPlannerResults";
import Map from "../../leaflet/components/Map";
import ExpandableBlock from "../../components/ExpandableBlock";
import {
  addAlertItemEventHandlers,
  removeAlertItemEventHandlers
} from "../../../js/alert-item";

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
  itinerary
}: Props): ReactElement<HTMLElement> => (
  <div className="m-trip-plan-results__itinerary-container">
    <div
      className="itinerary-accessible"
      dangerouslySetInnerHTML={{ __html: itinerary.access_html }} // eslint-disable-line react/no-danger
    />
    <ExpandableBlock
      id={`itinerary-${itinerary.id}`}
      header={{
        iconSvgText: null,
        text: (
          <div
            className="m-trip-plan-results__itinerary-summary"
            dangerouslySetInnerHTML={{ __html: itinerary.tab_html }} // eslint-disable-line react/no-danger
          />
        )
      }}
      initiallyExpanded={false}
    >
      <ItineraryBody {...itinerary} />
    </ExpandableBlock>
  </div>
);

export default ItineraryAccordion;

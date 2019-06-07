import React, { ReactElement, useEffect } from "react";
import { Itinerary } from "./TripPlannerResults";
import Map from "../../leaflet/components/Map";
import ExpandableBlock from "../../components/ExpandableBlock";
import {
  addAlertItemEventHandlers,
  removeAlertItemEventHandlers
} from "../../../js/alert-item";
import {
  addToggleAlertHandlers,
  removeToggleAlertHandlers
} from "../../../js/trip-planner-results";

interface Props {
  itinerary: Itinerary;
}

const ItineraryBody = (itinerary: Itinerary) => {
  useEffect(() => {
    addAlertItemEventHandlers();
    addToggleAlertHandlers();
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

import React, { ReactElement } from "react";
import { Itinerary } from "./TripPlannerResults";
import Map from "../../leaflet/components/Map";
import ExpandableBlock from "../../components/ExpandableBlock";

interface Props {
  itinerary: Itinerary;
}
const ItineraryAccordion = ({
  itinerary
}: Props): ReactElement<HTMLElement> => (
  <div className="m-trip-plan-itinerary-container">
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
            className="m-trip-plan-itinerary-summary"
            dangerouslySetInnerHTML={{ __html: itinerary.tab_html }} // eslint-disable-line react/no-danger
          />
        )
      }}
      initiallyExpanded={false}
    >
      <div className="m-trip-plan-itinerary-body">
        <div className="trip-plan-map map">
          <Map mapData={itinerary.map} boundsByMarkers />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: itinerary.html }} // eslint-disable-line react/no-danger
        />
      </div>
    </ExpandableBlock>
  </div>
);

export default ItineraryAccordion;

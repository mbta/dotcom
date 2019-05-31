import React, { ReactElement } from "react";
import { Itinerary } from "./TripPlannerResults";
import Map from "../../leaflet/components/Map";
import ExpandableBlock from "../../components/ExpandableBlock";

interface Props {
  itinerary: Itinerary;
}
const Itinerary = ({ itinerary }: Props): ReactElement<HTMLElement> => {
  return (
    <div className="m-trip-plan-itinerary-container">
      <div
        className="itinerary-accessible"
        dangerouslySetInnerHTML={{ __html: itinerary.access_html }}
      />
      <ExpandableBlock
        id={`itinerary-${itinerary.id}`}
        header={{
          iconSvgText: null,
          text: (
            <div
              className="m-trip-plan-itinerary-summary"
              dangerouslySetInnerHTML={{ __html: itinerary.tab_html }}
            />
          )
        }}
        initiallyExpanded={false}
      >
        <div className="m-trip-plan-itinerary-body">
          <div className="trip-plan-map map">
            <Map
              mapData={itinerary.map}
              boundsByMarkers
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: itinerary.html }} />
        </div>
      </ExpandableBlock>
    </div>
  );
};

export default Itinerary;

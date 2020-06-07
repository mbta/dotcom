import React, { ReactElement } from "react";
import { MapData } from "../../leaflet/components/__mapdata";
import Itinerary from "./Itinerary";

export interface Itinerary {
  id: number;
  html: string;
  // eslint-disable-next-line
  map: MapData;
  tab_html: string;
  access_html: string;
  fares_estimate_html: string;
  fare_calculator_html: string;
}

interface Props {
  // eslint-disable-next-line
  itineraryData: Itinerary[];
}

const TripPlannerResults = ({
  itineraryData
}: Props): ReactElement<HTMLElement> => (
  <>
    {itineraryData.map(itinerary => (
      <Itinerary key={itinerary.id} itinerary={itinerary} />
    ))}
  </>
);

export default TripPlannerResults;

import React, { ReactElement } from "react";
import { MapData } from "../../leaflet/components/__mapdata";
import Itinerary from "./Itinerary";

export interface Itinerary {
  id: number;
  html: string;
  tag: string | null;
  // eslint-disable-next-line
  map: MapData;
  tab_html: string;
  access_html: string;
  fares_estimate_html: string;
  fare_calculator_html: string;
}

interface Props {
  itineraryData: Itinerary[];
  metadata: Record<string, unknown>;
}

function recordResponse(
  formData: Record<string, string>,
  metadata: Record<string, unknown>,
  id: number
): void {
  const data = Object.assign({ itinerary_index: id }, metadata, formData);
  const method = formData.feedback_vote === "" ? "DELETE" : "POST";
  fetch("/trip-planner/feedback", {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

const TripPlannerResults = ({
  itineraryData,
  metadata
}: Props): ReactElement<HTMLElement> => (
  <>
    {itineraryData.map(itinerary => (
      <Itinerary
        key={itinerary.id}
        itinerary={itinerary}
        feedbackCallback={formData => {
          recordResponse(formData, metadata, itinerary.id);
        }}
      />
    ))}
  </>
);

export default TripPlannerResults;

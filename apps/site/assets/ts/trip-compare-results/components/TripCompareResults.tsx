import React, { ReactElement, useState } from "react";
import TripPlannerResults, { Itinerary } from "./TripPlannerResults";


interface Props {
  // eslint-disable-next-line
  itineraryData: Itinerary[],
  itineraryHeader: string;
}

const TripCompareResults = ({
  itineraryData,
  itineraryHeader
}: Props): ReactElement<HTMLElement> => {
    const [source, setSource] = useState("NEW");

    let filteredData = itineraryData.filter(i => i.source == source);
    let classRedesigned = source !== "NEW" ? "m-alerts__mode-button" : "m-alerts__mode-button m-alerts__mode-button--selected";
    let classCurrent = source === "NEW" ? "m-alerts__mode-button" : "m-alerts__mode-button m-alerts__mode-button--selected";

    return (
      <>
        <div>
          <div className="m-alerts__mode-buttons">
            <a className="m-alerts__mode-button-container" role="button">
              <div className={classRedesigned} onClick={() => setSource("NEW")}>
                <div className="m-alerts__mode-button-name">Redesigned</div>
              </div>
            </a>
            <a className="m-alerts__mode-button-container" role="button">
              <div className={classCurrent} onClick={() => setSource("CURRENT")}>
                <div className="m-alerts__mode-button-name">Current</div>
              </div>
            </a>
          </div>
          <p className={`no-trips page-section`}>
            We found {filteredData.length} trips for you
          </p>
          <p className={`instructions page-section`}>{itineraryHeader}</p>
          <p className={`instructions page-section`}>
            <b>Note:</b> the following trips only reflect normal service (i.e. do not reflect 
            current service, does not include service alert info)
          </p>
          <TripPlannerResults itineraryData={filteredData} />
        </div>
      </>
    );
  };

export default TripCompareResults;

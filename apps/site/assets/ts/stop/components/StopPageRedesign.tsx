import React, { ReactElement } from "react";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  return (
    <div>
      {/* Title Bar Div */}
      <div>
        <h1>{stopId}</h1>
      </div>
      {/* Route and Map Div */}
      <div className="d-flex">
        <div>
          <div>Route schedules & maps / Upcoming Trips PLACEHOLDER</div>
          <div>Filter Pills PLACEHOLDER</div>
          <div>List PLACEHOLDER</div>
          <button>Plan your Trip PLACEHOLDER</button>
        </div>
        <div className="hidden-sm-down">
          Map PLACEHOLDER Imageine a pretty map
        </div>
      </div>
      {/* Station Information Div */}
      <div>
        <div>Station information PLACEHOLDER</div>
        <div>Station Address PLACEHOLDER</div>
        <div>Station Status Blocks PLACEHOLDER</div>
      </div>
    </div>
  );
};

export default StopPageRedesign;

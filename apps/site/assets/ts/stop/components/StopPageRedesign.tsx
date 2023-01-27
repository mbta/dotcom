import React, { ReactElement } from "react";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  return (
    <div>
      {/* Title Bar Div */}
      <div className="d-flex justify-content-space-between">
        <div>
          <h1>{stopId}</h1>
          {/* ICONS GO HERE */}
        </div>
        <div style={{ marginTop: "3.075rem" }}>
          Zone Information PLACEHOLDER
        </div>
      </div>
      {/* Route and Map Div */}
      <div className="d-flex">
        <div style={{ minWidth: "50%" }}>
          <div>Route schedules & maps / Upcoming Trips PLACEHOLDER</div>
          <div>Filter Pills PLACEHOLDER</div>
          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            <div className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </div>
          </div>
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

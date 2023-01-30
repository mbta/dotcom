import React, { ReactElement } from "react";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  return (
    <article>
      {/* Title Bar Div */}
      <header className="d-flex justify-content-space-between">
        <div>
          <h1>{stopId}</h1>
          {/* ICONS GO HERE */}
        </div>
        <div style={{ marginTop: "3.075rem" }}>
          Zone Information PLACEHOLDER
        </div>
      </header>
      {/* Route and Map Div */}
      <div className="d-flex">
        <div style={{ minWidth: "50%" }}>
          <div>Route schedules & maps / Upcoming Trips PLACEHOLDER</div>
          <div>Filter Pills PLACEHOLDER</div>
          <ul style={{ maxHeight: "250px", overflowY: "auto" }}>
            <li className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </li>
            <li className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </li>
            <li className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </li>
            <li className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </li>
            <li className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </li>
            <li className="d-flex">
              <div className="me-8">210</div>
              <div>
                <div>Fields Corner</div>
                <div className="d-flex">
                  <div>Open Schedule</div>
                  <div>View Realtime Map</div>
                </div>
              </div>
            </li>
          </ul>
          <button>Plan your Trip PLACEHOLDER</button>
        </div>
        <div className="hidden-sm-down">
          Map PLACEHOLDER Imageine a pretty map
        </div>
      </div>
      {/* Station Information Div */}
      <footer>
        <div>Station information PLACEHOLDER</div>
        <div>Station Address PLACEHOLDER</div>
        <div>Station Status Blocks PLACEHOLDER</div>
      </footer>
    </article>
  );
};

export default StopPageRedesign;

import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import { polygonContains } from "d3-polygon";
import Map from "../../leaflet/components/Map";
import precinctsData from "../../../static/data/precincts.json";

/* eslint-disable arrow-body-style */

const VoteMap = (): ReactElement<HTMLElement> => {
  const [fromLocation, setFromLocation] = React.useState<null | {
    address: string;
    latitude: number;
    longitude: number;
  }>(null);
  // @ts-ignore data conversion
  const precincts = precinctsData as {
    town: string;
    address: string;
    formatted_address: string;
    ward: string;
    name: string;
    precinct: string;
    lat: number;
    lng: number;
    path: [[number, number][]];
  }[];
  const [portalEl, setPortalEl] = React.useState<null | HTMLDivElement>();
  const precinct = React.useMemo(() => {
    return (
      fromLocation &&
      precincts.find(x => {
        return x.path.some(y =>
          polygonContains(y, [fromLocation.longitude, fromLocation.latitude])
        );
      })
    );
  }, [fromLocation, precincts]);
  React.useEffect(() => {
    document.addEventListener("vote:update-from", e => {
      // @ts-ignore
      setFromLocation(e.detail);
    });
    const el = document.createElement("div");
    const root = document.getElementById("results-portal");
    if (root) {
      while (root.firstChild) {
        root.removeChild(root.firstChild);
      }
      root.appendChild(el);
    }
    setPortalEl(el);
  }, [setPortalEl]);
  return (
    <div>
      {fromLocation &&
        portalEl &&
        ReactDOM.createPortal(
          precinct ? (
            <div style={{ marginTop: 20 }}>
              <h5 className="c-search-bar__header">Your polling location</h5>
              <div>{precinct.name}</div>
              <div>{precinct.address}</div>
              <div>{precinct.town}</div>
              <div>{`${
                precinct.ward ? `Ward: ${precinct.ward}, ` : ""
              }Precinct: ${precinct.precinct}`}</div>
              <a
                href={`/trip-planner?_utf8=✓&plan[from]=${encodeURIComponent(
                  fromLocation.address
                )}&plan[from_latitude]=${
                  fromLocation.latitude
                }&plan[from_longitude]=${
                  fromLocation.longitude
                }&plan[to]=${encodeURIComponent(
                  precinct.formatted_address
                )}&plan[to_latitude]=${precinct.lat}&plan[to_longitude]=${
                  precinct.lng
                }&plan[time]=depart&plan[modes][subway]=true&plan[modes][commuter_rail]=true&plan[modes][bus]=true&plan[modes][ferry]=true`}
              >
                <button
                  type="button"
                  style={{ marginTop: 20, width: "100%" }}
                  className="btn btn-primary"
                >
                  Plan a trip
                </button>
              </a>
            </div>
          ) : (
            <div>
              <p>
                We’re sorry, we are unable to find the polling place for that
                address.
              </p>
              <p>
                If you are registered to vote in MA, you can&nbsp;
                <a href="https://www.sec.state.ma.us/WhereDoIVoteMA/bal/MyElectionInfo.aspx">
                  find your polling place on the Secretary of the Commonwealth’s
                  website.
                </a>
              </p>
            </div>
          ),
          portalEl
        )}
      <div style={{ height: 800 }}>
        <Map
          mapData={{
            default_center: { longitude: -71.05891, latitude: 42.360718 },
            height: 250,
            markers: precinct
              ? [
                  {
                    icon: "map-pin",
                    id: `${precinct.lng}-${precinct.lat}`,
                    longitude: precinct.lng,
                    latitude: precinct.lat,
                    rotation_angle: 0,
                    tooltip: null
                  }
                ]
              : [],
            polylines: [],
            tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com",
            width: 735,
            zoom: 15
          }}
        />
      </div>
    </div>
  );
};

export default VoteMap;

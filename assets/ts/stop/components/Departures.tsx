import React, { ReactElement, useState } from "react";
import { Stop, Mode, Alert } from "../../__v3api";
import { Dispatch, clickModeAction } from "../state";
import { TypedRoutes, RouteWithDirections } from "./__stop";
import RouteCard from "./RouteCard";
import { ModeFilter, modeByV3ModeType } from "../../components/ModeFilter";

interface Props {
  routes: TypedRoutes[];
  routesAndAlerts?: { [key: string]: Alert[] };
  stop: Stop;
  selectedModes: Mode[];
  dispatch: Dispatch;
}

const includesMultipleModes = (typedRoutes: TypedRoutes[]): boolean =>
  typedRoutes.length > 1;

const allRoutes = (typedRoutes: TypedRoutes[]): RouteWithDirections[] =>
  typedRoutes.reduce(
    (acc: RouteWithDirections[], typeAndRoutes: TypedRoutes) =>
      acc.concat(typeAndRoutes.routes),
    []
  );

const availableModes = (typedRoutes: TypedRoutes[]): string[] =>
  // eslint-disable-next-line camelcase
  typedRoutes.map(({ group_name }) => group_name);

const filteredByModes = (
  routes: RouteWithDirections[],
  modes: Mode[]
): RouteWithDirections[] => {
  // If there are no selections or all selections, do not filter
  if (modes.length === 0 || modes.length === 3) return routes;

  return routes.filter(route =>
    modes.some(mode => modeByV3ModeType[route.route.type] === mode)
  );
};

// Only return the first 2 routes for small screens, or all of them if there are filters, showMore
const filterForSmallScreen = (
  routes: RouteWithDirections[],
  modes: Mode[],
  allRoutesShown: boolean
): RouteWithDirections[] => {
  if (modes.length > 0 || allRoutesShown) {
    return routes;
  }
  return routes.slice(0, 2);
};

const Departures = ({
  routes,
  routesAndAlerts,
  stop,
  selectedModes,
  dispatch
}: Props): ReactElement<HTMLElement> => {
  const [allRoutesShown, setAllRoutesShown] = useState<boolean>(false);
  const isModeSelected = (mode: Mode): boolean => selectedModes.includes(mode);

  const handleModeClick = (mode: Mode): void => dispatch(clickModeAction(mode));

  const filteredRoutes = filteredByModes(allRoutes(routes), selectedModes);
  // Only show the first 2 elements of the array (unless filtered or button clicked)
  const shortFilteredRoutes = filterForSmallScreen(
    filteredRoutes,
    selectedModes,
    allRoutesShown
  );

  const displayShowMoreButton = (
    allRoutesBoolean: boolean,
    modes: Mode[],
    routesArray: RouteWithDirections[]
  ): boolean => {
    return !allRoutesBoolean && modes.length === 0 && routesArray.length > 2;
  };

  return (
    <div id="route-card-list">
      <h2>Departures</h2>

      <div className="m-stop-page__departures">
        {includesMultipleModes(routes) && (
          <ModeFilter
            isModeSelected={isModeSelected}
            onModeClickAction={handleModeClick}
            modeButtonsToShow={availableModes(routes)}
          />
        )}
        <div className="hidden-sm-down mt-8">
          {filteredRoutes.map(routeWithDirections => (
            <RouteCard
              key={routeWithDirections.route.id}
              route={routeWithDirections.route}
              directions={routeWithDirections.directions}
              stop={stop}
              alerts={
                routesAndAlerts
                  ? routesAndAlerts[routeWithDirections.route.id]
                  : []
              }
            />
          ))}
        </div>
        <div className="hidden-md-up mt-8">
          {/* This should only show on small screens */}
          {shortFilteredRoutes.map(routeWithDirections => (
            <RouteCard
              key={routeWithDirections.route.id}
              route={routeWithDirections.route}
              directions={routeWithDirections.directions}
              stop={stop}
              alerts={
                routesAndAlerts
                  ? routesAndAlerts[routeWithDirections.route.id]
                  : []
              }
            />
          ))}
          {displayShowMoreButton(
            allRoutesShown,
            selectedModes,
            filteredRoutes
          ) && (
            <button
              className="btn btn-block mt-10 btn-secondary"
              onClick={() => setAllRoutesShown(true)}
              type="button"
            >
              Show {filteredRoutes.length - 2} more routes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Departures;

import React, { ReactElement } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { DirectionId, DirectionInfo, Route } from "../../../__v3api";
import { SimpleStopMap, SelectedOrigin } from "../__schedule";
import icon from "../../../../../priv/static/icon-svg/icon-schedule-finder.svg";
import renderSvg from "../../../helpers/render-svg";
import SelectContainer from "./SelectContainer";
import { routeToModeName } from "../../../helpers/css";

const validDirections = (directionInfo: DirectionInfo): DirectionId[] =>
  ([0, 1] as DirectionId[]).filter(dir => directionInfo[dir] !== null);

interface Props {
  onDirectionChange: (direction: DirectionId, dispatch: Dispatch) => void;
  onOriginChange: (origin: SelectedOrigin, dispatch: Dispatch) => void;
  route: Route;
  selectedDirection: DirectionId;
  selectedOrigin: SelectedOrigin;
  stopsByDirection: SimpleStopMap;
}

const ScheduleFinderForm = ({
  onDirectionChange,
  onOriginChange,
  route,
  selectedDirection,
  selectedOrigin,
  stopsByDirection
}: Props): ReactElement => {
  const {
    direction_names: directionNames,
    direction_destinations: directionDestinations
  } = route;

  const dispatch = useDispatch();

  const directionNameForId = (
    direction: DirectionId
  ): string => `${directionNames[direction]!.toUpperCase()} 
  ${directionDestinations[direction]!}`;

  const isFerryRoute = routeToModeName(route) === "ferry";
  return (
    <>
      <form action="/departures/" method="get">
        <input type="hidden" name="route_id" value={route.id || ""} />
        <h2 className="schedule-finder__heading">
          {renderSvg("c-svg__icon", icon, true)} Schedule Finder
        </h2>
        <div className="schedule-finder__prompt">
          {isFerryRoute
            ? `Get schedule information for your next ${route.name} trip.`
            : "Choose a stop to get schedule information and real-time departure predictions."}
        </div>

        <div className="schedule-finder__inputs">
          <label className="schedule-finder__label">
            Choose a direction
            <SelectContainer>
              <select
                data-testid="schedule-finder-direction-select"
                className="c-select-custom notranslate"
                value={selectedDirection}
                name="direction_id"
                onChange={e =>
                  onDirectionChange(
                    parseInt(e.target.value, 10) as DirectionId,
                    dispatch
                  )
                }
              >
                {validDirections(directionNames).map(direction => (
                  <option
                    key={direction}
                    value={direction}
                    aria-label={directionNameForId(direction)}
                  >
                    {directionNameForId(direction)}
                  </option>
                ))}
              </select>
            </SelectContainer>
          </label>

          <label className="schedule-finder__label">
            Choose an origin stop
            <SelectContainer>
              <select
                name="stop_id"
                data-testid="schedule-finder-origin-select"
                className="c-select-custom notranslate"
                value={selectedOrigin || ""}
                onChange={e => onOriginChange(e.target.value || null, dispatch)}
              >
                <option value="">Select</option>
                {stopsByDirection[selectedDirection].map(({ id, name }) => (
                  <option key={id} value={id} aria-label={name}>
                    {name}
                  </option>
                ))}
              </select>
            </SelectContainer>
          </label>
        </div>

        <div className="schedule-finder__submit text-right">
          <input
            className="btn btn-primary"
            type="submit"
            value="Get schedules"
            disabled={!selectedOrigin}
          />
        </div>
      </form>
    </>
  );
};

export default ScheduleFinderForm;

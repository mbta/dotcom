import React, { ReactElement, useState, ChangeEvent } from "react";
import {
  EnhancedRoute,
  DirectionId,
  ServiceWithServiceDate
} from "../../__v3api";
import {
  SimpleStop,
  ServiceSchedule,
  SimpleStopMap,
  RoutePatternsByDirection
} from "./__schedule";
import { handleReactEnterKeyPress } from "../../helpers/keyboard-events";
import icon from "../../../static/images/icon-schedule-finder.svg";
import renderSvg from "../../helpers/render-svg";
import Modal from "../../components/Modal";
import SelectContainer from "./schedule-finder/SelectContainer";
import ErrorMessage from "./schedule-finder/ErrorMessage";
import OriginModalContent from "./schedule-finder/OriginModalContent";
import ScheduleModalContent from "./schedule-finder/ScheduleModalContent";

interface Props {
  services: ServiceWithServiceDate[];
  directionId: DirectionId;
  hideHeader?: boolean;
  route: EnhancedRoute;
  stops: SimpleStopMap;
  serviceSchedules: ServiceSchedule;
  routePatternsByDirection: RoutePatternsByDirection;
}

export type SelectedDirection = 0 | 1 | null;
export type SelectedOrigin = string | null;

interface State {
  directionError: boolean;
  modalId: string | null;
  modalOpen: boolean;
  originError: boolean;
  originSearch: string;
  selectedDirection: SelectedDirection;
  selectedOrigin: SelectedOrigin;
  selectedService: string | null;
}

const parseSelectedDirection = (value: string): SelectedDirection => {
  if (value === "0") return 0;
  return 1;
};

export const stopListOrder = (
  stops: SimpleStopMap,
  selectedDirection: SelectedDirection,
  directionId: DirectionId
): SimpleStop[] =>
  selectedDirection !== null ? stops[selectedDirection] : stops[directionId];

const ScheduleFinder = ({
  directionId,
  hideHeader,
  route,
  services,
  stops,
  routePatternsByDirection
}: Props): ReactElement<HTMLElement> => {
  console.log(JSON.stringify(routePatternsByDirection));
  const {
    direction_destinations: directionDestinations,
    direction_names: directionNames
  } = route;

  const [state, setState] = useState<State>({
    directionError: false,
    originError: false,
    originSearch: "",
    modalOpen: false,
    modalId: null,
    selectedDirection: null,
    selectedOrigin: null,
    selectedService: null
  });

  const handleUpdateOriginSearch = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setState({
      ...state,
      originSearch: event.target.value
    });
  };

  const handleSubmitForm = (): void => {
    if (state.selectedDirection === null || state.selectedOrigin === null) {
      setState({
        ...state,
        selectedOrigin: state.selectedOrigin,
        directionError: state.selectedDirection === null,
        originError: state.selectedOrigin === null
      });
      return;
    }

    setState({
      ...state,
      directionError: false,
      originError: false,
      modalId: "schedule",
      modalOpen: true
    });
  };

  const handleChangeDirection = (direction: SelectedDirection): void => {
    setState({ ...state, selectedDirection: direction, selectedOrigin: null });
  };

  const handleChangeOrigin = (
    origin: SelectedOrigin,
    autoSubmit: boolean
  ): void => {
    if (state.selectedDirection !== null && autoSubmit) {
      setState({
        ...state,
        selectedOrigin: origin,
        modalId: "schedule",
        directionError: false,
        originError: false
      });
    } else {
      setState({
        ...state,
        selectedOrigin: origin
      });
    }
  };

  const handleOriginSelectClick = (): void => {
    if (state.selectedDirection === null) {
      setState({
        ...state,
        directionError: true
      });
      return;
    }

    setState({
      ...state,
      modalOpen: true,
      modalId: "origin"
    });
  };

  return (
    <div className="schedule-finder">
      {hideHeader ? null : (
        <h2 className="h3 schedule-finder__heading">
          {renderSvg("c-svg__icon", icon)} Schedule Finder
        </h2>
      )}
      <ErrorMessage
        directionError={state.directionError}
        originError={state.originError}
      />
      <div>
        Choose a stop to get schedule information and real-time departure
        predictions.
      </div>
      <SelectContainer
        error={state.directionError}
        id="sf_direction_select_container"
      >
        <select
          id="sf_direction_select"
          className="schedule-finder__select"
          value={
            state.selectedDirection !== null ? state.selectedDirection : ""
          }
          onChange={e =>
            handleChangeDirection(
              e.target.value !== ""
                ? parseSelectedDirection(e.target.value)
                : null
            )
          }
          onKeyUp={e =>
            handleReactEnterKeyPress(e, () => {
              handleSubmitForm();
            })
          }
        >
          <option value="">Choose a direction</option>
          <option value="0">
            {directionNames[0].toUpperCase()} {directionDestinations[0]}
          </option>
          <option value="1">
            {directionNames[1].toUpperCase()} {directionDestinations[1]}
          </option>
        </select>
      </SelectContainer>
      <SelectContainer
        error={state.originError}
        handleClick={handleOriginSelectClick}
        id="sf_origin_select_container"
      >
        <select
          id="sf_origin_select"
          className="schedule-finder__select schedule-finder__select--noclick"
          value={state.selectedOrigin || ""}
          onChange={e =>
            handleChangeOrigin(e.target.value ? e.target.value : null, false)
          }
          onKeyUp={e =>
            handleReactEnterKeyPress(e, () => {
              handleSubmitForm();
            })
          }
        >
          <option value="">Choose an origin stop</option>
          {stopListOrder(stops, state.selectedDirection, directionId).map(
            ({ id, name }: SimpleStop) => (
              <option key={id} value={id}>
                {name}
              </option>
            )
          )}
        </select>
      </SelectContainer>
      <Modal
        openState={state.modalOpen}
        focusElementId={
          state.modalId === "origin" ? "origin-filter" : "modal-close"
        }
        ariaLabel={{
          label:
            state.modalId === "origin"
              ? "Choose Origin Stop"
              : "Choose Schedule"
        }}
        className={
          state.modalId === "origin" ? "schedule-finder__origin-modal" : ""
        }
        closeModal={() => {
          setState({
            ...state,
            modalOpen: false,
            modalId: null
          });
        }}
      >
        {() => (
          <>
            {state.modalId === "origin" && (
              <OriginModalContent
                selectedDirection={state.selectedDirection}
                selectedOrigin={state.selectedOrigin}
                originSearch={state.originSearch}
                stops={stops[state.selectedDirection!] || []}
                handleChangeOrigin={handleChangeOrigin}
                handleUpdateOriginSearch={handleUpdateOriginSearch}
                directionId={directionId}
              />
            )}
            {state.modalId === "schedule" && (
              <ScheduleModalContent
                route={route}
                selectedDirection={state.selectedDirection}
                selectedOrigin={state.selectedOrigin}
                services={services}
                stops={stops[state.selectedDirection!]}
                routePatternsByDirection={routePatternsByDirection}
              />
            )}
          </>
        )}
      </Modal>

      <div className="text-right">
        <input
          className="btn btn-primary"
          type="submit"
          value="Get schedules"
          onClick={handleSubmitForm}
        />
      </div>
    </div>
  );
};

export default ScheduleFinder;

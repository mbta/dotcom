import React, {
  ReactElement,
  ReactNode,
  SyntheticEvent,
  useState
} from "react";
import { Route, RouteType } from "../../__v3api";
import { SimpleStop } from "./__schedule";
import Modal from "../../components/Modal";
import { handleReactEnterKeyPress } from "../../helpers/keyboard-events";
import icon from "../../../static/images/icon-schedule-finder.svg";
import arrowIcon from "../../../static/images/icon-down-arrow.svg";
import checkIcon from "../../../static/images/icon-checkmark.svg";
import renderSvg from "../../helpers/render-svg";
import isSilverLine from "../../helpers/silver-line";

interface Props {
  route: Route;
  stops: SimpleStop[];
}

type SelectedDirection = 0 | 1 | null;
type SelectedOrigin = string | null;

interface State {
  directionError: boolean;
  originError: boolean;
  selectedDirection: SelectedDirection;
  selectedOrigin: SelectedOrigin;
  modalOpen: boolean;
}

interface SelectContainerProps {
  id: string;
  children: ReactNode;
  error: boolean;
  handleClick?: Function;
}

const SelectContainer = ({
  id,
  children,
  error,
  handleClick
}: SelectContainerProps): ReactElement<HTMLElement> => (
  <div
    id={id}
    tabIndex={0}
    className={`schedule-finder__select-container ${error ? "error" : ""}`}
    role="button"
    onClick={e => {
      if (handleClick) {
        handleClick(e);
      }
    }}
    onKeyUp={e =>
      handleReactEnterKeyPress(e, () => {
        if (handleClick) {
          handleClick(e);
        }
      })
    }
  >
    {children}
    {renderSvg("c-svg__icon schedule-finder__arrow", arrowIcon)}
  </div>
);

interface ErrorMessageProps {
  directionError: boolean;
  originError: boolean;
}

const ErrorMessage = ({
  directionError,
  originError
}: ErrorMessageProps): ReactElement<HTMLElement> | null => {
  if (!directionError && !originError) {
    return null;
  }

  let message = "an origin and destination";
  if (!directionError && originError) {
    message = "an origin";
  }
  if (directionError && !originError) {
    message = "a destination";
  }

  return (
    <div className="error-container">
      <span role="alert">Please provide {message}</span>
    </div>
  );
};

const routePill = (
  id: string,
  type: RouteType,
  name: string
): ReactElement<HTMLElement> | null =>
  type === 3 ? (
    <div className="m-route-pills">
      <div
        className={`h1 schedule-finder__modal-route-pill u-bg--${
          isSilverLine(id) ? "silver-line" : "bus"
        }`}
      >
        {name}
      </div>
    </div>
  ) : null;

const stopNameLink = (
  selectedOrigin: string,
  stops: SimpleStop[]
): ReactElement<HTMLElement> | null => {
  const stop = stops.find(({ id }) => id === selectedOrigin);
  return <a href={`/stops/${stop!.id}`}>{stop!.name}</a>;
};

const parseSelectedDirection = (value: string): 0 | 1 => {
  if (value === "0") return 0;
  return 1;
};

const stopListOrder = (
  stops: SimpleStop[],
  selectedDirection: SelectedDirection
): SimpleStop[] => {
  if (selectedDirection === 1) {
    return [...stops].reverse();
  }
  return stops;
};

interface OriginListItemProps {
  closeModal: Function;
  changeOrigin: Function;
  stop: SimpleStop;
  selectedOrigin: SelectedOrigin;
  lastStop: SimpleStop;
}

const OriginListItem = ({
  closeModal,
  changeOrigin,
  stop,
  selectedOrigin,
  lastStop
}: OriginListItemProps): ReactElement<HTMLElement> => {
  const isDisabled = stop.is_closed || stop.id === lastStop.id;
  const handleClick = (): void => {
    if (isDisabled) return;
    closeModal();
    changeOrigin(stop.id, true);
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className={`schedule-finder__origin-list-item ${
        stop.id === selectedOrigin ? "active" : ""
      } ${isDisabled ? "disabled" : ""}`}
      onClick={() => {
        handleClick();
      }}
      onKeyUp={e =>
        handleReactEnterKeyPress(e, () => {
          handleClick();
        })
      }
    >
      <div className="schedule-finder__origin-list-leftpad">
        {stop.id === selectedOrigin
          ? renderSvg("schedule-finder__check", checkIcon)
          : ""}{" "}
      </div>
      {stop.name}{" "}
      {stop.zone && (
        <span className="schedule-finder__zone">Zone {stop.zone}</span>
      )}
    </div>
  );
};

const ScheduleFinder = ({
  route: {
    id: routeId,
    direction_destinations: directionDestinations,
    direction_names: directionNames,
    name: routeName,
    type: routeType
  },
  stops
}: Props): ReactElement<HTMLElement> => {
  const submitButtonEl = React.useRef<HTMLInputElement>(null);

  const [state, setState] = useState<State>({
    selectedDirection: null,
    selectedOrigin: null,
    directionError: false,
    originError: false,
    modalOpen: false
  });

  console.log(state);

  const handleClickSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    const origin =
      state.selectedOrigin ||
      e.currentTarget.getAttribute("data-selected-origin");

    if (state.selectedDirection === null || origin === null) {
      e.stopPropagation(); // prevent modal from opening
      setState({
        ...state,
        selectedOrigin: origin,
        directionError: state.selectedDirection === null,
        originError: state.selectedOrigin === null
      });
      submitButtonEl!.current!.removeAttribute("data-selected-origin");
      return;
    }

    setState({
      ...state,
      directionError: false,
      originError: false,
      selectedOrigin: origin
    });
  };

  const handleChangeDirection = (direction: SelectedDirection): void => {
    setState({ ...state, selectedDirection: direction });
  };

  const handleChangeOrigin = (
    origin: SelectedOrigin,
    autoSubmit: boolean
  ): void => {
    if (state.selectedDirection !== null && autoSubmit) {
      // passing data through the ref to avoid multiple setState calls
      submitButtonEl!.current!.setAttribute("data-selected-origin", origin!);
      submitButtonEl!.current!.click();
    } else {
      setState({ ...state, selectedOrigin: origin });
    }
  };

  const handleOriginSelectClick = (e: React.MouseEvent): void => {
    console.log("clicked");
    // this prevents the modal from opening for keyboard user
    if (e.target instanceof HTMLSelectElement) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("A");
    // don't launch modal if direction not selected
    if (state.selectedDirection === null) {
      e.preventDefault();
      e.stopPropagation();
      setState({
        ...state,
        directionError: true
      });
    }
    console.log("B");
    setState({
      ...state,
      modalOpen: true
    });
  };

  return (
    <div className="schedule-finder">
      <h2 className="h3 schedule-finder__heading">
        {renderSvg("c-svg__icon", icon)} Schedule Finder
      </h2>
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
              submitButtonEl!.current!.click();
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
      <Modal
        openState={state.modalOpen}
        triggerElement={
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
                handleChangeOrigin(
                  e.target.value ? e.target.value : null,
                  false
                )
              }
              onKeyUp={e =>
                handleReactEnterKeyPress(e, () => {
                  submitButtonEl!.current!.click();
                })
              }
            >
              <option value="">Choose an origin stop</option>
              {stopListOrder(stops, state.selectedDirection).map(
                ({ id, name }: SimpleStop) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                )
              )}
            </select>
          </SelectContainer>
        }
        ariaLabel={{ label: "Choose Origin Stop" }}
        className="schedule-finder__origin-modal"
      >
        {({ closeModal }) => (
          <>
            <p className="schedule-finder__origin-text">
              Choose an origin stop
            </p>
            <div>
              {stopListOrder(stops, state.selectedDirection).map(
                (stop: SimpleStop) => (
                  <OriginListItem
                    key={stop.id}
                    stop={stop}
                    closeModal={closeModal}
                    changeOrigin={handleChangeOrigin}
                    selectedOrigin={state.selectedOrigin}
                    lastStop={
                      stopListOrder(stops, state.selectedDirection)[
                        stops.length - 1
                      ]
                    }
                  />
                )
              )}
            </div>
          </>
        )}
      </Modal>

      <div className="text-right">
        {/*
        <Modal
          triggerElement={
            <input
              ref={submitButtonEl}
              className="btn btn-primary"
              type="submit"
              value="Get schedules"
              onClick={handleClickSubmit}
            />
          }
          ariaLabel={{ label: "Schedules" }}
        >
          {() => (
            <>
              <div className="schedule-finder__modal-header">
                {routePill(routeId, routeType, routeName)}
                <div>
                  <div className="h3 u-small-caps" style={{ margin: 0 }}>
                    {state.selectedDirection === null
                      ? null
                      : directionNames[state.selectedDirection]}
                  </div>
                  <h2 className="h2" style={{ margin: 0 }}>
                    {state.selectedDirection === null
                      ? null
                      : directionDestinations[state.selectedDirection]}
                  </h2>
                </div>
              </div>
              <div>from {stopNameLink(state.selectedOrigin!, stops)}</div>
            </>
          )}
        </Modal>
                    */}
      </div>
    </div>
  );
};

export default ScheduleFinder;

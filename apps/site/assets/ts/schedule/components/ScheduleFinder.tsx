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
}

interface SelectContainerProps {
  children: ReactNode;
  error: boolean;
}

const SelectContainer = ({
  children,
  error
}: SelectContainerProps): ReactElement<HTMLElement> => (
  <div className={`schedule-finder__select-container ${error && "error"}`}>
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
  selectedOrigin: string | null,
  stops: SimpleStop[]
): ReactElement<HTMLElement> | null => {
  if (selectedOrigin === null) return null;
  const stop = stops.find(({ id }) => id === selectedOrigin);
  return <a href={`/stops/${stop!.id}`}>{stop!.name}</a>;
};

const parseSelectedDirection = (value: string): 0 | 1 | null => {
  if (value === "0") return 0;
  if (value === "1") return 1;
  return null;
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
    originError: false
  });

  const handleClickSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    if (state.selectedDirection === null || state.selectedOrigin === null) {
      e.stopPropagation(); // prevent modal from opening
      setState({
        ...state,
        directionError: state.selectedDirection === null,
        originError: state.selectedOrigin === null
      });
      return;
    }

    setState({ ...state, directionError: false, originError: false });
  };

  const handleChangeDirection = (direction: SelectedDirection): void => {
    setState({ ...state, selectedDirection: direction });
  };

  const handleChangeOrigin = (origin: SelectedOrigin): void => {
    setState({ ...state, selectedOrigin: origin });
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
      <SelectContainer error={state.directionError}>
        <select
          id="sf_direction_select"
          className="schedule-finder__select"
          onChange={e =>
            handleChangeDirection(
              e.target.value ? parseSelectedDirection(e.target.value) : null
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
      <SelectContainer error={state.originError}>
        <select
          id="sf_origin_select"
          className="schedule-finder__select"
          onChange={e =>
            handleChangeOrigin(e.target.value ? e.target.value : null)
          }
          onKeyUp={e =>
            handleReactEnterKeyPress(e, () => {
              submitButtonEl!.current!.click();
            })
          }
        >
          <option value="">Choose an origin stop</option>
          {stops.map(({ id, name }: SimpleStop) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </SelectContainer>

      <div className="text-right">
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
            <div>from {stopNameLink(state.selectedOrigin, stops)}</div>
          </>
        </Modal>
      </div>
    </div>
  );
};

export default ScheduleFinder;

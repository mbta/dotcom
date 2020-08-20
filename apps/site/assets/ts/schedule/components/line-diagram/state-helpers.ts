import { AnyAction, Reducer, Store, createStore } from "redux";
import { LineDiagramState, LineDiagramStateAction } from "./__line-diagram";
import { LineDiagramStop } from "../__schedule";

export type StopCoord = [number, number];
export interface CoordState {
  [key: string]: StopCoord | null;
}

export interface CoordAction extends AnyAction {
  stop: string;
  coords: StopCoord | null;
}

export const coordReducer: Reducer<CoordState, CoordAction> = (
  allCoordinates: CoordState | undefined,
  action: CoordAction
): CoordState => {
  const { stop, coords } = action;
  if (stop) {
    return {
      ...allCoordinates,
      [stop]: coords
    };
  }

  return allCoordinates || {};
};

export const createLineDiagramCoordStore = (
  lineDiagram: LineDiagramStop[]
): Store<CoordState, CoordAction> => {
  const initialCoordState = lineDiagram
    .map(ld => ld.route_stop.id)
    .reduce((o, s) => ({ ...o, [s]: null }), {});
  const store = createStore(
    coordReducer,
    initialCoordState,
    /* eslint-disable no-underscore-dangle, @typescript-eslint/no-explicit-any */
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    /* eslint-enable no-underscore-dangle, @typescript-eslint/no-explicit-any */
  );

  return store;
};

export const lineDiagramReducer = (
  state: LineDiagramState,
  action: LineDiagramStateAction
): LineDiagramState => {
  switch (action.type) {
    case "initialize":
      return {
        ...state,
        direction: action.direction,
        origin: action.origin,
        modalMode: "schedule",
        modalOpen: true
      };
    case "set_direction":
      return {
        ...state,
        direction: action.direction
      };
    case "set_origin":
      if (action.origin) {
        // back to schedule modal
        return {
          ...state,
          origin: action.origin,
          modalMode: "schedule"
        };
      }
      // origin modal (but don't overwrite current origin)
      return {
        ...state,
        modalMode: "origin"
      };
    case "toggle_modal":
      return {
        ...state,
        modalOpen: action.modalOpen
      };
    default:
      return state;
  }
};

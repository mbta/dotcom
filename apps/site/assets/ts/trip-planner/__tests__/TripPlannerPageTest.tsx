import React from "react";
import renderer, { act } from "react-test-renderer";
import {
  MapData,
  MapMarker as Marker
} from "../../leaflet/components/__mapdata";
import { createReactRoot } from "../../app/helpers/testUtils";
import TripPlannerPage, {
  Action,
  RemoveEvent,
  State,
  UpdateEvent,
  onRemove,
  onUpdate,
  reducer
} from "../components/TripPlannerPage";
const mapData: MapData = {
  default_center: { latitude: 0, longitude: 0 },
  height: 500,
  markers: [],
  polylines: [],
  tile_server_url: "",
  width: 630,
  zoom: 14
};

describe("TripPlannerPage", () => {
  it("renders", () => {
    createReactRoot();

    const tree = renderer
      .create(<TripPlannerPage mapData={mapData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("registers event listeners", () => {
    const cbHash: { [event: string]: Function } = {};
    document.addEventListener = (name: string, cb: EventListener) => {
      cbHash[name] = cb;
    };

    renderer.create(<TripPlannerPage mapData={mapData} />);

    expect(Object.keys(cbHash)).toEqual([
      "trip-plan:remove-marker",
      "trip-plan:update-marker"
    ]);

    const update = new Event("trip-plan:update-marker");
    const detail = {
      label: "A",
      latitude: 42.0,
      longitude: -71.0,
      title: "South Station"
    };
    const updateEvent: UpdateEvent = { ...update, detail };
    const updateCb = cbHash["trip-plan:update-marker"];
    act(() => {
      expect(() => updateCb(updateEvent)).not.toThrow();
    });

    const remove = new Event("trip-plan:remove-marker");
    const removeEvent: RemoveEvent = { ...remove, detail: { label: "A" } };
    const removeCb = cbHash["trip-plan:remove-marker"];
    act(() => {
      expect(() => removeCb(removeEvent)).not.toThrow();
    });
  });
});

describe("onUpdate", () => {
  it("dispatches a marker to add or update in state", () => {
    const ev = new Event("trip-planner:update-marker");
    const detail = {
      label: "A",
      latitude: 42.0,
      longitude: -71.0,
      title: "South Station"
    };
    const updateEvent: UpdateEvent = { ...ev, detail };
    const dispatch = jest.fn();
    onUpdate(updateEvent, dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "UPDATE_MARKER",
      payload: {
        marker: {
          icon: "map-pin-a",
          id: detail.label,
          latitude: detail.latitude,
          longitude: detail.longitude,
          rotation_angle: 0,
          tooltip: <div>{detail.title}</div>
        }
      }
    });
  });
});

describe("onRemove", () => {
  it("dispatches an id of a merker to remove from state", () => {
    const ev = new Event("trip-planner:remove-marker");
    const detail = {
      label: "A"
    };
    const removeEvent: RemoveEvent = { ...ev, detail };
    const dispatch = jest.fn();
    onRemove(removeEvent, dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: "REMOVE_MARKER",
      payload: {
        id: "A"
      }
    });
  });
});

describe("reducer", () => {
  it("adds markers to state", () => {
    const marker: Marker = {
      icon: "map-pin-a",
      id: "A",
      latitude: 42.0,
      longitude: -71.0,
      rotation_angle: 0,
      tooltip: <div>{"South Station"}</div>
    };
    const action: Action = {
      type: "UPDATE_MARKER",
      payload: { marker }
    };

    const state: State = {
      markers: []
    };

    const result = reducer(state, action);
    expect(result).toEqual({ markers: [marker] });
  });

  it("updates markers in state", () => {
    const existingMarker: Marker = {
      icon: "map-pin-a",
      id: "A",
      latitude: 42.0,
      longitude: -71.0,
      rotation_angle: 0,
      tooltip: <div>{"South Station"}</div>
    };
    const state: State = { markers: [existingMarker] };
    const updatedMarker: Marker = {
      ...existingMarker,
      latitude: 43.0,
      longitude: -72.0,
      tooltip: <div>{"North Station"}</div>
    };
    const action: Action = {
      type: "UPDATE_MARKER",
      payload: { marker: updatedMarker }
    };

    const result = reducer(state, action);
    expect(result).toEqual({ markers: [updatedMarker] });
  });

  it("removes markers from state", () => {
    const markerA: Marker = {
      icon: "map-pin-a",
      id: "A",
      latitude: 42.0,
      longitude: -71.0,
      rotation_angle: 0,
      tooltip: <div>{"South Station"}</div>
    };

    const markerB: Marker = {
      icon: "map-pin-b",
      id: "B",
      latitude: 43.0,
      longitude: -72.0,
      rotation_angle: 0,
      tooltip: <div>{"North Station"}</div>
    };

    const state: State = { markers: [markerA, markerB] };
    const action: Action = {
      type: "REMOVE_MARKER",
      payload: { id: "B" }
    };

    const result = reducer(state, action);
    expect(result).toEqual({ markers: [markerA] });
  });

  it("throws error for unexpected action type", () => {
    const action = {
      type: "UNKNOWN",
      payload: {}
    };

    // @ts-ignore
    expect(() => reducer({ markers: [] }, action)).toThrowError();
  });
});

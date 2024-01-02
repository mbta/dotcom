export type SelectedStopType = string | null;
export const clickMarkerAction = (stopId: SelectedStopType): MapAction => ({
  type: "CLICK_MARKER",
  payload: { stopId }
});

export const clickCurrentLocationAction = (
  stopId: SelectedStopType
): MapAction => ({
  type: "CLICK_CURRENT_LOCATION_MARKER",
  payload: { stopId }
});

export interface MapAction {
  type: MapActionType;
  payload: {
    stopId: SelectedStopType;
  };
}

export type MapActionType = "CLICK_MARKER" | "CLICK_CURRENT_LOCATION_MARKER";

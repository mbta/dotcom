import React, { ReactElement, useState } from "react";
import deepEqual from "fast-deep-equal/react";
import { Icon as IconType } from "leaflet";
import Leaflet from "react-leaflet";
import { MapMarker } from "../../../leaflet/components/__mapdata";
import { clickCurrentLocationAction } from "../../../leaflet/state";
import { clickMarkerAction, Dispatch } from "../../state";
import MapTooltip, {
  Props as MapTooltipProps
} from "../../../leaflet/components/MapTooltip";

export interface Props {
  marker: MapMarker;
  tileServerUrl: string;
  dispatch: Dispatch;
  isSelected: boolean;
  tooltipData: MapTooltipProps | null;
}

export const onClickMarker = (
  id: string | null,
  dispatch: Dispatch
): Function => {
  const clickAction =
    id === "current-location" ? clickCurrentLocationAction : clickMarkerAction;
  return () => dispatch(clickAction(id));
};

export const buildIcon = (
  markerIcon: string | null,
  size: number[] | undefined,
  hovered: boolean,
  isSelected: boolean
): IconType | undefined => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line global-require
    const Icon = require("../../../leaflet/icon").default;
    if (!markerIcon) {
      return undefined;
    }
    if (markerIcon === "current-location-marker") {
      // Custom size for current-location marker and no hover icon
      return Icon(`${markerIcon}`, {
        icon_size: size, // eslint-disable-line camelcase
        icon_anchor: [size![0] / 2, size![1] / 2] // eslint-disable-line camelcase
      });
    }
    if (hovered || isSelected) {
      return Icon(`${markerIcon}-hover`);
    }
    return Icon(markerIcon);
  }
  return undefined;
};

const MarkerWrapper = ({
  marker: {
    id,
    latitude,
    longitude,
    icon: markerIcon,
    tooltip: initialTooltip,
    size
  },
  tooltipData,
  tileServerUrl,
  dispatch,
  isSelected
}: Props): ReactElement<HTMLElement> | null => {
  const [hovered, setHovered] = useState(false);
  if (typeof window !== "undefined" && tileServerUrl !== "") {
    // eslint-disable-next-line
    const leaflet: typeof Leaflet = require("react-leaflet");
    const { Popup, Marker } = leaflet;
    const toggleHovered = (): void => setHovered(!hovered);
    const tooltipComponent = tooltipData ? (
      <MapTooltip {...tooltipData} />
    ) : (
      initialTooltip
    );
    const icon: IconType | undefined = buildIcon(
      markerIcon,
      size,
      hovered,
      isSelected
    );

    // @ts-ignore react-leaftlet base classes make this difficult to type
    const initMarker = (ref): void => {
      // eslint-disable-line
      if (ref) {
        if (isSelected) {
          ref.leafletElement.openPopup();
        } else {
          ref.leafletElement.closePopup();
        }
      }
    };

    return (
      <Marker
        ref={initMarker}
        key={id || `marker-${Math.floor(Math.random() * 1000)}`}
        position={[latitude, longitude]}
        icon={icon}
        onClick={onClickMarker(id, dispatch)}
        onMouseOver={toggleHovered}
        onFocus={toggleHovered}
        onMouseOut={toggleHovered}
        onBlur={toggleHovered}
        keyboard={false}
      >
        {tooltipComponent ? (
          <Popup
            minWidth={320}
            maxHeight={175}
            onClose={() => isSelected && dispatch(clickMarkerAction(null))}
          >
            {tooltipComponent && (
              <div className="m-tnm__address-marker">{tooltipComponent}</div>
            )}
          </Popup>
        ) : null}
      </Marker>
    );
  }
  return null;
};

export default React.memo(MarkerWrapper, deepEqual);

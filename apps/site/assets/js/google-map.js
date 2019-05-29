import { doWhenGoogleMapsIsReady } from "./google-maps-loaded";
import styles from "./google-map/styles";
import * as Icons from "./icons";

export default function($) {
  $ = $ || window.jQuery;
  document.addEventListener(
    "turbolinks:load",
    () => {
      doWhenGoogleMapsIsReady(() => {
        maybeInitMap($);
      });
    },
    { passive: true }
  );
}

// These values are global to this module
var maps = [];
var ids = [];
var bounds = {};
var infoWindow = null;

function resetGlobals() {
  maps = [];
  ids = [];
  bounds = {};
  infoWindow = null;
}

function maybeInitMap($) {
  initMap($, true);
}

export function initMap($, autoInit = false) {
  // Read the map data from page
  const mapDataElements = document.getElementsByClassName("map-dynamic-data");

  // Get rid of any previously registered reevaluateMapBounds event
  window.removeEventListener("resize", reevaluateMapBounds);
  $(document).off("show.bs.collapse", createToggledMap);

  // Clean up
  resetGlobals();

  // Leave if there is no map data available
  if (!mapDataElements || mapDataElements.length == 0) {
    return;
  }

  maybeCreateMaps(mapDataElements, autoInit);

  // Reconsier bounds on page resize
  window.addEventListener("resize", reevaluateMapBounds, { passive: true });
  // must be a jQuery.on since it's a synthetic event
  $(document).on("show.bs.collapse", createToggledMap);
  return maps.map((map, index) => {
    return {
      id: ids[index],
      map: map
    };
  });
}

function maybeCreateMaps(mapDataElements, autoInit) {
  // Render all visible maps by iterating over the HTMLCollection elements
  for (var i = 0; i < mapDataElements.length; i++) {
    const el = mapDataElements[i];
    var mapData = JSON.parse(el.innerHTML);
    if (!autoInit || mapData.auto_init) {
      const dynamicMap = createDynamicMap(el, i);
      if (dynamicMap.offsetParent) {
        displayMap(dynamicMap, mapData);
      }
    }
  }
}

function createToggledMap(ev) {
  const dynamicData = ev.target.getElementsByClassName("map-dynamic-data");
  if (dynamicData.length > 0) {
    const el = dynamicData[0];
    const mapData = JSON.parse(el.innerHTML);
    const dynamicMap = createDynamicMap(el);
    displayMap(dynamicMap, mapData);
  }
}

function createDynamicMap(el, index) {
  const className = "map-dynamic";
  var dynamicMap = el.nextElementSibling;
  if (!dynamicMap || dynamicMap.className !== className) {
    dynamicMap = document.createElement("div");
    dynamicMap.id = el.id;
    el.id = `${el.id}-source`;
    dynamicMap.className = className;
    dynamicMap.attributes["data-index"] = index;
    el.parentNode.insertBefore(dynamicMap, el.nextElementSibling);
    el.parentNode.className += " is-map-dynamic";
  }
  return dynamicMap;
}

function cachedMapFor(el) {
  const index = el.attributes["data-index"];
  return maps[index];
}

function displayMap(el, mapData) {
  const index = el.attributes["data-index"];
  if (maps[index]) {
    // bail out if we already made a map
    return;
  }
  // Create a map instance
  const map = (maps[index] = new google.maps.Map(el, mapData.dynamic_options));
  ids[index] = el.id;

  // Bounds will allow us to later zoom the map to the boundaries of the stops
  const bound = (bounds[index] = new google.maps.LatLngBounds());

  // If there are stops, show them
  if (mapData.markers) {
    mapData.markers.forEach(renderMarkerFunction(el, bound));
  }

  // If there are route polylines, show them
  if (mapData.paths) {
    renderPolylines(el, mapData.paths);
  }

  if (mapData.layers) {
    addMapLayers(mapData.layers, map);
  }

  // Auto zoom and auto center
  reevaluateMapBoundByIndex(index);

  // If the map zooms in too much, take it out to a reasonble level
  const zoom = map.getZoom();
  if (!zoom && !mapData.zoom) {
    google.maps.event.addListenerOnce(map, "zoom_changed", () => {
      setReasonableZoom(map, map.getZoom());
    });
  } else if (mapData.zoom) {
    map.setZoom(mapData.zoom);
  } else {
    setReasonableZoom(map, zoom);
  }

  // set basemap styles
  map.setOptions({ styles: styles });
}

function renderPolylines(el, polylines) {
  const map = cachedMapFor(el);
  polylines.forEach(path => {
    polylineForPath(path).setMap(map);
  });
}

function polylineForPath(path) {
  if (path["dotted?"]) {
    const lineSymbol = {
      path: `M 0,-${path.weight} 0,${path.weight}`,
      strokeOpacity: 1,
      scale: 2
    };
    return new google.maps.Polyline({
      icons: [
        {
          icon: lineSymbol,
          index: "0",
          repeat: "10px"
        }
      ],
      path: google.maps.geometry.encoding.decodePath(path.polyline),
      geodesic: true,
      strokeOpacity: 0
    });
  } else {
    return new google.maps.Polyline({
      path: google.maps.geometry.encoding.decodePath(path.polyline),
      geodesic: true,
      strokeColor: "#" + path.color,
      strokeOpacity: 1.0,
      strokeWeight: path.weight
    });
  }
}

function addMapLayers(layers, map) {
  if (layers.transit === true) {
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
  }
}

function renderMarkerFunction(el, bound) {
  return (markerData, index) => {
    const map = cachedMapFor(el);
    var lat = markerData.latitude;
    var lng = markerData.longitude;
    var content = markerData.tooltip;
    var key = markerData.z_index + index;
    var iconSize = getIconSize(markerData.size);
    var icon = buildIcon(markerData.icon, iconSize);

    // Add a marker to map
    if (markerData["visible?"]) {
      const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        icon: icon,
        zIndex: markerData.z_index + index
      });

      // Display information about
      if (content) {
        marker.addListener("mouseover", showInfoWindow(map, marker, content));
        marker.addListener("mouseout", () => {
          closeInfoWindow();
        });
      }
    }

    // Extend the boundaries of the map to include this marker
    bound.extend(new google.maps.LatLng(lat, lng));
  };
}

export function triggerResize(el) {
  const map = cachedMapFor(el);
  google.maps.event.trigger(map, "resize");
  reevaluateMapBoundByIndex(el.attributes["data-index"]);
}

// When there are very few markers, map will zoom in too close. 17 is a reasonable zoom level to see a small
// number of points with additional contextual nearby map imagery
function setReasonableZoom(map, zoom) {
  if (zoom > 17) {
    map.setZoom(17);
  }
}

// Return a callback that can open an info window with specific content
function showInfoWindow(map, marker, content) {
  return input => {
    // If another info window is displayed, close it
    if (infoWindow) {
      closeInfoWindow();
    }
    infoWindow = new google.maps.InfoWindow({ content: content });
    infoWindow.open(map, marker);
  };
}

function closeInfoWindow() {
  infoWindow.close();
  infoWindow = null;
}

// If the map container size changes, recalulate the positioning of the map contents
function reevaluateMapBounds() {
  for (var index in maps) {
    reevaluateMapBoundByIndex(index);
  }
}

function reevaluateMapBoundByIndex(index) {
  const map = maps[index];
  const bound = bounds[index];
  const ne = bound.getNorthEast();
  const sw = bound.getSouthWest();
  // if the north-east and south-west corners are the same, it's a
  // single-bound bounds, so just set the center
  if (ne.equals(sw)) {
    map.setCenter(ne);
  } else {
    // otherwise, pan to the bounds
    map.fitBounds(bound);
    map.panToBounds(bound);
  }
}

// If there is icon data, return an icon, otherwise return null
function buildIcon(iconData, iconSize) {
  if (iconData) {
    return {
      url: "data:image/svg+xml;base64, " + window.btoa(iconSvg(iconData)),
      scaledSize: new google.maps.Size(iconSize, iconSize),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(iconSize / 2, iconSize / 2)
    };
  } else {
    return null;
  }
}

function getIconSize(size) {
  switch (size) {
    case "tiny":
      return 8;
      break;
    case "small":
      return 12;
      break;
    default:
      return 22; // "mid" sized
  }
}

export function iconSvg(marker) {
  const parts = marker.split("-");
  const id = parts.shift();
  const type = parts.join("-");

  switch (type) {
    case "dot":
      return iconDot(id);

    case "dot-filled":
      return iconDotFilled(id);

    case "dot-filled-mid":
      return iconDotFilledMid(id);

    case "dot-mid":
      return iconDotMid(id);

    case "vehicle":
      return iconVehicle(id);
  }
}

function iconDot(color) {
  return `<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><circle fill="#FFFFFF" cx="4" cy="4" r="3"></circle><path d="M4,6.5 C5.38071187,6.5 6.5,5.38071187 6.5,4 C6.5,2.61928813 5.38071187,1.5 4,1.5 C2.61928813,1.5 1.5,2.61928813 1.5,4 C1.5,5.38071187 2.61928813,6.5 4,6.5 Z M4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 C6.209139,0 8,1.790861 8,4 C8,6.209139 6.209139,8 4,8 Z" fill="#${color}" fill-rule="nonzero"></path></svg>`;
}

function iconDotFilled(color) {
  return `<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><circle fill="#000000" cx="4" cy="4" r="3"></circle><path d="M4,6.5 C5.38071187,6.5 6.5,5.38071187 6.5,4 C6.5,2.61928813 5.38071187,1.5 4,1.5 C2.61928813,1.5 1.5,2.61928813 1.5,4 C1.5,5.38071187 2.61928813,6.5 4,6.5 Z M4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 C6.209139,0 8,1.790861 8,4 C8,6.209139 6.209139,8 4,8 Z" fill="#${color}" fill-rule="nonzero"></path></svg>`;
}

function iconDotMid(color) {
  return `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><circle fill="#FFFFFF" cx="8" cy="8" r="7"></circle><path d="M8,13 C10.7614237,13 13,10.7614237 13,8 C13,5.23857625 10.7614237,3 8,3 C5.23857625,3 3,5.23857625 3,8 C3,10.7614237 5.23857625,13 8,13 Z M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z" fill="#${color}" fill-rule="nonzero"></path></svg>`;
}

function iconDotFilledMid(color) {
  return `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><circle fill="#000000" cx="8" cy="8" r="7"></circle><path d="M8,13 C10.7614237,13 13,10.7614237 13,8 C13,5.23857625 10.7614237,3 8,3 C5.23857625,3 3,5.23857625 3,8 C3,10.7614237 5.23857625,13 8,13 Z M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z" fill="#${color}" fill-rule="nonzero"></path></svg>`;
}

function iconVehicle(type) {
  return Icons.getSvgIcon(`bw-${type}`);
}

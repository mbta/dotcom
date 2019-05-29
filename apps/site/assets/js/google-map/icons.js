import { getSvgIcon } from "../icons";

const getPoint = coords => new window.google.maps.Point(coords.x, coords.y);

const getPath = path => {
  const symbol = window.google.maps.SymbolPath[path.toUpperCase()];
  if (symbol) {
    return symbol;
  }
  return path;
};

export const parseObject = data => {
  const icon = {};

  const {
    anchor,
    fill_color: fillColor,
    fill_opacity: fillOpacity,
    label_origin: labelOrigin,
    path,
    rotation,
    scale,
    stroke_color: strokeColor,
    stroke_opacity: strokeOpacity,
    stroke_weight: strokeWeight
  } = data;

  if (fillColor) icon.fillColor = fillColor;
  if (scale) icon.scale = scale;
  if (strokeColor) icon.strokeColor = strokeColor;

  if (typeof fillOpacity === "number") icon.fillOpacity = fillOpacity;
  if (typeof rotation === "number") icon.rotation = rotation;
  if (typeof strokeOpacity === "number") icon.strokeOpacity = strokeOpacity;
  if (typeof strokeWeight === "number") icon.strokeWeight = strokeWeight;
  if (labelOrigin && typeof labelOrigin === "object")
    icon.labelOrigin = getPoint(labelOrigin);
  if (anchor && typeof anchor === "object") icon.anchor = getPoint(anchor);
  if (typeof path === "string") icon.path = getPath(path);

  return icon;
};

export const iconVehicle = type => getSvgIcon(`bw-${type}`);

export const iconMode = mode => getSvgIcon(`${mode}`);

export const iconStop = () => getSvgIcon("map-stop-marker");

export const iconStation = () => getSvgIcon("map-station-marker");

export const iconPin = () => getSvgIcon("map-pin");

export const iconCurrentLocation = () => getSvgIcon("current-location-marker");

export const iconDot = color =>
  `<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><circle fill="#FFFFFF" cx="4" cy="4" r="3"></circle><path d="M4,6.5 C5.38071187,6.5 6.5,5.38071187 6.5,4 C6.5,2.61928813 5.38071187,1.5 4,1.5 C2.61928813,1.5 1.5,2.61928813 1.5,4 C1.5,5.38071187 2.61928813,6.5 4,6.5 Z M4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 C6.209139,0 8,1.790861 8,4 C8,6.209139 6.209139,8 4,8 Z" fill="#${color}" fill-rule="nonzero"></path></svg>`;

export const iconDotFilled = color =>
  `<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><circle fill="#000000" cx="4" cy="4" r="3"></circle><path d="M4,6.5 C5.38071187,6.5 6.5,5.38071187 6.5,4 C6.5,2.61928813 5.38071187,1.5 4,1.5 C2.61928813,1.5 1.5,2.61928813 1.5,4 C1.5,5.38071187 2.61928813,6.5 4,6.5 Z M4,8 C1.790861,8 0,6.209139 0,4 C0,1.790861 1.790861,0 4,0 C6.209139,0 8,1.790861 8,4 C8,6.209139 6.209139,8 4,8 Z" fill="#${color}" fill-rule="nonzero"></path></svg>`;

export const iconDotMid = color =>
  `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><circle fill="#FFFFFF" cx="8" cy="8" r="7"></circle><path d="M8,13 C10.7614237,13 13,10.7614237 13,8 C13,5.23857625 10.7614237,3 8,3 C5.23857625,3 3,5.23857625 3,8 C3,10.7614237 5.23857625,13 8,13 Z M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z" fill="#${color}" fill-rule="nonzero"></path></svg>`;

export const iconDotFilledMid = color =>
  `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><circle fill="#000000" cx="8" cy="8" r="7"></circle><path d="M8,13 C10.7614237,13 13,10.7614237 13,8 C13,5.23857625 10.7614237,3 8,3 C5.23857625,3 3,5.23857625 3,8 C3,10.7614237 5.23857625,13 8,13 Z M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z" fill="#${color}" fill-rule="nonzero"></path></svg>`;

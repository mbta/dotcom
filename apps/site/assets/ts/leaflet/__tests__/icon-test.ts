import icon, { defaultIconOpts } from "../icon";

it("generates a leaflet icon", () => {
  const iconClass = icon("abc");
  expect(iconClass!.options.iconUrl).toBe("/images/icon-abc.svg");
});

it("returns undefined if no icon", () => {
  const iconClass = icon(null);
  expect(iconClass).toBeUndefined();
});

it("returns default icon opts if options are missing", () => {
  const iconClass = icon("string", {});
  expect(iconClass!.options).toEqual({
    ...defaultIconOpts,
    iconRetinaUrl: "/images/icon-string.svg",
    iconUrl: "/images/icon-string.svg"
  });
});

it("returns default icon opts if some options are missing", () => {
  const iconClass = icon("string", { icon_size: [50, 50] });
  expect(iconClass!.options).toEqual({
    ...defaultIconOpts,
    iconRetinaUrl: "/images/icon-string.svg",
    iconSize: [50, 50],
    iconUrl: "/images/icon-string.svg"
  });
});

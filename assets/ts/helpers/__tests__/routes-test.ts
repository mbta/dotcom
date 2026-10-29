import { isBusRouteStop } from "../routes";

test("isBusRouteStop returns false when no route", () => {
  expect(isBusRouteStop({} as any)).toBe(false);
});

import { Alert, InformedEntitySet } from "../../__v3api";
import {
  isHighSeverityOrHighPriority,
  isCurrentAlert,
  alertsByStop,
  uniqueByEffect,
  isDiversion
} from "../alert";

const zeroPadded = (num: number): string => `${num}`.padStart(2, "0");

const activePeriodDateFormatted = (ms: number): string => {
  const date = new Date(ms);
  return `${date.getFullYear()}-${zeroPadded(date.getMonth() + 1)}-${zeroPadded(
    date.getDate()
  )} ${zeroPadded(date.getHours())}:${zeroPadded(date.getMinutes())}`;
};

export const aroundNow = () => {
  const now = Date.now();
  const five_minutes = 300_000;
  return [
    [
      activePeriodDateFormatted(now - five_minutes),
      activePeriodDateFormatted(now + five_minutes)
    ]
  ];
};

const testDate = new Date("2020-09-10T09:00");
const alert1: Alert = {
  severity: 7,
  priority: "high",
  lifecycle: "new",
  active_period: [["2020-09-10 08:00", "2020-09-10 20:00"]]
} as Alert;
const alert2: Alert = {
  severity: 3,
  priority: "high",
  lifecycle: "ongoing",
  active_period: [["2020-09-08 12:00", "2020-09-11 20:00"]]
} as Alert;
const alert3: Alert = {
  severity: 7,
  priority: "low",
  lifecycle: "ongoing_upcoming",
  active_period: [["2020-09-10 12:00", "2020-09-10 20:00"]]
} as Alert;
const alert4: Alert = {
  severity: 3,
  priority: "low",
  lifecycle: "upcoming",
  active_period: [["2020-09-10 12:00", "2020-09-10 20:00"]]
} as Alert;

describe("isHighSeverityOrHighPriority", () => {
  test.each`
    alert     | isHigh
    ${alert1} | ${true}
    ${alert2} | ${true}
    ${alert3} | ${true}
    ${alert4} | ${false}
  `(
    "isHighSeverityOrHighPriority returns whether alert is high..",
    ({ alert, isHigh }) => {
      if (isHigh) {
        expect(isHighSeverityOrHighPriority(alert)).toBeTruthy();
      } else {
        expect(isHighSeverityOrHighPriority(alert)).toBeFalsy();
      }
    }
  );
});

describe("isDiversion", () => {
  test("returns whether effect is a diversion", () => {
    expect(isDiversion(alert1)).toBeFalsy();
    expect(isDiversion({ ...alert1, effect: "shuttle" })).toBeTruthy();
    expect(isDiversion({ ...alert1, effect: "stop_closure" })).toBeTruthy();
    expect(isDiversion({ ...alert1, effect: "station_closure" })).toBeTruthy();
    expect(isDiversion({ ...alert1, effect: "detour" })).toBeTruthy();
    expect(isDiversion({ ...alert1, effect: "other" })).toBeFalsy();
  });
});

describe("isCurrentAlert", () => {
  test.each`
    alert     | isCurrent
    ${alert1} | ${true}
    ${alert2} | ${true}
    ${alert3} | ${false}
    ${alert4} | ${false}
  `(
    "isCurrentAlert returns whether alert is current based on lifecycle and active period",
    ({ alert, isCurrent }) => {
      if (isCurrent) {
        expect(isCurrentAlert(alert, testDate)).toBeTruthy();
      } else {
        expect(isCurrentAlert(alert, testDate)).toBeFalsy();
      }
    }
  );
});

describe("alertsByStop", () => {
  test("alertsByStop finds alerts affecting a certain stop", () => {
    const alert_two = {
      ...alert2,
      informed_entity: { stop: ["place-sstat"] } as InformedEntitySet
    };
    const alert_three = {
      ...alert3,
      informed_entity: { stop: ["place-sstat"] } as InformedEntitySet
    };
    const alerts = [
      { ...alert1, informed_entity: { stop: null } as InformedEntitySet },
      alert_two,
      alert_three,
      { ...alert4, informed_entity: { stop: null } as InformedEntitySet }
    ];
    const alertsForStop = alertsByStop(alerts, "place-sstat");
    expect(alertsForStop).toEqual([alert_two, alert_three]);
  });
});

describe("uniqueByEffect", () => {
  test("uniqueByEffect enables filtering to unique effects", () => {
    const alerts = [
      { effect: "shuttle" } as Alert,
      { effect: "detour" } as Alert,
      { effect: "detour" } as Alert,
      { effect: "shuttle" } as Alert,
      { effect: "unknown" } as Alert
    ];
    expect(alerts.filter(uniqueByEffect)).toHaveLength(3);
    expect(alerts.filter(uniqueByEffect).map(a => a.effect)).toEqual([
      "shuttle",
      "detour",
      "unknown"
    ]);
  });
});

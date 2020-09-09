import { Alert } from "../../__v3api";
import {
  isHighSeverityOrHighPriority,
  isDiversion,
  isCurrentAlert
} from "../alert";

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

test.only.each`
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

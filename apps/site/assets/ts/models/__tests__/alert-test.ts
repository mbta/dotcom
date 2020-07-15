import { Alert } from "../../__v3api";
import { isHighSeverityOrHighPriority } from "../alert";

const alert1: Alert = {
  severity: 7,
  priority: "high"
} as Alert;
const alert2: Alert = {
  severity: 3,
  priority: "high"
} as Alert;
const alert3: Alert = {
  severity: 7,
  priority: "low"
} as Alert;
const alert4: Alert = {
  severity: 3,
  priority: "low"
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

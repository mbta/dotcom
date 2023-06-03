import React from "react";
import { render, screen } from "@testing-library/react";
import BasicTime, { BasicTimeProps } from "../components/BasicTime";

const testTime = new Date("2020-02-28T10:00:00");

const defaultProps: BasicTimeProps = {
  displayType: "absolute",
  strikethrough: false,
  time: testTime,
  targetDate: undefined
};
const renderBasicTime = (props: Partial<BasicTimeProps>) => {
  const allProps: BasicTimeProps = { ...defaultProps, ...props };
  return render(<BasicTime {...allProps} />);
};

describe("BasicTime", () => {
  it("renders relative displayType", () => {
    renderBasicTime({
      displayType: "relative",
      targetDate: new Date("2020-02-28T10:40:00")
    });
    expect(screen.findByText("40 min")).toBeDefined();
  });

  it("renders absolute displayType", () => {
    renderBasicTime({ displayType: "absolute" });
    expect(screen.findByText("10:00 AM")).toBeDefined();
  });

  it("adds a strikethrough CSS class", () => {
    const { container } = renderBasicTime({ strikethrough: true });
    expect(container.querySelector("time")).toHaveClass("strikethrough");
    const { container: container2 } = renderBasicTime({ strikethrough: false });
    expect(container2.querySelector("time")).not.toHaveClass("strikethrough");
  });

  it("returns no <time> if no time given", () => {
    const { container: withoutTime } = renderBasicTime({ time: undefined });
    expect(withoutTime.querySelector("time")).toBeFalsy();
    const { container: withTime } = renderBasicTime({});
    expect(withTime.querySelector("time")).toBeTruthy();
  });
});

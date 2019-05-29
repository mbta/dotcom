import React, { ReactElement } from "react";
import renderer from "react-test-renderer";
import useInterval from "../use-interval";

jest.useFakeTimers();

interface Props {
  spy: Function;
}

const Component = ({ spy }: Props): ReactElement<HTMLDivElement> => {
  useInterval(spy, 1);
  return <div />;
};

describe("useInterval", () => {
  it("calls callback on an interval", () => {
    const spy = jest.fn();
    renderer
      .create(<Component spy={spy} />)
      // update triggers useEffect to run
      .update(<Component spy={spy} />);

    jest.advanceTimersByTime(10);

    expect(spy).toHaveBeenCalledTimes(10);
  });
});

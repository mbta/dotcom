import React, { ReactElement } from "react";
import { mount, ReactWrapper } from "enzyme";
import * as KeyboardEvents from "../../../../../helpers/keyboard-events-react";
import AccordionRow from "../AccordionRow";

jest.mock("../../../../../helpers/keyboard-events-react", () => ({
  __esModule: true,
  handleReactEnterKeyPress: jest.fn()
}));

const contentComponent = () => <>Row Content</>;

describe("AccordionRow", () => {
  it("renders the expanded AccordionRow markup", () => {
    const wrapper: ReactWrapper = mount(
      <table>
        <tbody>
          <AccordionRow
            id="trip-45030860"
            colSpan={3}
            contentComponent={contentComponent}
            expanded={true}
            toggle={() => {}}
          >
            <>Children</>
          </AccordionRow>
        </tbody>
      </table>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    wrapper.unmount();
  });

  it("renders the collapsed AccordionRow markup", () => {
    const wrapper: ReactWrapper = mount(
      <table>
        <tbody>
          <AccordionRow
            id="trip-45030860"
            colSpan={3}
            contentComponent={contentComponent}
            expanded={false}
            toggle={() => {}}
          >
            <>Children</>
          </AccordionRow>
        </tbody>
      </table>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    wrapper.unmount();
  });

  it("accepts the Enter key as input", () => {
    const mockHandleReactEnterKeyPress: jest.Mock = KeyboardEvents.handleReactEnterKeyPress as jest.Mock;

    const wrapper: ReactWrapper = mount(
      <table>
        <tbody>
          <AccordionRow
            id="trip-45030860"
            colSpan={3}
            contentComponent={contentComponent}
            expanded={false}
            toggle={() => {}}
          >
            <>Children</>
          </AccordionRow>
        </tbody>
      </table>
    );

    wrapper.find(".schedule-table__row").simulate("keypress", { key: "Enter" });

    expect(mockHandleReactEnterKeyPress).toHaveBeenCalled();
  });
});

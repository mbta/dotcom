import { fireEvent, render, screen } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { createScheduleStore } from "../../../store/ScheduleStore";
import OriginModalContent from "../OriginModalContent";

const stops = [
  {
    name: "Def",
    id: "456",
    is_closed: true,
    zone: null
  },
  {
    name: "SL",
    id: "741",
    is_closed: false,
    zone: "1"
  },
  {
    name: "Wellington",
    id: "place-welln",
    is_closed: false,
    zone: null
  }
];

// redux store/provider
const store = createScheduleStore(0);

function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}

function renderWithProvider(ui: React.ReactElement) {
  return render(ui, { wrapper: Wrapper });
}

describe("<OriginModalContent />", () => {
  beforeEach(() => {
    renderWithProvider(
      <OriginModalContent
        stops={stops}
        selectedOrigin="456"
        handleChangeOrigin={() => {}}
      />
    );
  });
  test("shows <OriginListItem /> each stop", () => {
    for (const stop of stops) {
      expect(screen.getByText(stop.name)).toBeTruthy();
    }
  });

  test("shows input to filter", () => {
    expect(screen.getByRole("heading").textContent).toContain(
      "Choose an origin stop"
    );
    expect(
      screen.getByPlaceholderText("Filter stops and stations")
    ).toBeTruthy();
  });
});

test("<OriginModalContent /> allows list filtering", () => {
  const { container } = renderWithProvider(
    <OriginModalContent
      stops={stops}
      selectedOrigin="456"
      handleChangeOrigin={() => {}}
    />
  );
  const numStopsListed = () =>
    container.querySelectorAll(".schedule-finder__origin-list-item").length;

  expect(numStopsListed()).toEqual(3);
  fireEvent.change(screen.getByPlaceholderText("Filter stops and stations"), {
    target: { value: "Wel" }
  });
  expect(numStopsListed()).toEqual(1);
});

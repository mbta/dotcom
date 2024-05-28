import React from "react";
import { act } from "react-test-renderer";
import { mount, ReactWrapper } from "enzyme";
import { EnhancedJourney } from "../../../__trips";
import UpcomingDepartures, {
  upcomingDeparturesTable,
  crowdingInformation,
  BusTableRow,
  CrTableRow,
  fetchData
} from "../UpcomingDepartures";
import enhancedBusJourneysResponse from "./test-data/enhancedBusJourneys.json";
import enhancedCRjourneysResponse from "./test-data/enhancedCRjourneys.json";
import LiveCrowdingIcon from "../../../line-diagram/LiveCrowdingIcon";
import * as useProvider from "../../../../../helpers/use-provider";
import { render, screen } from "@testing-library/react";
import * as iconHelpers from "../../../../../helpers/icon";
import * as predictionHelpers from "../../../../../helpers/prediction-helpers";

const enhancedBusJourneys = (enhancedBusJourneysResponse as unknown) as EnhancedJourney[];
const enhancedCRjourneys = (enhancedCRjourneysResponse as unknown) as EnhancedJourney[];

describe("fetchData", () => {
  it("fetches data", async () => {
    const payload = [{ trip: { id: "yeah" } }];
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => payload,
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );

    const result = await fetchData("1", "99", 0, "");
    expect(window.fetch).toHaveBeenCalledWith(
      "/schedules/finder_api/departures?id=1&stop=99&direction=0"
    );

    expect(result).toStrictEqual([{ trip: { id: "yeah" }, tripInfo: payload }]);
  });
});

describe("UpcomingDepartures", () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with message if there are no predictions", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>{upcomingDeparturesTable({ loading: false, data: [] })}</>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(0);
      expect(wrapper.find(CrTableRow)).toHaveLength(0);
      expect(wrapper.find(".callout").text()).toEqual(
        "There are currently no realtime departures available."
      );
    });
  });

  it("renders bus predictions", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable({
            loading: false,
            data: enhancedBusJourneys
          })}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(2);
      expect(wrapper.find(CrTableRow)).toHaveLength(0);
    });
  });

  it("renders SL bus predictions", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable({
            loading: false,
            data: enhancedBusJourneys
          })}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(2);
      expect(wrapper.find(CrTableRow)).toHaveLength(0);
    });
  });

  it("renders cr predictions", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable({
            loading: false,
            data: enhancedCRjourneys
          })}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(0);
      expect(wrapper.find(CrTableRow).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("doesn't render cr departures that don't have a predicted time yet", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable({
            loading: false,
            data: enhancedCRjourneys
          })}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(BusTableRow)).toHaveLength(0);
      expect(wrapper.find(CrTableRow)).toHaveLength(1);
    });
  });

  it("renders upcoming (bus) departures containing crowding information", () => {
    act(() => {
      const mockUpcomingDeparturesTable = (
        <>
          {upcomingDeparturesTable({
            loading: false,
            data: enhancedBusJourneys
          })}
        </>
      );

      wrapper = mount(mockUpcomingDeparturesTable);

      expect(wrapper.find(".c-icon__crowding--some_crowding").length).toBe(1);
    });
  });

  it("renders the 'loading' status", () => {
    const providerSpy = jest
      .spyOn(useProvider, "useProvider")
      .mockImplementation(() => {
        return [
          { loading: true } as useProvider.UseProviderState<EnhancedJourney[]>,
          () => {
            return Promise.resolve([]);
          }
        ];
      });
    wrapper = mount(
      <UpcomingDepartures
        routeId="1"
        selectedDirection={0}
        selectedOrigin="1"
        today="today"
      />
    );

    expect(wrapper.find(".c-spinner__container")).toHaveLength(1);
  });

  it("should display crowding information for buses", () => {
    const journey = enhancedBusJourneys[0];

    wrapper = mount(<>{crowdingInformation(journey, journey.trip.id)}</>);

    expect(wrapper.exists(LiveCrowdingIcon)).toBeTruthy();
    expect(wrapper.find(LiveCrowdingIcon).prop("crowding")).toBe(
      "some_crowding"
    );
  });

  it("should not display crowding information for CR", () => {
    act(() => {
      const journey = (enhancedCRjourneysResponse[0] as unknown) as EnhancedJourney;

      wrapper = mount(<>{crowdingInformation(journey, journey.trip.id)}</>);
      expect(wrapper.exists(LiveCrowdingIcon)).toBeFalsy();
    });
  });

  describe("crowdingInformation", () => {
    it("should return null if there is no tripInfo on the journey", () => {
      const journey = {} as EnhancedJourney;
      expect(crowdingInformation(journey, "Test Journey ID")).toBeNull();
    });
  });

  describe("BusTableRow", () => {
    it("should display the mode icon instead of the route pill if the route is not a bus route", () => {
      jest
        .spyOn(iconHelpers, "modeIcon")
        .mockImplementation(() => <>Mode Icon Mock</>);
      const journey = {
        route: { id: "Route ID", type: 1 },
        trip: { id: "Trip ID" },
        realtime: { prediction: { time: null } }
      } as any;
      render(<BusTableRow journey={journey} />);
      expect(screen.queryByText("Mode Icon Mock")).not.toBeNull();
    });
  });

  describe("CRTableRow", () => {
    it("should return null if the realtime prediction is null", () => {
      const journey = { realtime: { prediction: null } } as any;
      render(
        <table data-testid="should-be-empty">
          <CrTableRow journey={journey} />
        </table>
      );
      expect(screen.getByTestId("should-be-empty")).toBeEmptyDOMElement();
    });

    it("train status should display correctly if there is no trip name", () => {
      jest
        .spyOn(predictionHelpers, "statusForCommuterRail")
        .mockImplementation(() => "Test On Time Status");
      jest
        .spyOn(predictionHelpers, "trackForCommuterRail")
        .mockImplementation(() => "Test Track 2");
      jest
        .spyOn(predictionHelpers, "timeForCommuterRail")
        .mockImplementation(() => <div>Mock Time</div>);
      jest
        .spyOn(iconHelpers, "modeIcon")
        .mockImplementation(() => <>Mode Icon Mock</>);

      const journey = {
        trip: { name: null, headsign: "Test Headsign" },
        realtime: { prediction: "Test Prediction" },
        route: { id: "Test Route ID" }
      } as any;
      render(<CrTableRow journey={journey} />);

      expect(screen.queryByText("Test On Time Status")).not.toBeNull();
      expect(screen.queryByText(" · Test On Time Status")).toBeNull();
    });

    it("should display the track information if present", () => {
      jest
        .spyOn(predictionHelpers, "statusForCommuterRail")
        .mockImplementation(() => "Test On Time Status");
      jest
        .spyOn(predictionHelpers, "trackForCommuterRail")
        .mockImplementation(() => "Test Track 2");
      jest
        .spyOn(predictionHelpers, "timeForCommuterRail")
        .mockImplementation(() => <div>Mock Time</div>);
      jest
        .spyOn(iconHelpers, "modeIcon")
        .mockImplementation(() => <>Mode Icon Mock</>);

      const journey = {
        trip: { name: null, headsign: "Test Headsign" },
        realtime: { prediction: "Test Prediction" },
        route: { id: "Test Route ID" }
      } as any;
      render(<CrTableRow journey={journey} />);

      expect(screen.queryByText("· Test Track 2")).not.toBeNull();
    });
  });
});

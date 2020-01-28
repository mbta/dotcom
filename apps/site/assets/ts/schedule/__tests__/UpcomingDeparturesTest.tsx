import React from "react";
import renderer, { act } from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import UpcomingDepartures from "../components/schedule-finder/UpcomingDepartures";
import { EnhancedJourney } from "../components/__trips";
import { payload } from "./ScheduleModalTest";
import crDeparturesResponse from "../__tests__/crDepartures.json";
import { UserInput } from "../components/ScheduleFinder";

const busDepartures = payload;
const crDepartures = (crDeparturesResponse as unknown) as EnhancedJourney[];

const input: UserInput = {
  route: "",
  origin: "",
  date: "",
  direction: 0
};

describe("UpcomingDepartures", () => {
  it("doesn't render if there are no predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        input={input}
        state={{
          data: [],
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });

  it("doesn't render if there was an error", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        input={input}
        state={{
          data: crDepartures,
          error: true,
          isLoading: false
        }}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });

  it("renders bus predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        input={input}
        state={{
          data: busDepartures,
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders SL bus predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        input={input}
        state={{
          data: [
            {
              ...busDepartures[0],
              route: { ...busDepartures[0].route, name: "SL-2", id: "741" }
            }
          ],
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders SL Waterfront predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        input={input}
        state={{
          data: [
            {
              ...busDepartures[0],
              route: {
                ...busDepartures[0].route,
                name: "Silver Line Way - South Station",
                id: "746"
              }
            }
          ],
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders cr predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        input={input}
        state={{
          data: crDepartures,
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("doesn't renders cr departures that don't have a predicted time yet", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        input={input}
        state={{
          data: [crDepartures[1]],
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});

import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import VoteMap from "../components/VoteMap";

const mockPrecinct = {
  town: "Boston",
  ward: "5",
  precinct: "1",
  lat: 42.34,
  lng: -71.07,
  address: "539 TREMONT STREET. HP ENTRANCE TO THE RIGHT OF THE MAIN ENTRANCE.",
  formatted_address: "539 Tremont St, Boston, MA 02116, USA",
  name: "CYCLORAMA",
  path: [
    [
      [-71.06, 42.35],
      [-71.0, 42.347],
      [-71.06, 42.34],
      [-71.0, 42.34],
      [-71.06, 42.34],
      [-71.0, 42.35],
      [-71.06, 42.35]
    ]
  ]
};

describe("VoteMap", () => {
  beforeAll(() => {
    jest.mock("../../../static/data/precincts.json", () => [mockPrecinct]);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders a Map by default", () => {
    const { asFragment, container } = render(<VoteMap />);

    expect(asFragment()).toMatchSnapshot();
    expect(
      container.querySelector(
        ".leaflet-layer, .leaflet-container, .leaflet-pane"
      )
    ).toBeTruthy();
  });

  describe("handles 'vote:update-from' events", () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="results-portal"><div></div></div>';
      render(<VoteMap />);
    });

    it("displays result with link to trip planner", () => {
      expect(screen.queryByText("Your polling location")).toBeNull();

      // simulate algolia result finding
      const testFromLocation = {
        latitude: 42.3515322,
        longitude: -71.0668452,
        address: "10 Park Plz, Boston, MA 02116"
      };
      act(() => {
        fireEvent(
          document,
          new CustomEvent("vote:update-from", { detail: testFromLocation })
        );
      });

      expect(screen.getByText("Your polling location")).toBeTruthy();
      const results = document.getElementById("results-portal")!;
      const linkToTripPlanner: HTMLAnchorElement = within(results).getByRole(
        "link"
      );
      expect(linkToTripPlanner.href).toContain("/trip-planner");
      expect(linkToTripPlanner.href).toContain(
        testFromLocation.latitude.toString()
      );
      expect(linkToTripPlanner.href).toContain(
        testFromLocation.longitude.toString()
      );
      expect(linkToTripPlanner.href).toContain(
        encodeURIComponent(testFromLocation.address)
      );
    });

    it("displays error message when location not found", () => {
      act(() => {
        fireEvent(
          document,
          new CustomEvent("vote:update-from", {
            detail: { latitude: 0, longitude: 0, address: "Null island" }
          })
        );
      });

      expect(screen.queryByText("Your polling location")).toBeNull();
      expect(
        screen.queryByText(
          "We’re sorry, we are unable to find the polling place for that address."
        )
      ).toBeTruthy();
      const results = document.getElementById("results-portal")!;
      const linkToSec: HTMLAnchorElement = within(results).getByRole("link");
      expect(linkToSec.href).toBe(
        "https://www.sec.state.ma.us/WhereDoIVoteMA/bal/MyElectionInfo.aspx"
      );
    });
  });
});

import React from "react";
import { screen, waitFor } from "@testing-library/react";
import StopPageDepartures from "../components/StopPageDepartures";
import { Route } from "../../__v3api";
import { baseRoute, renderWithRouter } from "./helpers";

const routeData: Route[] = [baseRoute("16", 3), baseRoute("Red", 1)];

describe("StopPageDepartures", () => {
  it("renders with no data", async () => {
    const { asFragment } = renderWithRouter(
      <StopPageDepartures routes={[]} alerts={[]} departureInfos={[]} />
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
      expect(screen.getByRole("list")).toBeEmptyDOMElement();
    });
  });

  it("renders with data", async () => {
    const { asFragment } = renderWithRouter(
      <StopPageDepartures routes={routeData} alerts={[]} departureInfos={[]} />
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
      expect(screen.getAllByRole("list")[0]).not.toBeEmptyDOMElement();
      ["All", "Bus", "Subway"].forEach(name => {
        expect(
          screen.getByRole("button", { name: new RegExp(name) })
        ).toBeDefined();
      });
    });
  });

  it("doesn't show the filters if there is 1 mode present", async () => {
    renderWithRouter(
      <StopPageDepartures
        routes={[routeData[0]]}
        alerts={[]}
        departureInfos={[]}
      />
    );
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: new RegExp("All") })
      ).toBeNull();
    });
  });
});

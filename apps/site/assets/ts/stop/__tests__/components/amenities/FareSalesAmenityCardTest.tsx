import React from "react";
import { render, screen, within } from "@testing-library/react";
import FareSalesAmenityCard from "../../../components/amenities/FareSalesAmenityCard";
import { customStop } from "../../helpers";
import * as useFetch from "../../../../hooks/useFetch";
import { FetchStatus } from "../../../../helpers/use-fetch";

const testFaresData = [
  ["Spaceship one-way", "$9999"],
  ["Scooter one-way", "$2.11"]
];

beforeAll(() => {
  jest
    .spyOn(useFetch, "default")
    .mockReturnValue({ status: FetchStatus.Data, data: testFaresData });
});

afterAll(() => {
  jest.resetAllMocks();
});

const stopWithVendingMachine = customStop({
  name: "Station Name",
  "has_fare_machine?": true
});
const stopWithoutVendingMachine = customStop({});
describe("FareSalesAmenityCard", () => {
  it("should render the title and description", () => {
    render(<FareSalesAmenityCard stop={stopWithVendingMachine} />);
    expect(screen.getByText(/^Fare Options$/)).toBeDefined();
    expect(
      screen.getByText("Purchase fares at fare vending machines.")
    ).toBeDefined();
    screen.getByRole("button").click(); // open modal
    expect(
      screen.getByRole("heading", { name: "Fare Options at Station Name" })
    ).toBeDefined();
    expect(screen.getByRole("heading", { name: "Fare Types" })).toBeDefined();
    expect(
      screen.getByRole("heading", { name: "Fare Vending Machines" })
    ).toBeDefined();
  });

  it("should render different description for stops without vending machine", () => {
    render(<FareSalesAmenityCard stop={stopWithoutVendingMachine} />);
    expect(screen.getByText(/^Fare Options$/)).toBeDefined();
    expect(
      screen.getByText("Purchase fares at nearby retail sales locations.")
    ).toBeDefined();
    screen.getByRole("button").click(); // open modal
    expect(
      screen.getByRole("heading", { name: "Fare Retail Locations" })
    ).toBeDefined();
  });

  it("should render a table with fares", () => {
    render(<FareSalesAmenityCard stop={stopWithoutVendingMachine} />);
    screen.getByRole("button").click(); // open modal
    expect(screen.getByRole("heading", { name: "Fare Types" })).toBeDefined();
    const table = screen.getByRole("table");
    expect(table).toBeDefined();
    const rows = within(table).getAllByRole("row");
    expect(rows).toHaveLength(testFaresData.length + 1); // +1 for header row
    expect(rows[1].textContent).toContain("Spaceship one-way$9999");
    expect(rows[2].textContent).toContain("Scooter one-way$2.11");
  });
});

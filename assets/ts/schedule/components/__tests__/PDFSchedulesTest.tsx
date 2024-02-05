import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import PDFSchedules from "../PDFSchedules";
import { Route } from "../../../__v3api";
import { render, screen } from "@testing-library/react";

const pdfs = [
  {
    url: "https://mbta.com/example-pdf.pdf",
    title: "Route 1 schedule PDF"
  }
];

const crRoute = {
  type: 2
} as Route;

const railRoute = {
  type: 0
} as Route;

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(<PDFSchedules pdfs={pdfs} route={railRoute} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders without pdfs", () => {
  createReactRoot();
  const tree = renderer
    .create(<PDFSchedules pdfs={[]} route={railRoute} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Does not include the `and Maps` for CR routes", () => {
  render(<PDFSchedules pdfs={pdfs} route={crRoute} />);
  expect(screen.queryByText("PDF Schedules and Maps")).toBeNull();
  expect(screen.getByText("PDF Schedules")).toBeInTheDocument();
});

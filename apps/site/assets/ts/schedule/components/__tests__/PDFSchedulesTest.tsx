import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import PDFSchedules from "../PDFSchedules";

const pdfs = [
  {
    url: "https://mbta.com/example-pdf.pdf",
    title: "Route 1 schedule PDF"
  }
];

it("it renders", () => {
  createReactRoot();
  const tree = renderer.create(<PDFSchedules pdfs={pdfs} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders without pdfs", () => {
  createReactRoot();
  const tree = renderer.create(<PDFSchedules pdfs={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});

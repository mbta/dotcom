import renderer from "react-test-renderer";
import { SchedulePDF } from "../../components/__schedule";
import pdfLink from "../hoursOfOperationHelpers";

describe("hoursOfOperationHelpers", () => {
  it("should display pdf link", () => {
    let pdf = pdfLink({ url: "TestURL" } as SchedulePDF);
    expect(pdf).not.toBe(null);
    const tree = renderer.create(pdf!).toJSON();

    expect(tree).not.toBeNull();
    const treeString = JSON.stringify(tree);
    expect(treeString).toMatch("Open full schedule and map PDF");
  });

  it("should return null if no pdf is passed", () => {
    let pdf = pdfLink(null);
    expect(pdf).toBe(null);
  });
});

import renderer from "react-test-renderer";
import { SchedulePDF } from "../../components/__schedule";
import pdfLink from "../hoursOfOperationHelpers";

describe("hoursOfOperationHelpers", () => {
  it("should display test as subway for default", () => {
    let pdf = pdfLink({ url: "TestURL" } as SchedulePDF, "Blue");
    expect(pdf).not.toBe(null);
    const tree = renderer.create(pdf!).toJSON();

    expect(tree).not.toBeNull();
    const treeString = JSON.stringify(tree);
    expect(treeString).toMatch("subway");
    expect(treeString).not.toMatch("trolley");
  });

  it("should display trolley for Mattapan", () => {
    let pdf = pdfLink({ url: "TestURL" } as SchedulePDF, "Mattapan");
    expect(pdf).not.toBe(null);
    const tree = renderer.create(pdf!).toJSON();

    expect(tree).not.toBeNull();
    const treeString = JSON.stringify(tree);
    expect(treeString).toMatch("trolley");
    expect(treeString).not.toMatch("subway");
  });
});

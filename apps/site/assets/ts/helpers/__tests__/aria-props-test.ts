import { labelOrDescribedBy } from "../aria-props";

describe("aria-label", () => {
  test("it returns an aria-label object for prop usage", () => {
    expect(labelOrDescribedBy({ label: "my label" })).toEqual({
      "aria-label": "my label"
    });
  });

  test("it returns an aria-labelled-by for prop usage", () => {
    expect(labelOrDescribedBy({ elementId: "my-element" })).toEqual({
      "aria-labelledby": "my-element"
    });
  });
});

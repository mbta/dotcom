import React from "react";
import renderer from "react-test-renderer";
import DescriptiveLink from "../DescriptiveLink";

describe("Loading", () => {
  it("renders", () => {
    const tree = renderer.create(
      <DescriptiveLink
        href="/page"
        title="This Goes To Page"
        bodyTextOrHtml="Click <b>here</b> to visit it."
      />
    );
    expect(tree).toMatchSnapshot();
  });
});

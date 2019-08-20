import React from "react";
import renderSvg from "../../helpers/render-svg";

/* eslint-disable react/no-danger */

it("renders the given svg content in a span element with a class name and icon title", () => {
  const className = "test-class-name";
  const svgText = "svg text";
  const iconName = "Icon Name"

  const expected = (
    <span
      aria-hidden="false"
      data-toggle="tooltip"
      data-original-title="Icon Name"
      title=""
      className={`notranslate ${className}`}
      dangerouslySetInnerHTML={{
        __html: "svg text"
      }}
    />
  );

  const result = renderSvg(className, svgText, iconName);

  expect(result).toEqual(expected);
});

/* eslint-enable react/no-danger */

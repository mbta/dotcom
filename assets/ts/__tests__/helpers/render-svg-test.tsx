import React from "react";
import renderSvg from "../../helpers/render-svg";

/* eslint-disable react/no-danger */

it("renders the given svg content in a span element with a class name", () => {
  const className = "test-class-name";
  const svgText = "svg text";

  const expected = (
    <span
      aria-hidden="true"
      className={`notranslate ${className}`}
      dangerouslySetInnerHTML={{
        __html: "svg text"
      }}
    />
  );

  const result = renderSvg(className, svgText);

  expect(result).toEqual(expected);
});

/* eslint-enable react/no-danger */

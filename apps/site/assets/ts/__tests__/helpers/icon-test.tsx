import React from "react";
import {
  accessibleIcon,
  blueLineIcon,
  busIcon,
  commuterRailIcon,
  greenLineIcon,
  greenBLineIcon,
  greenCLineIcon,
  greenELineIcon,
  mattapanLineIcon,
  orangeLineIcon,
  parkingIcon,
  redLineIcon,
  greenDLineIcon
} from "../../helpers/icon";

/* eslint-disable react/no-danger */

describe("accessibleIcon", () => {
  it("renders an accessibility icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = accessibleIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = accessibleIcon();

    expect(result).toEqual(expected);
  });
});

describe("blueLineIcon", () => {
  it("renders a blue line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = blueLineIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = blueLineIcon();

    expect(result).toEqual(expected);
  });
});

describe("busIcon", () => {
  it("renders a bus icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = busIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = busIcon();

    expect(result).toEqual(expected);
  });
});

describe("commuterRailIcon", () => {
  it("renders a commuter rail line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = commuterRailIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = commuterRailIcon();

    expect(result).toEqual(expected);
  });
});

describe("greenLineIcon", () => {
  it("renders a green line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenLineIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenLineIcon();

    expect(result).toEqual(expected);
  });
});

describe("greenBLineIcon", () => {
  it("renders a green B line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenBLineIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenBLineIcon();

    expect(result).toEqual(expected);
  });
});

describe("greenCLineIcon", () => {
  it("renders a green C line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenCLineIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenCLineIcon();

    expect(result).toEqual(expected);
  });
});

describe("greenDLineIcon", () => {
  it("renders a green D line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenDLineIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenDLineIcon();

    expect(result).toEqual(expected);
  });
});

describe("greenELineIcon", () => {
  it("renders a green E line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenELineIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = greenELineIcon();

    expect(result).toEqual(expected);
  });
});

describe("mattapanLineIcon", () => {
  it("renders a Mattapan line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = mattapanLineIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = mattapanLineIcon();

    expect(result).toEqual(expected);
  });
});

describe("orangeLineIcon", () => {
  it("renders an orange line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = orangeLineIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = orangeLineIcon();

    expect(result).toEqual(expected);
  });
});

describe("parkingIcon", () => {
  it("renders a parking icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <i
        aria-hidden="false"
        className={`fa fa-square-parking notranslate ${className}`}
      />
    );

    const result = parkingIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <i aria-hidden="false" className="fa fa-square-parking notranslate" />
    );

    const result = parkingIcon();

    expect(result).toEqual(expected);
  });
});

describe("redLineIcon", () => {
  it("renders a red line icon with a class name", () => {
    const className = "test-class-name";

    const expected = (
      <span
        aria-hidden="false"
        className={`notranslate ${className}`}
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = redLineIcon(className);

    expect(result).toEqual(expected);
  });

  it("renders without a class name", () => {
    const expected = (
      <span
        aria-hidden="false"
        className="notranslate"
        dangerouslySetInnerHTML={{
          __html: "SVG"
        }}
      />
    );

    const result = redLineIcon();

    expect(result).toEqual(expected);
  });
});

/* eslint-enable react/no-danger */

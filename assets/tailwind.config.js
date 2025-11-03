// See the Tailwind configuration guide for advanced usage
// https://tailwindcss.com/docs/configuration

const plugin = require("tailwindcss/plugin");
const tokens = require("../deps/mbta_metro/priv/dist/tokens");

const { colors: mbtaColors, ...mbtaTheme } = tokens;

const moreColors = {
  ...mbtaColors,
  gray: {
    DEFAULT: "#494f5c",
    dark: "#1c1e23",
    light: "#788093",
    lighter: "#b0b5c0",
    lightest: "#e9eaed",
    "bordered-background": "#f2f3f5"
  },
  "brand-primary": {
    DEFAULT: "#165c96",
    darkest: "#0b2f4c",
    lightest: "#cee0f4",
    "lightest-contrast": "#e2ecf9"
  },
  "logan-express": {
    BB: "#f16823",
    BT: "#0066cc",
    DV: "#704c9f",
    FH: "#e81d2d",
    WO: "#00954c"
  },
  massport: "#104c8f",
  subway: "#494f5c",
  bus: mbtaColors["brand-bus"],
  "mattapan-line": mbtaColors["red-line"]
};

module.exports = {
  corePlugins: {
    preflight: false
  },
  blocklist: ["container", "collapse"],
  important: "body",
  content: [
    "./js/**/*.js",
    "./ts/**/*.{js,ts}",
    "./ts/**/*.tsx",
    "../lib/dotcom_web.ex",
    "../lib/dotcom_web/**/*.*ex",
    "../deps/mbta_metro/lib/mbta_metro/components/*.ex",
    "../deps/mbta_metro/lib/mbta_metro/live/*.ex"
  ],
  safelist: [
    {
      pattern: /(bg|text|border|ring)-(logan-express|blue|green|orange|red|silver|bus|ferry|)./
    }
  ],
  theme: {
    colors: moreColors,
    extend: {
      ...mbtaTheme,
      spacing: {
        ...mbtaTheme.spacing,
        "4.5": "1.125rem",
        "7.5": "1.875rem",
        "120": "24rem"
      }
    },
    // match screens to Bootstrap's breakpoints for now
    // matched from $container-max-widths
    screens: {
      sm: "544px",
      md: "768px",
      lg: "960px",
      xl: "1200px"
    }
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    // Allows prefixing tailwind classes with LiveView classes to add rules
    // only when LiveView classes are applied, for example:
    //
    //     <div class="phx-click-loading:animate-ping">
    //
    plugin(({ addVariant }) => [
      addVariant("phx-click-loading", [
        ".phx-click-loading&",
        ".phx-click-loading &"
      ]),
      addVariant("phx-submit-loading", [
        ".phx-submit-loading&",
        ".phx-submit-loading &"
      ]),
      addVariant("phx-change-loading", [
        ".phx-change-loading&",
        ".phx-change-loading &"
      ])
    ]),
    // Base styling for HTML elements
    plugin(({ addBase }) =>
      addBase({
        "fieldset legend": { fontSize: "initial" }
      })
    ),
    // Add a component for each heading level, .h1 through .h6
    // Also handles reducing space between adjacent headings, copy directly following
    // headlines, and other complex content structures.
    plugin(({ addComponents, theme }) => {
      const breakpointSmDown = `@media (max-width: ${theme("screens.sm")})`;
      const breakpointSmUp = `@media (min-width: ${theme("screens.sm")})`;
      const baseHeading = {
        fontFamily: theme("fontFamily.heading"),
        fontWeight: theme("fontWeight.bold"),
        lineHeight: "1.275em",
        marginTop: "1.075em",
        marginBottom: ".375em"
      };

      // Paragraph copy directly following headlines (even if nested in divs)
      // have their own built-in spacing (line-heights, em-square), so we
      // undo the global after-heading spacing when paragraphs directly
      // follow headings. If an author floats media between a heading and
      // body copy, we lose the heading + copy relationship. When images are
      // visually directly after a headline, they should get the same gap
      // non-paragraphs get by default (undo negative margin above). Make
      // floated media items align with the top of adjacent wrapped text
      // characters
      const afterHeadingSpace = { marginTop: "-.25em" };
      const afterHeadingSpaceRules = {
        "+ :where(p, ul, ol)": afterHeadingSpace,
        "+ div > :where(p, ul, ol):first-child": afterHeadingSpace,
        "+ div > div > :where(p, ul, ol):first-child": afterHeadingSpace,
        "+ p > img:first-child, + p > a:first-child > img:first-child": afterHeadingSpace,
        "+ .c-media--half + p": { [breakpointSmUp]: afterHeadingSpace },
        "+ .c-media--half .c-media__content": {
          [breakpointSmUp]: afterHeadingSpace
        },
        "+ div > div ~ div > :where(p, ul, ol):first-child": {
          [breakpointSmDown]: { marginTop: "0" }
        }
      };

      // Adjacent (sibling) headings should not have additional space between
      // them (similar concept to paragraphs following headlines).
      //
      // This rule helps sub-headings feel "attached" or grouped under their
      // parent headings, and not disjointed or ambiguous.
      //
      // EXCLUSIONS: H1 and H2. H1 usually exists in its own space and we want
      // to always have consistent space after it. H2 is used to introduce
      // large sections often with tables and other non-text content, so it's
      // OK to have the original space under it.
      const reduceAdjacentHeadingSpace = { marginTop: "-.125em" };

      return [
        addComponents({
          ".h1": {
            ...baseHeading,
            fontSize: "2.5rem",
            [breakpointSmDown]: { fontSize: "2rem" }
          },
          ".h2": {
            ...baseHeading,
            fontSize: "1.75rem",
            [breakpointSmDown]: { fontSize: "1.625rem" },
            ...afterHeadingSpaceRules,
            "+ :where(.h3, h3)": reduceAdjacentHeadingSpace
          },
          ".h3": {
            ...baseHeading,
            fontSize: "1.3125rem",
            ...afterHeadingSpaceRules,
            "+ :where(.h4, h4)": reduceAdjacentHeadingSpace
          },
          ".h4": {
            ...baseHeading,
            fontSize: "1.125rem",
            ...afterHeadingSpaceRules,
            "+ :where(.h5, h5)": reduceAdjacentHeadingSpace
          },
          ".h5": {
            ...baseHeading,
            fontSize: "1rem",
            ...afterHeadingSpaceRules,
            "+ :where(.h6, h6)": reduceAdjacentHeadingSpace
          },
          ".h6": {
            ...baseHeading,
            fontWeight: theme("fontWeight.medium"),
            fontSize: "1rem"
          }
        })
      ];
    }),
    // Use the above heading components to style our actual headings by
    // default. No <h2 class="h2"> needed.
    plugin(({ addBase }) =>
      addBase({
        h1: { "@apply h1": {} },
        h2: { "@apply h2": {} },
        h3: { "@apply h3": {} },
        h4: { "@apply h4": {} },
        h5: { "@apply h5": {} },
        h6: { "@apply h6": {} }
      })
    )
  ]
};

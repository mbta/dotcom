// See the Tailwind configuration guide for advanced usage
// https://tailwindcss.com/docs/configuration

const plugin = require("tailwindcss/plugin");
const { content, plugins, safelist } = require("mbta_metro");
const {
  theme: { extend: tailwindTheme }
} = require("mbta_metro/tailwindTheme");

const moreColors = {
  ...tailwindTheme.colors,
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
    lightest: "#cee0f4"
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
  bus: tailwindTheme.colors["brand-bus"],
  "mattapan-line": tailwindTheme.colors["red-line"]
};
tailwindTheme.colors = moreColors;

module.exports = {
  corePlugins: {
    preflight: false
  },
  blocklist: ["container", "collapse"],
  important: "body",
  content: [
    ...content,
    "./js/**/*.js",
    "./ts/**/*.ts",
    "./ts/**/*.tsx",
    "../lib/dotcom_web.ex",
    "../lib/dotcom_web/**/*.*ex",
    "../../mbta_metro/lib/mbta_metro/components/**/*.ex",
    "../livebooks/*.livemd"
  ],
  safelist: [
    ...safelist,
    {
      pattern: /(bg|text|border|ring)-(logan-express|blue|green|orange|red|silver|bus|ferry|)./
    }
  ],
  theme: {
    extend: tailwindTheme,
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
    ...plugins(),
    // Allows prefixing tailwind classes with LiveView classes to add rules
    // only when LiveView classes are applied, for example:
    //
    //     <div class="phx-click-loading:animate-ping">
    //
    plugin(({ addVariant }) =>
      addVariant("phx-click-loading", [
        ".phx-click-loading&",
        ".phx-click-loading &"
      ])
    ),
    plugin(({ addVariant }) =>
      addVariant("phx-submit-loading", [
        ".phx-submit-loading&",
        ".phx-submit-loading &"
      ])
    ),
    plugin(({ addVariant }) =>
      addVariant("phx-change-loading", [
        ".phx-change-loading&",
        ".phx-change-loading &"
      ])
    ),
    plugin(({ addBase, theme }) =>
      addBase({
        a: {
          fontWeight: theme("fontWeight.medium")
        },
        "h1, h2, h3, h4, h5, h6": {
          fontFamily: theme("fontFamily.heading"),
          fontWeight: theme("fontWeight.bold"),
          marginTop: theme("spacing.11"),
          marginBottom: theme("spacing.3"),
          "&:has(+p)": {
            marginBottom: theme("spacing.1")
          }
        },
        "h1 + h2, h2 + h3, h3 + h4, h4 + h5, h5 + h6, p + h3, p + h4, p + h5, p + h6": {
          marginTop: theme("spacing.4")
        },
        "fieldset legend": {
          fontSize: "initial"
        }
      })
    )
  ]
};

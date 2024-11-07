// See the Tailwind configuration guide for advanced usage
// https://tailwindcss.com/docs/configuration

const plugin = require("tailwindcss/plugin");

const {
  colors,
  content,
  fontFamily,
  plugins,
  safelist
} = require("mbta_metro");

module.exports = {
  corePlugins: {
    preflight: false
  },
  blocklist: ["container", "collapse"],
  content: [
    ...content,
    "./js/**/*.js",
    "./ts/**/*.ts",
    "./ts/**/*.tsx",
    "../lib/dotcom_web.ex",
    "../lib/dotcom_web/**/*.*ex"
  ],
  safelist: [
    ...safelist,
    {
      pattern: /(bg|text|border|ring)-(logan-express|blue|green|orange|red|silver|bus|ferry|)./
    }
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        gray: {
          DEFAULT: "#494f5c",
          dark: "#1c1e23",
          light: "#788093",
          lighter: "#b0b5c0"
        },
        "brand-primary": {
          DEFAULT: "#165c96",
          darkest: "#0b2f4c"
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
        // These will come from the design system someday
        "blue-line": "#003da5",
        "green-line": "#00843d",
        "orange-line": "#ed8b00",
        "red-line": "#da291c",
        "silver-line": "#7c878e",
        "commuter-rail": "#80276c",
        bus: "#ffc72c",
        ferry: "#008eaa"
      }
    },
    fontFamily: {
      ...fontFamily
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
    ...plugins(),
    require("@tailwindcss/forms")({
      // don't make global styles since they conflict with ours
      strategy: "class"
    }),
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
    plugin(({ addUtilities }) =>
      addUtilities({
        ".font-massport": {
          fontFamily: "Helvetica, sans-serif"
        }
      })
    )
  ]
};

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
  important: true,
  content: [
    ...content,
    "./js/**/*.js",
    "./ts/**/*.ts",
    "./ts/**/*.tsx",
    "../lib/dotcom_web.ex",
    "../lib/dotcom_web/**/*.*ex"
  ],
  safelist: [...safelist],
  theme: {
    extend: {
      colors: {
        ...colors
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
    plugin(({ addBase, theme }) =>
      addBase({
        "h1, h2, h3, h4, h5, h6": {
          fontFamily: theme("fontFamily.heading"),
          fontWeight: theme("fontWeight.bold"),
          marginTop: theme("spacing.11"),
          marginBottom: theme("spacing.3"),
          "&:has(+p)": {
            marginBottom: theme("spacing.1")
          }
        },
        h1: {
          fontSize: theme("fontSize.4xl")
        },
        h2: {
          fontSize: theme("fontSize.3xl")
        },
        h3: {
          fontSize: theme("fontSize.2xl")
        },
        h4: {
          fontSize: theme("fontSize.lg")
        },
        h5: {
          fontSize: theme("fontSize.base")
        },
        h6: {
          fontSize: theme("fontSize.sm")
        },
        "h1 + h2, h2 + h3, h3 + h4, h4 + h5, h5 + h6, p + h3, p + h4, p + h5, p + h6": {
          marginTop: theme("spacing.4")
        }
      })
    )
  ]
};

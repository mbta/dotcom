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
  safelist: [...safelist],
  theme: {
    extend: {
      colors: {
        ...colors
      }
    },
    fontFamily: {
      ...fontFamily
    }
  },
  plugins: [
    ...plugins,
    require("@tailwindcss/forms"),
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
    )
  ]
};

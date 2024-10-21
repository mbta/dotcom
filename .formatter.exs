[
  import_deps: [:phoenix],
  plugins: [Phoenix.LiveView.HTMLFormatter],
  inputs: [
    "{config,lib,rel,test}/**/*.{heex,ex,eex,exs}",
    "*.{heex,ex,exs}",
    "storybook/**/*.exs"
  ]
]

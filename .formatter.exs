[
  import_deps: [:phoenix],
  plugins: [Phoenix.LiveView.HTMLFormatter, Styler],
  inputs: [
    "{config,lib,rel,test}/**/*.{heex,ex,eex,exs}",
    "*.{heex,ex,exs}"
  ]
]

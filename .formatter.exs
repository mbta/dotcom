[
  import_deps: [:phoenix],
  plugins: [Phoenix.LiveView.HTMLFormatter],
  inputs: [
    "{config,lib,rel,storybook,test}/**/*.{heex,ex,eex,exs}",
    "*.{heex,ex,exs}"
  ]
]

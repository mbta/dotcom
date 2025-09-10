[
  import_deps: [:ecto, :ecto_sql, :phoenix],
  plugins: [Phoenix.LiveView.HTMLFormatter],
  inputs: [
    "{config,lib,rel,test}/**/*.{heex,ex,eex,exs}",
    "*.{heex,ex,exs}"
  ]
]

import Config

source_path = if config_env() == :dev, do: Path.join(File.cwd!(), "assets/")

config :dotcom, :react,
  source_path: source_path,
  build_path: Path.join(File.cwd!(), "react_renderer/dist/app.js")

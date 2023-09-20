import Config

repo_module = if config_env() == :test, do: RoutePatterns.MockRepo, else: RoutePatterns.Repo

config :route_patterns, :route_patterns_repo_api, repo_module

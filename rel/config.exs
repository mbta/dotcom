use Distillery.Releases.Config,
  # This sets the default release built by `mix release`
  default_release: :site,
  # This sets the default environment used by `mix release`
  default_environment: :prod

# For a full list of config options for both releases
# and environments, visit https://hexdocs.pm/distillery/configuration.html

# You may define one or more environments in this file,
# an environment's settings will override those of a release
# when building in that environment, this combination of release
# and environment configuration is called a profile

environment :prod do
  set(include_erts: true)
  set(include_src: false)

  set(
    config_providers: [
      {Distillery.Releases.Config.Providers.Elixir, ["${RELEASE_ROOT_DIR}/etc/runtime.exs"]}
    ]
  )

  set(
    overlays: [
      {:copy, "config/runtime.exs", "etc/runtime.exs"}
    ]
  )

  set(
    cookie: "NODE_COOKIE" |> System.get_env() |> Kernel.||("prod_web_cookie") |> String.to_atom()
  )
end

# You may define one or more releases in this file.
# If you have not set a default release, or selected one
# when running `mix release`, the first release in the file
# will be used by default

release :site do
  set(version: current_version(:site))
  set(vm_args: "rel/vm.args")

  set(
    applications: [
      :runtime_tools,
      alerts: :permanent,
      cms: :permanent,
      fares: :permanent,
      feedback: :permanent,
      location_service: :permanent,
      holiday: :permanent,
      json_api: :permanent,
      predictions: :permanent,
      repo_cache: :permanent,
      routes: :permanent,
      schedules: :permanent,
      site: :permanent,
      stops: :permanent,
      trip_plan: :permanent,
      util: :permanent,
      v3_api: :permanent,
      vehicles: :permanent,
      zones: :permanent
    ]
  )
end

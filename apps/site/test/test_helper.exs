ExUnit.start()
Application.ensure_all_started(:bypass)
# Ensure tzdata is up to date
{:ok, _} = Application.ensure_all_started(:tzdata)
{:ok, _} = Application.ensure_all_started(:wallaby)
_ = Tzdata.ReleaseUpdater.poll_for_update()
Application.put_env(:wallaby, :base_url, SiteWeb.Endpoint.url())

# Report warnings as errors
Code.compiler_options(warnings_as_errors: true)

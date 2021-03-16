# Ensure the deps are all started
Application.load(:repo_cache)

for app <- Application.spec(:repo_cache, :applications) do
  {:ok, _} = Application.ensure_all_started(app)
end

ExUnit.start()

# Report warnings as errors
Code.compiler_options(warnings_as_errors: true)

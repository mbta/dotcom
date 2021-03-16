# Ensure the deps are all started
Application.load(:fares)

for app <- Application.spec(:fares, :applications) do
  {:ok, _} = Application.ensure_all_started(app)
end

# Report warnings as errors
Code.compiler_options(warnings_as_errors: true)
ExUnit.start(max_cases: 1)

{:ok, _} = Application.ensure_all_started(:bypass)
# Ensure the deps are all started
Application.load(:v3_api)

for app <- Application.spec(:v3_api, :applications) do
  {:ok, _} = Application.ensure_all_started(app)
end

ExUnit.start()

# Report warnings as errors
Code.compiler_options(warnings_as_errors: true)

{:ok, _} = Application.ensure_all_started(:bypass)
# Ensure the deps are all started
Application.ensure_all_started(:v3_api)

ExUnit.start()

# Report warnings as errors
Code.compiler_options(warnings_as_errors: true)

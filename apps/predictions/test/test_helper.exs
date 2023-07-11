{:ok, _} = Application.ensure_all_started(:bypass)
# Ensure the deps are all started
Application.ensure_all_started(:schedules)
Application.ensure_all_started(:predictions)

ExUnit.start()

# Report warnings as errors
Code.compiler_options(warnings_as_errors: true)

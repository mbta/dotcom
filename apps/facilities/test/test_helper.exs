# Ensure the deps are all started
Application.ensure_all_started(:facilities)

# Report warnings as errors
Code.compiler_options(warnings_as_errors: true)
ExUnit.start(max_cases: 1)

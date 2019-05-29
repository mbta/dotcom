ExUnit.start()
Application.ensure_all_started(:bypass)

# Report warnings as errors
Code.compiler_options(warnings_as_errors: true)

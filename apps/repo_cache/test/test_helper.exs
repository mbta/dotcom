# Ensure the deps are all started
Application.ensure_all_started(:repo_cache)

ExUnit.start()

# Report warnings as errors
Code.compiler_options(warnings_as_errors: true)

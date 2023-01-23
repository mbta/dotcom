ExUnit.start()
Application.ensure_all_started(:bypass)

# Don't report warnings as errors... FastLocalDatetime has some warnings for Elixir 1.12
# Can revert after upgrading FastLocalDatetime
Code.compiler_options(warnings_as_errors: false)

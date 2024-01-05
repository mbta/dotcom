defmodule Test.Support.EnvHelpers do
  @moduledoc "Helpers for reassigning env variables"

  @doc """
  Quickly set the (elixir application, not system) environment variable to a
  custom value, resetting to its current value when the test is done. Use within
  a test:

  ```
  reassign_env(:dotcom, :aws_index_prefix, "dotcom-prod")
  ```
  """
  defmacro reassign_env(app, var, value) do
    quote do
      old_value = Application.get_env(unquote(app), unquote(var))
      Application.put_env(unquote(app), unquote(var), unquote(value))

      on_exit(fn ->
        if old_value == nil do
          Application.delete_env(unquote(app), unquote(var))
        else
          Application.put_env(unquote(app), unquote(var), old_value)
        end
      end)
    end
  end
end

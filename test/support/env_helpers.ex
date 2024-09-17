defmodule Test.Support.EnvHelpers do
  @moduledoc "Helpers for reassigning env variables"

  @doc """
  Quickly set the (elixir application, not system) environment variable to a
  custom value, resetting to its current value when the test is done. Use within
  a test:

  ```
  reassign_env(:dotcom, :key, "value")
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

  defmacro set_log_level(new_level) do
    quote do
      old_level = Logger.level()
      Logger.configure(level: unquote(new_level))

      on_exit(fn ->
        Logger.configure(level: old_level)
      end)
    end
  end
end

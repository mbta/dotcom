defmodule Util do
  @moduledoc "Utilities module"

  require Logger

  {:ok, endpoint} = Application.compile_env(:dotcom, :util_endpoint)
  {:ok, route_helper_module} = Application.compile_env(:dotcom, :util_router_helper_module)

  @endpoint endpoint
  @route_helper_module route_helper_module

  @doc """
  Converts an `{:error, _}` tuple to a default value.

  ## Examples

      iex> Util.error_default(:value, :default)
      :value

      iex> Util.error_default({:error, :tuple}, :default)
      :default
  """
  @spec error_default(value | {:error, any}, value) :: value
        when value: any
  def error_default(error_or_default, default)

  def error_default({:error, _}, default) do
    default
  end

  def error_default(value, _default) do
    value
  end

  @doc """

  Returns an id property in a struct or nil

  """
  def safe_id(%{id: id}), do: id
  def safe_id(nil), do: nil

  @doc "Interleaves two lists. Appends the remaining elements of the longer list"
  @spec interleave(list, list) :: list
  def interleave([h1 | t1], [h2 | t2]), do: [h1, h2 | interleave(t1, t2)]
  def interleave([], l), do: l
  def interleave(l, []), do: l

  @doc """
  Calls all the functions asynchronously, and returns a list of results.
  If a function times out, its result will be the provided default.
  """
  @spec async_with_timeout([(-> any)], any, atom, non_neg_integer, non_neg_integer) :: [any]
  def async_with_timeout(functions, default, module, timeout \\ 5000, retries \\ 0)
      when is_list(functions) and is_atom(module) do
    functions
    |> Enum.map(&Task.async/1)
    |> Task.yield_many(timeout)
    |> Enum.with_index()
    |> Enum.map(&task_result_or_default_loop(&1, default, module, retries))
  end

  # If a number of retries was specified, then go through those retries before settling on
  # the default value.
  defp task_result_or_default_loop({{task, result}, index}, default, module, retries) do
    if retries > 0 do
      case task_result_or_default(result, default, task, module, index) do
        x when x == default ->
          task_result_or_default_loop({{task, result}, index}, default, module, retries - 1)

        any ->
          any
      end
    else
      task_result_or_default(result, default, task, module, index)
    end
  end

  @doc """
  Yields the value from a task, or returns a default value.
  """
  @spec yield_or_default(Task.t(), non_neg_integer, any, atom) :: any
  def yield_or_default(%Task{} = task, timeout, default, module) when is_atom(module) do
    task
    |> Task.yield(timeout)
    |> task_result_or_default(default, task, module, "")
  end

  @doc """
  Takes a map of tasks and calls &Task.yield_many/2 on them, then rebuilds the map with
  either the result of the task, or the default if the task times out or exits early.
  """
  @type task_map :: %{optional(Task.t()) => {atom, any}}
  @spec yield_or_default_many(task_map, atom, non_neg_integer) :: map
  def yield_or_default_many(%{} = task_map, module, timeout \\ 5000) when is_atom(module) do
    task_map
    |> Map.keys()
    |> Task.yield_many(timeout)
    |> Map.new(&do_yield_or_default_many(&1, task_map, module))
  end

  @spec do_yield_or_default_many({Task.t(), {:ok, any} | {:exit, term} | nil}, task_map, atom) ::
          {atom, any}
  defp do_yield_or_default_many({%Task{} = task, result}, task_map, module) do
    {key, default} = Map.get(task_map, task)
    {key, task_result_or_default(result, default, task, module, key)}
  end

  @spec task_result_or_default({:ok, any} | {:exit, term} | nil, any, Task.t(), atom, any) :: any
  defp task_result_or_default({:ok, result}, _default, _task, _module, _key) do
    result
  end

  defp task_result_or_default({:exit, reason}, default, _task, module, key) do
    _ =
      Logger.warning(
        "module=#{module} " <>
          "key=#{key} " <>
          "error=async_error " <>
          "error_type=timeout " <>
          "Async task exited for reason: #{inspect(reason)} -- Defaulting to: #{inspect(default)}"
      )

    default
  end

  defp task_result_or_default(nil, default, %Task{} = task, module, key) do
    case Task.shutdown(task, :brutal_kill) do
      {:ok, result} ->
        result

      _ ->
        _ =
          Logger.warning(
            "module=#{module} " <>
              "key=#{key} " <>
              "error=async_error " <>
              "error_type=timeout " <>
              "Async task timed out -- Defaulting to: #{inspect(default)}"
          )

        default
    end
  end

  @doc """
  Makes `DotcomWeb.Router.Helpers` available to other apps.

  ## Examples

      iex> Util.site_path(:schedule_path, [:show, "test"])
      "/schedules/test"
  """
  @spec site_path(atom, [any]) :: String.t()
  def site_path(helper_fn, opts) when is_list(opts) do
    apply(@route_helper_module, helper_fn, [@endpoint | opts])
  end

  @doc """
  Fetches config values, handling system env and default values.
  """
  @spec config(atom, atom, atom) :: any
  def config(app, key, subkey) do
    {:ok, val} =
      app
      |> Application.fetch_env!(key)
      |> Access.fetch(subkey)

    do_config(val)
  end

  @spec config(atom, atom) :: any
  def config(app, key) do
    app
    |> Application.get_env(key)
    |> do_config()
  end

  defp do_config(val) do
    case val do
      {:system, envvar, default} ->
        System.get_env(envvar) || default

      {:system, envvar} ->
        System.get_env(envvar)

      value ->
        value
    end
  end

  @doc """
  Logs how long a function call took.
  """
  @spec log_duration(atom, atom, [any]) :: any
  def log_duration(module, function, args) do
    {time, result} = :timer.tc(module, function, args)
    time = time / :timer.seconds(1)

    _ =
      Logger.info(fn ->
        "module=#{module} function=#{function} duration=#{time}"
      end)

    result
  end
end

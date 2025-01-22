defmodule Dotcom.TripPlan.DateTime do
  @moduledoc "Useful functions for time and date manipulations"
  alias Dotcom.TripPlan.Query

  @type time_type :: :depart_at | :arrive_by
  @type date_error :: :invalid_date | {:too_future, DateTime.t()} | {:past, DateTime.t()}
  @type date_time :: {time_type, DateTime.t()} | {:error, date_error}

  @spec validate(Query.t(), map, Keyword.t()) :: Query.t()
  def validate(%Query{} = query, %{"date_time" => dt} = params, opts) do
    {:ok, now} = Keyword.fetch(opts, :now)
    {:ok, end_of_rating} = Keyword.fetch(opts, :end_of_rating)
    type = get_departure_type(params)

    dt
    |> Util.parse()
    |> future_date_or_error(now)
    |> verify_inside_rating(end_of_rating)
    |> round_minute()
    |> do_validate(type, query)
  end

  def validate(%Query{} = query, params, opts) do
    {:ok, now} = Keyword.fetch(opts, :now)
    validate(query, Map.put(params, "date_time", now), opts)
  end

  @spec do_validate(DateTime.t() | {:error, any}, String.t() | nil, Query.t()) :: Query.t()
  defp do_validate({:error, {error, %DateTime{} = dt}}, type, query) when error in [:too_future, :past] do
    errors = MapSet.put(query.errors, error)
    do_validate(dt, type, %{query | errors: errors})
  end

  defp do_validate({:error, error}, _, query) when is_atom(error) do
    %{query | time: {:error, error}, errors: MapSet.put(query.errors, error)}
  end

  defp do_validate(%DateTime{} = dt, "depart", query) do
    %{query | time: {:depart_at, dt}}
  end

  defp do_validate(%DateTime{} = dt, "arrive", query) do
    %{query | time: {:arrive_by, dt}}
  end

  @spec future_date_or_error(
          DateTime.t() | NaiveDateTime.t() | {:error, any},
          DateTime.t()
        ) :: DateTime.t() | {:error, {:past, DateTime.t()}}
  defp future_date_or_error({:error, :invalid_date}, %DateTime{}) do
    {:error, :invalid_date}
  end

  defp future_date_or_error(%DateTime{} = now, %DateTime{} = system_dt) do
    do_future_date_or_error(now, system_dt)
  end

  defp future_date_or_error(%NaiveDateTime{} = naive_dt, %DateTime{} = system_dt) do
    naive_dt
    |> Timex.to_datetime(system_dt.time_zone)
    |> handle_ambiguous_time()
    |> do_future_date_or_error(system_dt)
  end

  @spec do_future_date_or_error(DateTime.t(), DateTime.t()) ::
          DateTime.t() | {:error, {:past, DateTime.t()}}
  defp do_future_date_or_error(%DateTime{} = input, %DateTime{} = now) do
    # input within the past hour is considered "now"
    if Timex.before?(input, Timex.shift(now, hours: -1)) do
      {:error, {:past, input}}
    else
      input
    end
  end

  @spec handle_ambiguous_time(DateTime.t() | Timex.AmbiguousDateTime.t()) :: DateTime.t()
  defp handle_ambiguous_time(%DateTime{} = dt) do
    dt
  end

  defp handle_ambiguous_time(%Timex.AmbiguousDateTime{before: before}) do
    # if you select a date/time during the DST transition, the service
    # will still be running under the previous timezone. Therefore, we
    # pick the "before" time which is n the original zone.
    before
  end

  @spec verify_inside_rating(
          DateTime.t()
          | {:error, :invalid_date}
          | {:error, {:past, DateTime.t()}},
          Date.t()
        ) ::
          DateTime.t()
          | {:error, :invalid_date}
          | {:error, {:past, DateTime.t()}}
          | {:error, {:too_future, DateTime.t()}}
  defp verify_inside_rating({:error, error}, %Date{}) do
    {:error, error}
  end

  defp verify_inside_rating(%DateTime{} = dt, %Date{} = end_of_rating) do
    dt
    |> Util.service_date()
    |> Date.compare(end_of_rating)
    |> case do
      :gt -> {:error, {:too_future, dt}}
      _ -> dt
    end
  end

  @doc """
  Takes a DateTime and rounds it to the next round 5 minute interval.
  """
  @spec round_minute(DateTime.t() | {:error, any}) :: DateTime.t() | {:error, any}
  def round_minute(%DateTime{} = dt) do
    dt.minute
    |> Integer.mod(5)
    |> case do
      0 -> dt
      mod -> Timex.shift(dt, minutes: 5 - mod)
    end
  end

  def round_minute({:error, error}) do
    {:error, error}
  end

  @spec get_departure_type(map) :: String.t()
  defp get_departure_type(params) do
    case Map.get(params, "time") do
      "arrive" -> "arrive"
      _ -> "depart"
    end
  end
end

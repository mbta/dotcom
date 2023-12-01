defmodule TripPlan.Api.OpenTripPlanner.Builder do
  alias TripPlan.Api.OpenTripPlanner, as: OTP
  alias TripPlan.NamedPosition
  alias Util.Position

  @doc "Convert general planning options into query params for OTP"
  @spec build_params(Position.t(), Position.t(), TripPlan.Api.plan_opts()) ::
          {:ok, %{String.t() => String.t()}} | {:error, any}
  def build_params(from, to, opts) do
    from_string = location(from)
    to_string = location(to)
    default_mode_string = "[{mode: WALK}, {mode: TRANSIT}]"

    do_build_params(opts, %{
      "fromPlace" => from_string,
      "toPlace" => to_string,
      "transportModes" => default_mode_string,
      "walkReluctance" => 15,
      "locale" => "\"en\""
    })
  end

  defp location(%NamedPosition{stop_id: stop_id} = np) when not is_nil(stop_id) do
    "\"#{np.name}::mbta-ma-us:#{stop_id}\""
  end

  defp location(%NamedPosition{} = np) do
    "\"#{np.name}::#{Position.latitude(np)},#{Position.longitude(np)}\""
  end

  defp location(position) do
    "\"#{Position.latitude(position)},#{Position.longitude(position)}\""
  end

  defp do_build_params([], acc) do
    {:ok, acc}
  end

  defp do_build_params([{:wheelchair_accessible?, bool} | rest], acc) when is_boolean(bool) do
    acc =
      if bool do
        put_in(acc["wheelchair"], "true")
      else
        acc
      end

    do_build_params(rest, acc)
  end

  defp do_build_params([{:depart_at, %DateTime{} = datetime} | rest], acc) do
    acc = do_date_time("false", datetime, acc)
    do_build_params(rest, acc)
  end

  defp do_build_params([{:arrive_by, %DateTime{} = datetime} | rest], acc) do
    acc = do_date_time("true", datetime, acc)
    do_build_params(rest, acc)
  end

  defp do_build_params([{:mode, []} | rest], acc) do
    do_build_params(rest, acc)
  end

  defp do_build_params([{:mode, [_ | _] = modes} | rest], acc) do
    all_modes = Enum.map(modes, fn m -> "{mode: #{m}}" end)
    joined_modes = "[#{Enum.join(all_modes, ", ")}, {mode: WALK}]"
    do_build_params(rest, Map.put(acc, "transportModes", joined_modes))
  end

  defp do_build_params([{:optimize_for, :less_walking} | rest], acc) do
    do_build_params(rest, Map.put(acc, "walkReluctance", 27))
  end

  defp do_build_params([{:optimize_for, :fewest_transfers} | rest], acc) do
    do_build_params(rest, Map.put(acc, "transferPenalty", 100))
  end

  # param is used for testing, ignore
  defp do_build_params([{:root_url, _} | rest], acc) do
    do_build_params(rest, acc)
  end

  defp do_build_params([option | _], _) do
    {:error, {:bad_param, option}}
  end

  defp do_date_time(arriveBy, %DateTime{} = datetime, acc) do
    local = Timex.to_datetime(datetime, OTP.config(:timezone))
    date = Timex.format!(local, "\"{ISOdate}\"")
    time = Timex.format!(local, "\"{h12}:{0m}{am}\"")

    Map.merge(acc, %{
      "date" => date,
      "time" => time,
      "arriveBy" => arriveBy
    })
  end
end

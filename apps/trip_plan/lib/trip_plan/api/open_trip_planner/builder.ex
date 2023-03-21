defmodule TripPlan.Api.OpenTripPlanner.Builder do
  alias TripPlan.Api.OpenTripPlanner, as: OTP
  alias Util.{Polygon, Position}
  @ten_miles 16_093

  @doc "Convert general planning options into query params for OTP"
  @spec build_params(Position.t(), Position.t(), TripPlan.Api.plan_opts()) ::
          {:ok, %{String.t() => String.t()}} | {:error, any}
  def build_params(from, to, opts) do
    opts = configure_walk_distance(from, to, opts)
    do_build_params(opts, %{"mode" => "TRANSIT,WALK", "walkReluctance" => 5})
  end

  defp configure_walk_distance(from, to, opts) do
    polygon = Application.get_env(:trip_plan, ReducedWalkingArea, [])

    if Polygon.inside?(polygon, from) and Polygon.inside?(polygon, to) do
      opts
    else
      put_in(opts[:max_walk_distance], @ten_miles)
    end
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

  defp do_build_params([{:max_walk_distance, meters} | rest], acc) when is_number(meters) do
    acc = put_in(acc["maxWalkDistance"], "#{meters}")
    do_build_params(rest, acc)
  end

  defp do_build_params([{:transitReluctanceForMode, []} | rest], acc) do
    acc = put_in(acc["SUBWAY"], 5)
    do_build_params(rest, acc)
  end

  defp do_build_params([{:depart_at, %DateTime{} = datetime} | rest], acc) do
    local = Timex.to_datetime(datetime, OTP.config(:timezone))
    date = Timex.format!(local, "{ISOdate}")
    time = Timex.format!(local, "{h12}:{0m}{am}")

    acc =
      Map.merge(acc, %{
        "date" => date,
        "time" => time,
        "arriveBy" => "false"
      })

    do_build_params(rest, acc)
  end

  defp do_build_params([{:arrive_by, %DateTime{} = datetime} | rest], acc) do
    local = Timex.to_datetime(datetime, OTP.config(:timezone))
    date = Timex.format!(local, "{ISOdate}")
    time = Timex.format!(local, "{h12}:{0m}{am}")

    acc =
      Map.merge(acc, %{
        "date" => date,
        "time" => time,
        "arriveBy" => "true"
      })

    do_build_params(rest, acc)
  end

  defp do_build_params([{:mode, []} | rest], acc) do
    do_build_params(rest, acc)
  end

  defp do_build_params([{:mode, [_ | _] = modes} | rest], acc) do
    all_modes = Enum.join(modes, ",") <> ",WALK"
    do_build_params(rest, Map.put(acc, "mode", all_modes))
  end

  defp do_build_params([{:optimize_for, :less_walking} | rest], acc) do
    do_build_params(rest, Map.put(acc, "walkReluctance", 17))
  end

  defp do_build_params([{:optimize_for, :fewest_transfers} | rest], acc) do
    do_build_params(rest, Map.put(acc, "transferPenalty", 100))
  end

  defp do_build_params([{:root_url, url} | rest], acc) do
    acc = Map.put(acc, "root_url", url)
    do_build_params(rest, acc)
  end

  defp do_build_params([option | _], _) do
    {:error, {:bad_param, option}}
  end
end

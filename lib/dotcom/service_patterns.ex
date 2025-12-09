defmodule Dotcom.ServicePatterns do
  @moduledoc """
  Information about transit service!
  """

  use Nebulex.Caching.Decorators

  alias Dotcom.Utils.ServiceDateTime

  @cache Application.compile_env!(:dotcom, :cache)

  @doc """
  Uses schedules to determine whether service is running. Defaults to the current service date, and supports custom dates.

  iex> has_service?(route: "351", date: ~D[2025-12-25]) # false
  iex> has_service?(route: "CR-Foxboro") # probably false
  iex> has_service?(route: "1") # true, assuming it's scheduled
  """
  def has_service?(opts) do
    {date, opts} = Keyword.pop(opts, :date, ServiceDateTime.service_date())
    has_service?(opts, date)
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: :timer.hours(24)])
  defp has_service?(opts, date) do
    params =
      ["fields[schedule]": ""]
      |> Keyword.put(:"filter[route]", Keyword.get(opts, :route))
      |> Keyword.put(:date, Date.to_iso8601(date))

    case MBTA.Api.Schedules.all(params) do
      %JsonApi{data: [_ | _]} -> true
      {:error, [%JsonApi.Error{} = error]} -> raise error
      _ -> false
    end
  end
end

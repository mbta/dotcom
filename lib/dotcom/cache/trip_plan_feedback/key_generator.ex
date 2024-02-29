defmodule Dotcom.Cache.TripPlanFeedback.KeyGenerator do
  @moduledoc """
  Generate a readable cache key which includes details to identify a unique trip
  planner itinerary feedback form.
  """
  @behaviour Nebulex.Caching.KeyGenerator

  @impl Nebulex.Caching.KeyGenerator
  def generate(mod, _fun, [
        %{
          "itinerary_index" => index,
          "generated_user_id" => user_id,
          "generated_time" => timestamp
        }
      ]) do
    "#{clean_mod(mod)}|#{env_name()}|#{user_id}|#{timestamp}|#{index}"
  end

  defp env_name do
    System.get_env("SENTRY_ENVIRONMENT", "local")
  end

  defp clean_mod(mod) do
    mod
    |> Kernel.to_string()
    |> String.split(".")
    |> (fn [_ | tail] -> tail end).()
    |> Enum.join(".")
    |> String.downcase()
  end
end

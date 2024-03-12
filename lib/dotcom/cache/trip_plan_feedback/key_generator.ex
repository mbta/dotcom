defmodule Dotcom.Cache.TripPlanFeedback.KeyGenerator do
  @moduledoc """
  Generate a readable cache key which includes details to identify a unique trip
  planner itinerary feedback form.
  """
  @behaviour Nebulex.Caching.KeyGenerator

  @impl Nebulex.Caching.KeyGenerator
  def generate(mod, _fun, [
        %{
          "itinerary_index" => itinerary_index,
          "generated_user_id" => generated_user_id,
          "generated_time" => generated_time
        }
      ]) do
    "#{clean_mod(mod)}|#{env_name()}|#{generated_user_id}|#{generated_time}|#{itinerary_index}"
  end

  defp env_name do
    System.get_env("SENTRY_ENVIRONMENT", "local")
  end

  defp clean_mod(mod) do
    mod
    |> Kernel.to_string()
    |> String.split(".")
    |> (fn [_ | tail] -> tail end).()
    |> Enum.map(&Recase.to_snake/1)
    |> Enum.join(".")
    |> String.downcase()
  end
end

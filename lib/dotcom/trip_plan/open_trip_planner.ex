defmodule Dotcom.TripPlan.OpenTripPlanner do
  @moduledoc """
  Makes requests to OpenTripPlanner via the OpenTripPlannerClient library.
  """

  require Logger

  import Dotcom.TripPlan.Loops, only: [merge_loop_legs: 1]
  import DotcomWeb.Components.TripPlanner.Helpers, only: [fallback_error_message: 0]

  alias Dotcom.TripPlan.{InputForm, Loops}

  @otp_module Application.compile_env!(:dotcom, :otp_module)

  @doc """
  Requests to OpenTripPlanner's /plan GraphQL endpoint and parses the response..
  """
  @spec plan(InputForm.t()) :: OpenTripPlannerClient.Behaviour.plan_result()

  def plan(%InputForm{} = input_form) do
    case input_form |> to_params() |> @otp_module.plan() do
      {:ok, itinerary_groups} -> {:ok, merge_loop_legs(itinerary_groups)}
      error -> error
    end
  rescue
    error ->
      _ =
        Logger.error(
          "#{Exception.format(:error, error, __STACKTRACE__)} module=#{__MODULE__} input_form=#{inspect(Map.from_struct(input_form))}"
        )

      {:error, fallback_error_message()}
  end

  def to_params(form) do
    OpenTripPlannerClient.PlanParams.new(form.from, form.to,
      arrive_by: form.datetime_type == "arrive_by",
      modes: InputForm.Modes.selected_mode_keys(form.modes),
      datetime: form.datetime,
      wheelchair: form.wheelchair,
      num_itineraries: 100
    )
  end
end

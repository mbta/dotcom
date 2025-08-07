defmodule Dotcom.TripPlan.OpenTripPlanner do
  @moduledoc """
  Makes requests to OpenTripPlanner via the OpenTripPlannerClient library.
  """

  require Logger

  alias Dotcom.TripPlan.InputForm

  @otp_module Application.compile_env!(:dotcom, :otp_module)

  @doc """
  Requests to OpenTripPlanner's /plan GraphQL endpoint and parses the response..
  """
  @spec plan(InputForm.t()) :: OpenTripPlannerClient.Behaviour.plan_result()

  def plan(%InputForm{} = input_form) do
    input_form
    |> to_params()
    |> @otp_module.plan()
  rescue
    error ->
      _ =
        Logger.error(
          "#{Exception.format(:error, error, __STACKTRACE__)} module=#{__MODULE__} input_form=#{inspect(Map.from_struct(input_form))}"
        )

      message =
        Application.get_env(
          :open_trip_planner_client,
          :fallback_error_message,
          "Cannot connect to OpenTripPlanner. Please try again later."
        )

      {:error, message}
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

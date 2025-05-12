defmodule Dotcom.TripPlan.OpenTripPlanner do
  @moduledoc """
  Makes requests to OpenTripPlanner via the OpenTripPlannerClient library.
  """

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

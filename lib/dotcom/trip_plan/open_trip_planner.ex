defmodule Dotcom.TripPlan.OpenTripPlanner do
  @moduledoc """
  Makes requests to OpenTripPlanner via the OpenTripPlannerClient library.
  """

  require Logger

  import DotcomWeb.Components.TripPlanner.Helpers, only: [fallback_error_message: 0]

  alias Dotcom.TripPlan.InputForm

  @otp_module Application.compile_env!(:dotcom, :otp_module)

  @doc """
  Requests to OpenTripPlanner's /plan GraphQL endpoint and parses the response..
  """
  @spec plan(InputForm.t()) :: OpenTripPlannerClient.Behaviour.plan_result()

  def plan(%InputForm{} = input_form) do
    {microseconds, result} = :timer.tc(@otp_module, :plan, [to_params(input_form)])
    milliseconds = microseconds / :timer.seconds(1)
    Logger.metadata(duration: milliseconds)

    case result do
      {:ok, itinerary_groups} ->
        _ = Logger.info("result=OK")
        {:ok, itinerary_groups}

      {:error, error} ->
        _ = Logger.warning("result=#{inspect(error)}")
        {:error, error}
    end
  rescue
    error ->
      _ =
        Logger.error("result=exception #{Exception.format(:error, error, __STACKTRACE__)}")

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

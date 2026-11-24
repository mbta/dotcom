defmodule Dotcom.TripPlan.OpenTripPlanner do
  @moduledoc """
  Makes requests to OpenTripPlanner via the OpenTripPlannerClient library.
  """

  require Logger

  import DotcomWeb.Components.TripPlanner.Helpers, only: [fallback_error_message: 0]

  alias Dotcom.TripPlan.InputForm
  alias OpenTripPlannerClient.{ItineraryGroup, Plan, Plan.RoutingError}

  @otp_module Application.compile_env!(:dotcom, :otp_module)

  @doc """
  Requests to OpenTripPlanner's /plan GraphQL endpoint and parses the response.
  Returns itinerary groups when itineraries are available, even with routing errors.
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

      {:error, %Req.TransportError{reason: :timeout} = error} ->
        _ = Logger.warning("result=timeout")
        {:error, error}

      {:error, %Plan{itineraries: [], routing_errors: [%RoutingError{code: code} | _]} = error} ->
        # This is something like "no transit connection" or "no stops in range"
        # We return an error tuple so the view can show the right thing, but
        # it's logged at info level because it's a normal valid result.
        _ = Logger.info("result=OK routing_error=#{code}")
        {:error, error}

      {:error, %Plan{itineraries: [_ | _] = itineraries}} ->
        # We're not sure what this result means but have seen it in logs
        # This gets logged with a special result
        itinerary_groups =
          ItineraryGroup.groups_from_itineraries(itineraries,
            take_from_end: input_form.datetime_type == "arrive_by"
          )

        _ = Logger.info("result=otp_error")
        {:ok, itinerary_groups}

      {:error, error} ->
        _ = Logger.warning("result=error error=#{inspect(error)}")
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

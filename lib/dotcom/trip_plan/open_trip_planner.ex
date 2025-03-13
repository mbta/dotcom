defmodule Dotcom.TripPlan.OpenTripPlanner do
  @moduledoc """
  Makes requests to OpenTripPlanner via the OpenTripPlannerClient library, and
  parses the result.
  """

  alias OpenTripPlannerClient.QueryResult
  alias Dotcom.TripPlan.{InputForm, NamedPosition, Parser}

  alias OpenTripPlannerClient.ItineraryTag.{
    EarliestArrival,
    LeastWalking,
    MostDirect,
    ShortestTrip
  }

  alias OpenTripPlannerClient.Plan

  @otp_module Application.compile_env!(:dotcom, :otp_module)

  @doc """
  Requests to OpenTripPlanner's /plan GraphQL endpoint and parses the response..
  """
  @spec plan(InputForm.t()) :: OpenTripPlannerClient.Behaviour.plan_result()
  @spec plan(NamedPosition.t(), NamedPosition.t(), Keyword.t()) ::
          OpenTripPlannerClient.Behaviour.plan_result()

  def plan(%InputForm{} = input_form) do
    input_form
    |> InputForm.to_params()
    |> @otp_module.plan()
    |> parse()
  end

  def plan(%NamedPosition{} = from, %NamedPosition{} = to, opts) do
    with from <- NamedPosition.to_keywords(from),
         to <- NamedPosition.to_keywords(to),
         opts <- Keyword.put_new(opts, :tags, tags(opts)) do
      @otp_module.plan(from, to, opts)
      |> parse()
    end
  end

  def tags(opts) do
    if Keyword.has_key?(opts, :arrive_by) do
      [ShortestTrip, MostDirect, LeastWalking]
    else
      [EarliestArrival, MostDirect, LeastWalking]
    end
  end

  defp parse({:error, _} = error), do: error

  defp parse({:ok, query_result}) do
    %QueryResult{
      actual_plan: %Plan{itineraries: actual_itineraries},
      ideal_plan: %Plan{itineraries: ideal_itineraries}
    } = query_result

    {:ok,
     %{
       actual_itineraries: Enum.map(actual_itineraries, &Parser.parse/1),
       ideal_itineraries: Enum.map(ideal_itineraries, &Parser.parse/1)
     }}
  end
end

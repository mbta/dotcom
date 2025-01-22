defmodule Dotcom.TripPlan.OpenTripPlanner do
  @moduledoc """
  Makes requests to OpenTripPlanner via the OpenTripPlannerClient library, and
  parses the result.
  """

  alias Dotcom.TripPlan.InputForm
  alias Dotcom.TripPlan.NamedPosition
  alias Dotcom.TripPlan.Parser
  alias OpenTripPlannerClient.ItineraryTag.EarliestArrival
  alias OpenTripPlannerClient.ItineraryTag.LeastWalking
  alias OpenTripPlannerClient.ItineraryTag.MostDirect
  alias OpenTripPlannerClient.ItineraryTag.ShortestTrip

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
    from = NamedPosition.to_keywords(from)
    to = NamedPosition.to_keywords(to)
    opts = Keyword.put_new(opts, :tags, tags(opts))

    from
    |> @otp_module.plan(to, opts)
    |> parse()
  end

  def tags(opts) do
    if Keyword.has_key?(opts, :arrive_by) do
      [ShortestTrip, MostDirect, LeastWalking]
    else
      [EarliestArrival, MostDirect, LeastWalking]
    end
  end

  defp parse({:error, _} = error), do: error

  defp parse({:ok, %OpenTripPlannerClient.Plan{itineraries: itineraries}}) do
    {:ok, Enum.map(itineraries, &Parser.parse/1)}
  end
end

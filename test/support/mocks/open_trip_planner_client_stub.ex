defmodule Test.Support.OpenTripPlannerClientStub do
  @moduledoc """
  An implementation of `OpenTripPlannerClient.Behaviour`.

  Can be used in tests with
  ```elixir
  Mox.stub_with(OpenTripPlannerClient.Mock, Test.Support.OpenTripPlannerClientStub)
  ```
  """
  @behaviour OpenTripPlannerClient.Behaviour

  @impl OpenTripPlannerClient.Behaviour
  def plan(from, to, opts) do
    plan(from, to, opts, self())
  end

  def plan(from, to, opts, parent) do
    itineraries = []
    send(parent, {:planned_trip, {from, to, opts}, {:ok, itineraries}})
    {:ok, itineraries}
  end
end

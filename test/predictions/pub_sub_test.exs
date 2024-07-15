defmodule Predictions.PubSubTest do
  use ExUnit.Case, async: false

  import Mox

  alias Predictions.PubSub
  alias Test.Support.Factories.RoutePatterns.RoutePattern

  @stop Faker.Lorem.word()
  @channel "stop:#{@stop}"

  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]

  setup :verify_on_exit!

  describe "subscribe/2" do
    test "returns predictions" do
      expect(@route_patterns_repo, :by_stop_id, fn @stop ->
        [RoutePattern.build(:route_pattern)]
      end)

      predictions = PubSub.subscribe(@channel)

      assert predictions == []
    end
  end

  describe "handle_call/3" do
  end

  describe "handle_cast/2" do
  end

  describe "handle_info/2" do
  end
end

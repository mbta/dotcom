defmodule Predictions.PubSubTest do
  use ExUnit.Case, async: false

  import Mox

  alias Predictions.PubSub
  alias Test.Support.Factories.RoutePatterns.RoutePattern

  @stop Faker.Lorem.word()
  @channel "stop:#{@stop}"

  @predictions_store Application.compile_env!(:dotcom, :predictions_store)
  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]

  setup :set_mox_global
  setup :verify_on_exit!

  describe "subscribe/2" do
    test "returns predictions" do
      expect(@route_patterns_repo, :by_stop_id, fn @stop ->
        [RoutePattern.build(:route_pattern)]
      end)

      expect(@predictions_store, :fetch, fn _ ->
        {:reply, [], :foo}
      end)

      assert {:reply, [], :foo} = PubSub.subscribe(@channel)
    end
  end

  describe "handle_call/3" do
  end

  describe "handle_cast/2" do
  end

  describe "handle_info/2" do
  end
end

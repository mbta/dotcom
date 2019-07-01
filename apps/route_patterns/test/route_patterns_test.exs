defmodule RoutePatternsTest do
  use ExUnit.Case
  doctest RoutePatterns

  test "greets the world" do
    assert RoutePatterns.hello() == :world
  end
end

defmodule Dotcom.PolylineHelpersTest do
  use DotcomWeb.ConnCase, async: true

  import PolylineHelpers

  test "remove duplicates among a list of polylines and decrease precision" do
    input = [
      Polyline.encode([{1.3333333, 1.333333}, {2.333333, 2.333333}, {3.333333, 3.3333333}]),
      Polyline.encode([
        {1.3333333, 1.333333},
        {2.333333, 2.333333},
        {3.333333, 3.3333333},
        {4.333333, 4.333333}
      ])
    ]

    expects = [
      Polyline.encode([{4.3333, 4.3333}]),
      Polyline.encode([{1.3333, 1.3333}, {2.3333, 2.3333}, {3.3333, 3.3333}])
    ]

    output = condense(input)
    assert output == expects
  end

  test "do not decrease length of polyline" do
    input = do_line_measumenent(0..50)
    expects = do_condence(input)
    assert input == expects
  end

  test "reduce polyline by 50%" do
    input = do_line_measumenent(0..100)
    shortened = do_condence(input)
    assert do_percent(input, shortened) == 0.5
  end

  test "reduce polyline by 75%" do
    input = do_line_measumenent(0..150)
    shortened = do_condence(input)
    assert do_percent(input, shortened) == 0.25
  end

  test "reduce polyline by ~80%" do
    input = do_line_measumenent(0..Enum.random(250..500))
    shortened = do_condence(input)
    assert Float.floor(do_percent(input, shortened), 1) == 0.2
  end

  test "eliminate empty polylines" do
    input = [
      Polyline.encode([{1, 1}]),
      Polyline.encode([])
    ]

    expects = [
      Polyline.encode([{1, 1}])
    ]

    output = condense(input)
    assert output == expects
  end

  defp do_percent(original, condensed) do
    Float.floor(byte_size(condensed) / byte_size(original), 2)
  end

  defp do_line_measumenent(range) do
    range
    |> Enum.map(&{&1, &1})
    |> Polyline.encode()
  end

  defp do_condence(polyline) do
    [polyline]
    |> condense
    |> List.first()
  end
end

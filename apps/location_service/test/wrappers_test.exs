defmodule LocationService.WrappersTest do
  use ExUnit.Case, async: false

  import LocationService.Wrappers
  import Mock

  describe "google_autocomplete/3" do
    test "formats google results" do
      with_mock GoogleMaps.Place,
        autocomplete: fn _ ->
          {:ok,
           [
             %{
               description: "Test",
               matched_substrings: [%{"offset" => 0, "length" => 2}]
             }
           ]}
        end do
        {:ok, results} = google_autocomplete("test", 2, "")

        assert [
                 %LocationService.Suggestion{
                   address: "Test",
                   highlighted_spans: [
                     %LocationService.Utils.HighlightedSpan{
                       length: 2,
                       offset: 0
                     }
                   ]
                 }
               ] = results
      end
    end

    test "bubbles errors" do
      with_mock GoogleMaps.Place,
        autocomplete: fn _ -> {:error, :oops} end do
        assert {:error, :oops} = google_autocomplete("oops", 6, "")
      end
    end
  end
end

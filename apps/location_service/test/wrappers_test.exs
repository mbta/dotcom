defmodule LocationService.WrappersTest do
  use ExUnit.Case, async: true

  import LocationService.Wrappers
  import Mock

  describe "google_autocomplete/3" do
    test "formats google results" do
      with_mock GoogleMaps.Place,
        autocomplete: fn _ ->
          {:ok,
           [
             %{
               description: "Test"
             }
           ]}
        end do
        {:ok, results} = google_autocomplete("test", 2, "")

        assert [
                 %LocationService.Suggestion{
                   address: "Test"
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

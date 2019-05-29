defmodule SiteWeb.StopController.CuratedStreetViewTest do
  use ExUnit.Case
  alias SiteWeb.StopController.CuratedStreetView

  describe "url/1" do
    test "finds url for stop" do
      assert CuratedStreetView.url("place-sstat") ==
               "https://www.google.com/maps/@42.3525788,-71.0553574,3a,75y,163.27h,107.69t/data=!3m6!1e1!3m4!1sanRemqiMAwXSR_cMnct4Og!2e0!7i16384!8i8192"
    end

    test "returns nil when stop not found" do
      assert CuratedStreetView.url("unknown") == nil
    end
  end
end

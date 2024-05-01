defmodule Leaflet.MapData.PolylineTest do
  use ExUnit.Case, async: true

  import Test.Support.Factory.RoutePattern

  alias Leaflet.MapData.Polyline

  setup do
    route_pattern =
      build(:route_pattern,
        representative_trip_polyline:
          "gfsaGvlaqL[Ek@Ck@A[?]BU?sAHg@DWDODKJMPM\\KNEQAOU`@c@`@EBC@[PeCn@g@HM@??[@cBG_BKmBIq@Eq@GyAGoAGcDQ??OAiDQoFYcCO_AEM?OA??yAIyAIeBK}AK_ACy@FiAPu@N??YFa@FSDaARw@\\UL[T??WT_B`Bm@r@e@n@Sb@_@|@gAxCq@hBIT]fACDGL??cAhBc@j@k@n@m@v@MNg@j@WX??q@v@oBxBiArA}@fAc@f@??STSTwAbBq@t@eAnAaAjA]b@qAxAMNuA~As@z@??MPsB~B{@jAgBbCgA~Ag@x@mA`C??IR[x@}@pCw@bCGP??y@vBGf@O\\}@tBSV??_AtAkAtAY`@mAzAMP??IJu@~@i@r@Y^cAtAa@h@w@fAe@n@KN??e@l@m@x@g@r@}@nAY\\w@hAg@p@OR??kBjCeB`CiA|AuAlBQV??Y^{AvBy@hAY`@w@fA??UZ]`@[\\k@b@u@^_ChAwBfAQH??uAr@{@b@uAv@yAz@a@`@??CBWXiApAaApAo@t@kAdBMX??a@~@[`AEPe@pAc@`BIZQr@??Sv@_@zAOfAAZAl@S`C]xECh@????]lEShCOjBMjB?H??UhCWfDOlBYxDMlAIf@Kd@s@lCg@zAEN??Uj@sAjDi@xAy@vBKRO`@??IT{@nBO^u@bBiAlCw@nBYh@??KRq@jBwA`DsBzE[b@KP??}@tAORc@l@o@~@uApBS`@IRMl@SnCEf@??AV}@`FQ`AOv@MhAEp@CvA?~AAl@???VCtBC|BC~CEbEAf@??Ad@[tDOpBAJaAPGdA"
      )

    %{route_pattern: route_pattern}
  end

  describe "new/2" do
    test "turns a polyline into a struct", %{route_pattern: route_pattern} do
      assert %Polyline{color: color, positions: positions} =
               Polyline.new(route_pattern, color: "#FF0000")

      assert color == "#FF0000"
      assert [first | _] = positions
      assert first == [42.37428, -71.119]
    end

    test "makes polyline with default options", %{route_pattern: route_pattern} do
      assert %Polyline{color: color, positions: positions} = Polyline.new(route_pattern)

      assert color == "#000000"
      assert [first | _] = positions
      assert first == [42.37428, -71.119]
    end
  end
end

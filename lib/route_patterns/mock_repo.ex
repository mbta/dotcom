defmodule RoutePatterns.MockRepo do
  @moduledoc """
  A mock RoutePatterns Repo client for testing purposes.
  We are returning just a subset of what the actual API would return, given that this file is for testing purposes
  """

  @behaviour RoutePatterns.Repo.Behaviour

  @impl RoutePatterns.Repo.Behaviour
  def by_route_id("77", _opts), do: by_route_id("77")

  @impl RoutePatterns.Repo.Behaviour
  def by_route_id("77") do
    [
      %RoutePatterns.RoutePattern{
        direction_id: 0,
        headsign: "Arlington Heights",
        id: "77-_-0",
        name: "Harvard Station - Arlington Heights",
        representative_trip_id: "47409272",
        representative_trip_polyline:
          "gfsaGvlaqL[Ek@Ck@A[?]BU?sAHg@DWDODKJMPM\\KNEQAOU`@c@`@EBC@[PeCn@g@HM@??[@cBG_BKmBIq@Eq@GyAGoAGcDQ??OAiDQoFYcCO_AEM?OA??yAIyAIeBK}AK_ACy@FiAPu@N??YFa@FSDaARw@\\UL[T??WT_B`Bm@r@e@n@Sb@_@|@gAxCq@hBIT]fACDGL??cAhBc@j@k@n@m@v@MNg@j@WX??q@v@oBxBiArA}@fAc@f@??STSTwAbBq@t@eAnAaAjA]b@qAxAMNuA~As@z@??MPsB~B{@jAgBbCgA~Ag@x@mA`C??IR[x@}@pCw@bCGP??y@vBGf@O\\}@tBSV??_AtAkAtAY`@mAzAMP??IJu@~@i@r@Y^cAtAa@h@w@fAe@n@KN??e@l@m@x@g@r@}@nAY\\w@hAg@p@OR??kBjCeB`CiA|AuAlBQV??Y^{AvBy@hAY`@w@fA??UZ]`@[\\k@b@u@^_ChAwBfAQH??uAr@{@b@uAv@yAz@a@`@??CBWXiApAaApAo@t@kAdBMX??a@~@[`AEPe@pAc@`BIZQr@??Sv@_@zAOfAAZAl@S`C]xECh@????]lEShCOjBMjB?H??UhCWfDOlBYxDMlAIf@Kd@s@lCg@zAEN??Uj@sAjDi@xAy@vBKRO`@??IT{@nBO^u@bBiAlCw@nBYh@??KRq@jBwA`DsBzE[b@KP??}@tAORc@l@o@~@uApBS`@IRMl@SnCEf@??AV}@`FQ`AOv@MhAEp@CvA?~AAl@???VCtBC|BC~CEbEAf@??Ad@[tDOpBAJaAPGdA",
        route_id: "77",
        shape_id: "770116",
        shape_priority: 3,
        stop_ids: [
          "place-harsq",
          "2310",
          "2312",
          "2314",
          "23151",
          "2316",
          "2318",
          "2319",
          "2320",
          "2271",
          "2273",
          "2274",
          "22751",
          "2275",
          "2276",
          "2277",
          "2278",
          "2279",
          "2280",
          "2281",
          "2282",
          "2283",
          "2284",
          "2285",
          "2286",
          "2287",
          "2288",
          "2290",
          "2291",
          "2292",
          "2293",
          "7922"
        ],
        time_desc: nil,
        typicality: 1
      },
      %RoutePatterns.RoutePattern{
        direction_id: 1,
        headsign: "Harvard",
        id: "77-_-1",
        name: "Arlington Heights - Harvard Station",
        representative_trip_id: "47409270",
        representative_trip_polyline:
          "ob}aGbinqLC`@x@NRiC@KNqBV{C??BYBmADcEB_DB}BBuB?g@??@]?_BBwADq@LiANw@PaAn@oD??Lq@F_ARoCLm@HSRa@tAqBn@_Ab@m@NShAgBJO??NSrB{EvAaDp@kBd@}@FQ??n@}AhAmCt@cBN_@z@oBNa@??HUJSx@wBh@yArAkDZ{@f@{Aj@wB??FUJe@Hg@LmAXyDNmBToC??@WTsCLkBNkBRiC\\mEBc@???E\\yERaCPy@H]??ZuAx@wC^aBp@}B^mAj@mABEv@iA??LQNUdByBbAiAV]HI??hBmBtAw@z@c@jAm@??ZOvBgA~BiAt@_@j@c@LM??LO\\a@lAcBXa@x@iAzAwBj@w@`@k@??r@aAhA}AdBaCzB_Df@q@Zc@??Ze@X]|@oAf@s@l@y@p@}@d@o@LO??h@w@`@i@bAuAX_@h@s@j@s@??HKV]lA{AXa@jAuAFK??jAaB|@uBN]XY^eAVq@??FQ`A_Dd@uAr@gBf@iA??HQVi@vAyBX_@h@y@t@cAt@_A??VYdBuBhAqAnAyAxBoCNO??zBiCjB{B\\_@RUVY??^e@z@eAr@u@dAoAvB}B??NQnA_Bx@}@n@y@P_@Vg@b@s@Na@??JYd@yAVy@JWj@yANa@Ri@`@u@HOf@u@DG@A??r@u@t@w@JIf@]\\Ur@YLEf@MPE\\I??RC`AQ|AYXCf@?h@Br@DfAD|BPd@@jBJ|@D??rCLtAH~BN`BF|@F`@BR@??hAFvAJ^BhCHbAHbCLxBNjAD`@A??VAfD}@pAa@f@QEGMSJOL]LQJKNEVEf@ErAIT?\\CZ?j@@j@B\\F??@?j@Nf@R`@b@P`@Hd@H|@F|@Fz@Bj@Ap@Dr@B|@Nr@PZRVPw@ZaBf@Z\\R",
        route_id: "77",
        shape_id: "770115",
        shape_priority: 3,
        stop_ids: [
          "7922",
          "17922",
          "2250",
          "2251",
          "2252",
          "2254",
          "2255",
          "2256",
          "2257",
          "2258",
          "2259",
          "2260",
          "2261",
          "2262",
          "2263",
          "2264",
          "2265",
          "2266",
          "22661",
          "22671",
          "2268",
          "2269",
          "2270",
          "2296",
          "2297",
          "2298",
          "2299",
          "2300",
          "12301",
          "2304",
          "2305",
          "2307",
          "place-harsq",
          "32549"
        ],
        time_desc: nil,
        typicality: 1
      },
      %RoutePatterns.RoutePattern{
        direction_id: 0,
        headsign: "North Cambridge",
        id: "77-4-0",
        name: "Harvard Station - North Cambridge",
        representative_trip_id: "47428185",
        representative_trip_polyline:
          "gfsaGvlaqL[Ek@Ck@A[?]BU?sAHg@DWDODKJMPM\\KNEQAOU`@c@`@EBC@[PeCn@g@HM@??[@cBG_BKmBIq@Eq@GyAGoAGcDQ??OAiDQoFYcCO_AEM?OA??yAIyAIeBK}AK_ACy@FiAPu@N??YFa@FSDaARw@\\UL[T??WT_B`Bm@r@e@n@Sb@_@|@gAxCq@hBIT]fACDGL??cAhBc@j@k@n@m@v@MNg@j@WX??q@v@oBxBiArA}@fAc@f@??STSTwAbBq@t@eAnAaAjA]b@qAxAS_@",
        route_id: "77",
        shape_id: "770099",
        shape_priority: 0,
        stop_ids: [
          "place-harsq",
          "2310",
          "2312",
          "2314",
          "23151",
          "2316",
          "2318",
          "2319",
          "2320",
          "12295"
        ],
        time_desc: nil,
        typicality: 3
      },
      %RoutePatterns.RoutePattern{
        direction_id: 1,
        headsign: "Harvard",
        id: "77-4-1",
        name: "North Cambridge - Harvard Station",
        representative_trip_id: "47428171",
        representative_trip_polyline:
          "krwaG~kcqLR^MNJRxBoCNO??zBiCjB{B\\_@RUVY??^e@z@eAr@u@dAoAvB}B??NQnA_Bx@}@n@y@P_@Vg@b@s@Na@??JYd@yAVy@JWj@yANa@Ri@`@u@HOf@u@DG@A??r@u@t@w@JIf@]\\Ur@YLEf@MPE\\I??RC`AQ|AYXCf@?h@Br@DfAD|BPd@@jBJ|@D??rCLtAH~BN`BF|@F`@BR@??hAFvAJ^BhCHbAHbCLxBNjAD`@A??VAfD}@pAa@f@QEGMSJOL]LQJKNEVEf@ErAIT?\\CZ?j@@j@B\\F",
        route_id: "77",
        shape_id: "770057",
        shape_priority: 0,
        stop_ids: [
          "12295",
          "2296",
          "2297",
          "2298",
          "2299",
          "2300",
          "12301",
          "2304",
          "2305",
          "2307",
          "place-harsq"
        ],
        time_desc: nil,
        typicality: 3
      },
      %RoutePatterns.RoutePattern{
        direction_id: 1,
        headsign: "Harvard",
        id: "77-1-1",
        name: "Appleton St & Massachusetts Ave - Harvard Station",
        representative_trip_id: "47408856",
        representative_trip_polyline:
          "uz|aGlrlqLLq@F_ARoCLm@HSRa@tAqBn@_Ab@m@NShAgBJO??NSrB{EvAaDp@kBd@}@FQ??n@}AhAmCt@cBN_@z@oBNa@??HUJSx@wBh@yArAkDZ{@f@{Aj@wB??FUJe@Hg@LmAXyDNmBToC??@WTsCLkBNkBRiC\\mEBc@???E\\yERaCPy@H]??ZuAx@wC^aBp@}B^mAj@mABEv@iA??LQNUdByBbAiAV]HI??hBmBtAw@z@c@jAm@??ZOvBgA~BiAt@_@j@c@LM??LO\\a@lAcBXa@x@iAzAwBj@w@`@k@??r@aAhA}AdBaCzB_Df@q@Zc@??Ze@X]|@oAf@s@l@y@p@}@d@o@LO??h@w@`@i@bAuAX_@h@s@j@s@??HKV]lA{AXa@jAuAFK??jAaB|@uBN]XY^eAVq@??FQ`A_Dd@uAr@gBf@iA??HQVi@vAyBX_@h@y@t@cAt@_A??VYdBuBhAqAnAyAxBoCNO??zBiCjB{B\\_@RUVY??^e@z@eAr@u@dAoAvB}B??NQnA_Bx@}@n@y@P_@Vg@b@s@Na@??JYd@yAVy@JWj@yANa@Ri@`@u@HOf@u@DG@A??r@u@t@w@JIf@]\\Ur@YLEf@MPE\\I??RC`AQ|AYXCf@?h@Br@DfAD|BPd@@jBJ|@D??rCLtAH~BN`BF|@F`@BR@??hAFvAJ^BhCHbAHbCLxBNjAD`@A??VAfD}@pAa@f@QEGMSJOL]LQJKNEVEf@ErAIT?\\CZ?j@@j@B\\F??@?j@Nf@R`@b@P`@Hd@H|@F|@Fz@Bj@Ap@Dr@B|@Nr@PZRVPw@ZaBf@Z\\R",
        route_id: "77",
        shape_id: "770117",
        shape_priority: -1,
        stop_ids: [
          "2251",
          "2252",
          "2254",
          "2255",
          "2256",
          "2257",
          "2258",
          "2259",
          "2260",
          "2261",
          "2262",
          "2263",
          "2264",
          "2265",
          "2266",
          "22661",
          "22671",
          "2268",
          "2269",
          "2270",
          "2296",
          "2297",
          "2298",
          "2299",
          "2300",
          "12301",
          "2304",
          "2305",
          "2307",
          "place-harsq",
          "32549"
        ],
        time_desc: "School days only",
        typicality: 3
      }
    ]
  end
end

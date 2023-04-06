defmodule Routes.MockRepoApi do
  @moduledoc """
  A mock Routes Repo client for testing purposes.
  In some cases we are returning just a subset of what the actual API would return, given that this file is for testing purposes
  """

  @behaviour Routes.RepoApi

  @impl Routes.RepoApi
  def all() do
    [
      get("Red"),
      %Routes.Route{
        id: "23",
        type: 3,
        name: "23",
        long_name: "Ashmont Station - Ruggles Station via Washington Street",
        color: "FFC72C",
        direction_destinations: %{0 => "Ashmont Station", 1 => "Ruggles Station"},
        description: :key_bus_route,
        sort_order: 50_230
      },
      get("741"),
      %Routes.Route{
        id: "Green-B",
        type: 0,
        name: "Green Line B",
        long_name: "Green Line B",
        color: "00843D",
        direction_names: %{0 => "Westbound", 1 => "Eastbound"},
        direction_destinations: %{0 => "Boston College", 1 => "Government Center"},
        description: :rapid_transit,
        sort_order: 10_032
      }
    ]
  end

  @impl Routes.RepoApi
  def get("1") do
    %Routes.Route{
      color: "FFC72C",
      custom_route?: false,
      description: :key_bus_route,
      direction_destinations: %{0 => "Harvard Square", 1 => "Nubian Station"},
      direction_names: %{0 => "Outbound", 1 => "Inbound"},
      id: "1",
      long_name: "Harvard Square - Nubian Station",
      name: "1",
      sort_order: 50_010,
      type: 3
    }
  end

  @impl Routes.RepoApi
  def get("83") do
    %Routes.Route{
      color: "FFC72C",
      custom_route?: false,
      description: :local_bus,
      direction_destinations: %{
        0 => "Rindge Avenue",
        1 => "Central Square, Cambridge"
      },
      direction_names: %{0 => "Outbound", 1 => "Inbound"},
      id: "83",
      long_name: "Rindge Avenue - Central Square, Cambridge",
      name: "83",
      sort_order: 50_830,
      type: 3
    }
  end

  @impl Routes.RepoApi
  def get("47") do
    %Routes.Route{
      color: "FFC72C",
      custom_route?: false,
      description: :local_bus,
      direction_destinations: %{
        0 => "Central Square, Cambridge",
        1 => "Broadway Station"
      },
      direction_names: %{0 => "Outbound", 1 => "Inbound"},
      id: "47",
      long_name: "Central Square, Cambridge - Broadway Station",
      name: "47",
      sort_order: 50_470,
      type: 3
    }
  end

  @impl Routes.RepoApi
  def get("741") do
    %Routes.Route{
      id: "741",
      type: 3,
      name: "SL1",
      long_name: "Logan Airport Terminals - South Station",
      color: "7C878E",
      direction_destinations: %{0 => "Logan Airport Terminals", 1 => "South Station"},
      description: :key_bus_route,
      sort_order: 10_051
    }
  end

  @impl Routes.RepoApi
  def get("746") do
    %Routes.Route{
      color: "7C878E",
      custom_route?: false,
      description: :key_bus_route,
      direction_destinations: %{0 => "Silver Line Way", 1 => "South Station"},
      direction_names: %{0 => "Outbound", 1 => "Inbound"},
      id: "746",
      long_name: "Silver Line Way - South Station",
      name: "SLW",
      sort_order: 10_057,
      type: 3
    }
  end

  @impl Routes.RepoApi
  def get("Red") do
    %Routes.Route{
      id: "Red",
      type: 1,
      name: "Red Line",
      long_name: "Red Line",
      color: "DA291C",
      direction_names: %{0 => "Southbound", 1 => "Northbound"},
      direction_destinations: %{0 => "Ashmont/Braintree", 1 => "Alewife"},
      description: :rapid_transit,
      sort_order: 10_010
    }
  end

  @impl Routes.RepoApi
  def get(_any), do: nil

  @impl Routes.RepoApi
  def by_stop("place-kencl") do
    [
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{
          0 => "Fields Corner Station",
          1 => "Kenmore or Ruggles Station"
        },
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "19",
        long_name: "Fields Corner Station - Kenmore or Ruggles Station",
        name: "19",
        sort_order: 50_190,
        type: 3
      },
      %Routes.Route{
        color: "00843D",
        custom_route?: false,
        description: :rapid_transit,
        direction_destinations: %{0 => "Boston College", 1 => "Government Center"},
        direction_names: %{0 => "Westbound", 1 => "Eastbound"},
        id: "Green-B",
        long_name: "Green Line B",
        name: "Green Line B",
        sort_order: 10_032,
        type: 0
      }
    ]
  end

  @impl Routes.RepoApi
  def by_stop(_stop) do
    []
  end

  @impl Routes.RepoApi
  def by_stop("place-kencl", type: 3) do
    [
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{
          0 => "Fields Corner Station",
          1 => "Kenmore or Ruggles Station"
        },
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "19",
        long_name: "Fields Corner Station - Kenmore or Ruggles Station",
        name: "19",
        sort_order: 50_190,
        type: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def by_stop("place-bmmnl", type: 0) do
    []
  end

  @impl Routes.RepoApi
  def get_shape("903_0018") do
    [
      %Routes.Shape{
        direction_id: 0,
        id: "903_0018",
        name: "name",
        polyline: "polyline"
        # priority: 2,
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("Red", direction_id: 0) do
    [
      %Routes.Shape{
        direction_id: 0,
        id: "931_0009",
        name: "Alewife - Ashmont",
        polyline:
          "}nwaG~|eqLGyNIqAAc@S_CAEWu@g@}@u@k@u@Wu@OMGIMISQkAOcAGw@SoDFkCf@sUXcJJuERwHPkENqCJmB^mDn@}D??D[TeANy@\\iAt@qB`AwBl@cAl@m@b@Yn@QrBEtCKxQ_ApMT??R?`m@hD`Np@jAF|@C`B_@hBi@n@s@d@gA`@}@Z_@RMZIl@@fBFlB\\tAP??~@L^?HCLKJWJ_@vC{NDGLQvG}HdCiD`@e@Xc@b@oAjEcPrBeGfAsCvMqVl@sA??jByD`DoGd@cAj@cBJkAHqBNiGXeHVmJr@kR~@q^HsB@U??NgDr@gJTcH`@aMFyCF}AL}DN}GL}CXkILaD@QFmA@[??DaAFiBDu@BkA@UB]Fc@Jo@BGJ_@Lc@\\}@vJ_OrCyDj@iAb@_AvBuF`@gA`@aAv@qBVo@Xu@??bDgI??Tm@~IsQj@cAr@wBp@kBj@kB??HWtDcN`@g@POl@UhASh@Eb@?t@FXHl@Px@b@he@h[pCC??bnAm@h@T??xF|BpBp@^PLBXAz@Yl@]l@e@|B}CT[p@iA|A}BZi@zDuF\\c@n@s@VObAw@^Sl@Yj@U\\O|@WdAUxAQRCt@E??xAGrBQZAhAGlAEv@Et@E~@AdAAbCGpCA|BEjCMr@?nBDvANlARdBb@nDbA~@XnBp@\\JRH??|Al@`AZbA^jA^lA\\h@P|@TxAZ|@J~@LN?fBXxHhApDt@b@JXFtAVhALx@FbADtAC`B?z@BHBH@|@f@RN^^T\\h@hANb@HZH`@H^LpADlA@dD@jD@x@@b@Bp@HdAFd@Ll@F^??n@rDBRl@vD^pATp@Rb@b@z@\\l@`@j@p@t@j@h@n@h@n@`@hAh@n@\\t@PzANpAApBGtE}@xBa@??xB_@nOmB`OgBb@IrC[p@MbEmARCV@d@LH?tDyAXM",
        priority: 2
      },
      %Routes.Shape{
        direction_id: 0,
        id: "933_0009",
        name: "Alewife - Braintree",
        polyline:
          "}nwaG~|eqLGyNIqAAc@S_CAEWu@g@}@u@k@u@Wu@OMGIMISQkAOcAGw@SoDFkCf@sUXcJJuERwHPkENqCJmB^mDn@}D??D[TeANy@\\iAt@qB`AwBl@cAl@m@b@Yn@QrBEtCKxQ_ApMT??R?`m@hD`Np@jAF|@C`B_@hBi@n@s@d@gA`@}@Z_@RMZIl@@fBFlB\\tAP??~@L^?HCLKJWJ_@vC{NDGLQvG}HdCiD`@e@Xc@b@oAjEcPrBeGfAsCvMqVl@sA??jByD`DoGd@cAj@cBJkAHqBNiGXeHVmJr@kR~@q^HsB@U??NgDr@gJTcH`@aMFyCF}AL}DN}GL}CXkILaD@QFmA@[??DaAFiBDu@BkA@UB]Fc@Jo@BGJ_@Lc@\\}@vJ_OrCyDj@iAb@_AvBuF`@gA`@aAv@qBVo@Xu@??bDgI??Tm@~IsQj@cAr@wBp@kBj@kB??HWtDcN`@g@POl@UhASh@Eb@?t@FXHl@Px@b@he@h[pCC??bnAm@h@T??xF|BpBp@^PLBXAz@Yl@]l@e@|B}CT[p@iA|A}BZi@jBeDnAiBz@iAf@k@l@g@dAs@fAe@|@WpCe@l@GTCRE\\G??~@O`@ELA|AGf@A\\CjCGrEKz@AdEAxHY|BD~@JjB^fF~AdDbA|InCxCv@zD|@rWfEXDpB`@tANvAHx@AjBIx@M~@S~@a@fAi@HEnA{@fA{@|HuI|DwEbDqDpLkNhCyClEiFhLaN`@c@f@o@RURUbDsDbAiA`AgAv@_AHKHI~E}FdBoBfAgAfD{DxDoE~DcF|BkClAwALODEJOJK|@gATWvAoA`Au@fAs@hAk@n@QpAa@vDeAhA[x@Yh@Wv@a@b@YfAaAjCgCz@aAtByBz@{@??|FaGtCaDbL{LhI{IzHgJdAuAjC{CVYvAwA??JIl@a@NMNM\\[|AuArF_GlPyQrD_ErAwAd@e@nE{ErDuD\\a@nE_FZYPSRUvL{Mv@}@Z[JILKv@m@z@i@fCkAlBmAl@[t@[??h@WxBeAp@]dAi@p@YXIPEXKDALENEbAQl@Gz@ChADtAL~ARnCZbGx@xB`@TDL@PBzAVjIvA^FVDVB|@NjHlAlPnCnCd@vBXhBNv@JtAPL@|BXrAN??`@FRBj@Bp@FbADz@?dAIp@I|@Mx@Q`AWhAYlBs@pDaBzAs@nBgAZQJGJGhAs@RKVMNKTMf@YdHcEzBmApAw@`GmDLI@AHGlEwClAi@hA_@v@Up@ObB]z@Kr@Ir@EZCpA?dCRf@DpAHvANrE`@bDTr@DfMdA`CJvBRn@DnCLnBPfAFV@",
        priority: 1
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("Red", direction_id: 1) do
    [
      %Routes.Shape{
        direction_id: 1,
        id: "931_0010",
        name: "Ashmont - Alewife",
        polyline: "po",
        priority: 2
      },
      %Routes.Shape{
        direction_id: 1,
        id: "933_0010",
        name: "Braintree - Alewife",
        polyline: "po",
        priority: 1
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("Green-E", direction_id: 0) do
    [
      %Routes.Shape{
        direction_id: 0,
        id: "881_0014",
        name: "North Station - Heath Street",
        polyline: "polyline",
        priority: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("Green-B", direction_id: 0) do
    [
      %Routes.Shape{
        direction_id: 0,
        id: "813_0006",
        name: "Park Street - Boston College",
        polyline: "polyline",
        priority: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("Green-D", direction_id: 0) do
    [
      %Routes.Shape{
        direction_id: 0,
        id: "852_0018",
        name: "Government Center - Riverside",
        polyline: "polyline",
        priority: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("CR-Kingston", direction_id: 0) do
    [
      %Routes.Shape{
        direction_id: 0,
        id: "9790004",
        name: "South Station - Plymouth via Kingston",
        polyline: "polyline",
        priority: 2
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("CR-Providence", direction_id: 1) do
    [
      %Routes.Shape{
        direction_id: 1,
        id: "9890008",
        name: "Wickford Junction - South Station",
        polyline: "polyline",
        priority: 2
      },
      %Routes.Shape{
        direction_id: 1,
        id: "9890003",
        name: "Stoughton - South Station",
        polyline: "polyline",
        priority: 0
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("1", direction_id: 0) do
    [
      %Routes.Shape{
        direction_id: 0,
        id: "010090",
        name: "Nubian Station - Harvard Square",
        polyline: "polyline",
        priority: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("1", direction_id: 1) do
    [
      %Routes.Shape{
        direction_id: 1,
        id: "010091",
        name: "Harvard Square - Nubian Station",
        polyline: "polyline",
        priority: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("Boat-F4", direction_id: 0) do
    [
      %Routes.Shape{
        direction_id: 0,
        id: "b0017",
        name: "Long Wharf - Charlestown Navy Yard",
        polyline:
          "qipaGl`tpLUeCUiCOuEs@kDSu@e@_@c@S}JgBcDW{CIcBB}BPmB\\cBh@aBt@qAbAeA`AmBtB{P~PiGpFqC`C",
        priority: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("27", direction_id: 0), do: []

  @impl Routes.RepoApi
  def get_shapes("36", direction_id: 1) do
    [
      %Routes.Shape{
        direction_id: 1,
        id: "360291",
        name: "VA Hospital, West Roxbury - Forest Hills Station",
        polyline: "polyline",
        priority: 3
      },
      %Routes.Shape{
        direction_id: 1,
        id: "360290",
        name: "Millennium Park - Forest Hills Station",
        polyline: "polyline",
        priority: 1
      },
      %Routes.Shape{
        direction_id: 1,
        id: "360288",
        name: "Charles River Loop - Townsend & Humboldt via Forest Hills",
        polyline: "polyline",
        priority: 0
      },
      %Routes.Shape{
        direction_id: 1,
        id: "360292",
        name: "Rivermoor Industrial Park - Forest Hills Station",
        polyline: "polyline",
        priority: 0
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("100", direction_id: 1) do
    [
      %Routes.Shape{
        direction_id: 1,
        id: "1000032",
        name: "Elm St - Wellington Station",
        polyline: "polyline",
        priority: 3
      },
      %Routes.Shape{
        direction_id: 1,
        id: "1000048",
        name: "Elm St - Fellsway Garage",
        polyline: "polyline",
        priority: 0
      }
    ]
  end

  @impl Routes.RepoApi
  def get_shapes("100", [direction_id: 1], false) do
    [
      %Routes.Shape{
        direction_id: 1,
        id: "1000032",
        name: "Elm St - Wellington Station",
        polyline: "polyline",
        priority: 3
      },
      %Routes.Shape{
        direction_id: 1,
        id: "1000048",
        name: "Elm St - Fellsway Garage",
        polyline: "polyline",
        priority: 0
      },
      %Routes.Shape{
        direction_id: 1,
        id: "1000034",
        name: "Roosevelt Circle - Wellington Station",
        polyline: "polyline",
        priority: -1
      }
    ]
  end

  @impl Routes.RepoApi
  def by_type(1) do
    all() |> Enum.filter(&(&1.type == 1))
  end

  @impl Routes.RepoApi
  def by_type([1]) do
    by_type(1)
  end

  @impl Routes.RepoApi
  def by_type([0, 1, 2, 3, 4]) do
    all()
  end

  @impl Routes.RepoApi
  def by_type(3) do
    [
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :key_bus_route,
        direction_destinations: %{0 => "Harvard Square", 1 => "Nubian Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "1",
        long_name: "Harvard Square - Nubian Station",
        name: "1",
        sort_order: 50_010,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :key_bus_route,
        direction_destinations: %{
          0 => "Forest Hills Station",
          1 => "Back Bay Station"
        },
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "39",
        long_name: "Forest Hills Station - Back Bay Station",
        name: "39",
        sort_order: 50_390,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Georgetowne", 1 => "Forest Hills Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "40",
        long_name: "Georgetowne - Forest Hills Station",
        name: "40",
        sort_order: 50_400,
        type: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def by_stop_and_direction("1994", 0) do
    [
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Brighton Center", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "65",
        long_name: "Brighton Center - Kenmore Station",
        name: "65",
        sort_order: 50_650,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :key_bus_route,
        direction_destinations: %{0 => "Harvard Square", 1 => "Nubian Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "66",
        long_name: "Harvard Square - Nubian Station",
        name: "66",
        sort_order: 50_660,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :commuter_bus,
        direction_destinations: %{
          0 => "Brighton Center",
          1 => "Federal Street & Franklin Street"
        },
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "501",
        long_name: "Brighton Center - Federal Street & Franklin Street",
        name: "501",
        sort_order: 55_010,
        type: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def by_stop_and_direction("1994", 1) do
    []
  end

  @impl Routes.RepoApi
  def by_stop_and_direction("place-kencl", 0) do
    [
      %Routes.Route{
        color: "00843D",
        custom_route?: false,
        description: :rapid_transit,
        direction_destinations: %{0 => "Boston College", 1 => "Government Center"},
        direction_names: %{0 => "Westbound", 1 => "Eastbound"},
        id: "Green-B",
        long_name: "Green Line B",
        name: "Green Line B",
        sort_order: 10_032,
        type: 0
      },
      %Routes.Route{
        color: "00843D",
        custom_route?: false,
        description: :rapid_transit,
        direction_destinations: %{0 => "Cleveland Circle", 1 => "North Station"},
        direction_names: %{0 => "Westbound", 1 => "Eastbound"},
        id: "Green-C",
        long_name: "Green Line C",
        name: "Green Line C",
        sort_order: 10_033,
        type: 0
      },
      %Routes.Route{
        color: "00843D",
        custom_route?: false,
        description: :rapid_transit,
        direction_destinations: %{0 => "Riverside", 1 => "Government Center"},
        direction_names: %{0 => "Westbound", 1 => "Eastbound"},
        id: "Green-D",
        long_name: "Green Line D",
        name: "Green Line D",
        sort_order: 10_034,
        type: 0
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Harbor Point", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "8",
        long_name: "Harbor Point - Kenmore Station",
        name: "8",
        sort_order: 50_080,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{
          0 => "Fields Corner Station",
          1 => "Kenmore or Ruggles Station"
        },
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "19",
        long_name: "Fields Corner Station - Kenmore or Ruggles Station",
        name: "19",
        sort_order: 50_190,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :key_bus_route,
        direction_destinations: %{0 => "Watertown Yard", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "57",
        long_name: "Watertown Yard - Kenmore Station",
        name: "57",
        sort_order: 50_570,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Oak Square", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "57A",
        long_name: "Oak Square - Kenmore Station",
        name: "57A",
        sort_order: 50_571,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Chestnut Hill", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "60",
        long_name: "Chestnut Hill - Kenmore Station",
        name: "60",
        sort_order: 50_600,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Brighton Center", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "65",
        long_name: "Brighton Center - Kenmore Station",
        name: "65",
        sort_order: 50_650,
        type: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def by_stop_and_direction("place-kencl", 1) do
    [
      %Routes.Route{
        color: "00843D",
        custom_route?: false,
        description: :rapid_transit,
        direction_destinations: %{0 => "Boston College", 1 => "Government Center"},
        direction_names: %{0 => "Westbound", 1 => "Eastbound"},
        id: "Green-B",
        long_name: "Green Line B",
        name: "Green Line B",
        sort_order: 10_032,
        type: 0
      },
      %Routes.Route{
        color: "00843D",
        custom_route?: false,
        description: :rapid_transit,
        direction_destinations: %{0 => "Cleveland Circle", 1 => "North Station"},
        direction_names: %{0 => "Westbound", 1 => "Eastbound"},
        id: "Green-C",
        long_name: "Green Line C",
        name: "Green Line C",
        sort_order: 10_033,
        type: 0
      },
      %Routes.Route{
        color: "00843D",
        custom_route?: false,
        description: :rapid_transit,
        direction_destinations: %{0 => "Riverside", 1 => "Government Center"},
        direction_names: %{0 => "Westbound", 1 => "Eastbound"},
        id: "Green-D",
        long_name: "Green Line D",
        name: "Green Line D",
        sort_order: 10_034,
        type: 0
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Harbor Point", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "8",
        long_name: "Harbor Point - Kenmore Station",
        name: "8",
        sort_order: 50_080,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "City Point", 1 => "Copley Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "9",
        long_name: "City Point - Copley Station",
        name: "9",
        sort_order: 50_090,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{
          0 => "Fields Corner Station",
          1 => "Kenmore or Ruggles Station"
        },
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "19",
        long_name: "Fields Corner Station - Kenmore or Ruggles Station",
        name: "19",
        sort_order: 50_190,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :key_bus_route,
        direction_destinations: %{0 => "Watertown Yard", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "57",
        long_name: "Watertown Yard - Kenmore Station",
        name: "57",
        sort_order: 50_570,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Oak Square", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "57A",
        long_name: "Oak Square - Kenmore Station",
        name: "57A",
        sort_order: 50_571,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Chestnut Hill", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "60",
        long_name: "Chestnut Hill - Kenmore Station",
        name: "60",
        sort_order: 50_600,
        type: 3
      },
      %Routes.Route{
        color: "FFC72C",
        custom_route?: false,
        description: :local_bus,
        direction_destinations: %{0 => "Brighton Center", 1 => "Kenmore Station"},
        direction_names: %{0 => "Outbound", 1 => "Inbound"},
        id: "65",
        long_name: "Brighton Center - Kenmore Station",
        name: "65",
        sort_order: 50_650,
        type: 3
      }
    ]
  end

  @impl Routes.RepoApi
  def green_line do
    %Routes.Route{
      color: "00843D",
      custom_route?: false,
      description: :rapid_transit,
      direction_destinations: %{0 => "All branches", 1 => "All branches"},
      direction_names: %{0 => "Westbound", 1 => "Eastbound"},
      id: "Green",
      long_name: "Green Line",
      name: "Green Line",
      sort_order: 99_999,
      type: 0
    }
  end
end

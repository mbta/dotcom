defmodule JsonApiTest do
  use ExUnit.Case, async: true

  test ".parse parses an error into a JsonApi.Error struct" do
    body = """
    {
      "jsonapi": {"version": "1.0"},
      "errors": [
        {
          "code": "code",
          "detail": "detail",
          "source": {
            "parameter": "name"
          },
          "meta": {
            "key": "value"
          }
        }
      ]
    }
    """

    parsed = JsonApi.parse(body)

    assert {:error,
            [
              %JsonApi.Error{
                code: "code",
                detail: "detail",
                source: %{"parameter" => "name"},
                meta: %{"key" => "value"}
              }
            ]} = parsed
  end

  test ".parse parses invalid JSON into an error tuple" do
    assert {:error, _} = JsonApi.parse("invalid")
  end

  test ".parses valid JSON without data or errors into an invalid error tuple" do
    assert {:error, :invalid} =
             JsonApi.parse("""
             {
               "jsonapi": {"version": "1.0"}
             }
             """)
  end

  @lint {Credo.Check.Readability.MaxLineLength, false}
  _ = @lint

  test ".parse parses a body into a JsonApi struct" do
    body = """
    {"jsonapi":{"version":"1.0"},"included":[{"type":"stop","id":"place-harsq","attributes":{"wheelchair_boarding":1,"name":"Harvard","longitude":-71.118956,"latitude":42.373362}}],"data":{"type":"stop","relationships":{"parent_station":{"data":{"type":"stop","id":"place-harsq"}}},"links":{"self":"/stops/20761"},"id":"20761","attributes":{"wheelchair_boarding":0,"name":"Harvard Upper Busway @ Red Line","longitude":-71.118956,"latitude":42.373362}}}
    """

    assert JsonApi.parse(body) == %JsonApi{
             links: %{},
             data: [
               %JsonApi.Item{
                 type: "stop",
                 id: "20761",
                 attributes: %{
                   "name" => "Harvard Upper Busway @ Red Line",
                   "wheelchair_boarding" => 0,
                   "latitude" => 42.373362,
                   "longitude" => -71.118956
                 },
                 relationships: %{
                   "parent_station" => [
                     %JsonApi.Item{
                       type: "stop",
                       id: "place-harsq",
                       attributes: %{
                         "name" => "Harvard",
                         "wheelchair_boarding" => 1,
                         "latitude" => 42.373362,
                         "longitude" => -71.118956
                       },
                       relationships: %{}
                     }
                   ]
                 }
               }
             ]
           }
  end

  test ".parse parses a relationship that's present in data" do
    body = """
    {"jsonapi":{"version":"1.0"},"data":[{"type":"stop","relationships":{"parent_station":{"data":{"type":"stop","id":"place-harsq"}}},"links":{"self":"/stops/20761"},"id":"20761","attributes":{"wheelchair_boarding":0,"name":"Harvard Upper Busway @ Red Line","longitude":-71.118956,"latitude":42.373362}},{"type":"stop","id":"place-harsq","attributes":{"wheelchair_boarding":1,"name":"Harvard","longitude":-71.118956,"latitude":42.373362}}]}
    """

    assert JsonApi.parse(body) == %JsonApi{
             links: %{},
             data: [
               %JsonApi.Item{
                 type: "stop",
                 id: "20761",
                 attributes: %{
                   "name" => "Harvard Upper Busway @ Red Line",
                   "wheelchair_boarding" => 0,
                   "latitude" => 42.373362,
                   "longitude" => -71.118956
                 },
                 relationships: %{
                   "parent_station" => [
                     %JsonApi.Item{
                       type: "stop",
                       id: "place-harsq",
                       attributes: %{
                         "name" => "Harvard",
                         "wheelchair_boarding" => 1,
                         "latitude" => 42.373362,
                         "longitude" => -71.118956
                       },
                       relationships: %{}
                     }
                   ]
                 }
               },
               %JsonApi.Item{
                 type: "stop",
                 id: "place-harsq",
                 attributes: %{
                   "name" => "Harvard",
                   "wheelchair_boarding" => 1,
                   "latitude" => 42.373362,
                   "longitude" => -71.118956
                 },
                 relationships: %{}
               }
             ]
           }
  end

  test ".parse handles a non-included relationship" do
    body = """
    {"jsonapi":{"version":"1.0"},"data":{"type":"stop","relationships":{"other":{"data":{"type":"other","id":"1"}}},"links":{},"id":"20761","attributes":{}}}
    """

    assert JsonApi.parse(body) == %JsonApi{
             links: %{},
             data: [
               %JsonApi.Item{
                 type: "stop",
                 id: "20761",
                 attributes: %{},
                 relationships: %{
                   "other" => [%JsonApi.Item{type: "other", id: "1"}]
                 }
               }
             ]
           }
  end

  @tag timeout: 5000
  test ".parse handles a cyclical included relationship with properties" do
    {:ok, body} =
      Jason.encode(%{
        data: %{
          attributes: %{},
          id: "Worcester",
          links: %{},
          relationships: %{
            facilities: %{
              data: [
                %{
                  id: "subplat-056",
                  type: "facility"
                }
              ],
              links: %{}
            }
          },
          type: "stop"
        },
        included: [
          %{
            attributes: %{},
            id: "subplat-056",
            links: %{},
            relationships: %{
              stop: %{
                data: %{
                  id: "Worcester",
                  type: "stop"
                }
              }
            },
            type: "facility"
          }
        ],
        jsonapi: %{version: "1.0"}
      })

    assert JsonApi.parse(body) == %JsonApi{
             links: %{},
             data: [
               %JsonApi.Item{
                 type: "stop",
                 id: "Worcester",
                 attributes: %{},
                 relationships: %{
                   "facilities" => [
                     %JsonApi.Item{
                       type: "facility",
                       id: "subplat-056",
                       attributes: %{},
                       relationships: %{
                         "stop" => [
                           %JsonApi.Item{
                             type: "stop",
                             id: "Worcester",
                             attributes: %{},
                             relationships: %{}
                           }
                         ]
                       }
                     }
                   ]
                 }
               }
             ]
           }
  end

  @lint {Credo.Check.Readability.MaxLineLength, false}
  _ = @lint

  test ".parse handles an empty relationship" do
    body = """
    {"jsonapi":{"version":"1.0"},"data":{"type":"stop","relationships":{"parent_station":{},"other":{"data": null}},"links":{},"id":"20761","attributes":{}}}
    """

    assert JsonApi.parse(body) == %JsonApi{
             links: %{},
             data: [
               %JsonApi.Item{
                 type: "stop",
                 id: "20761",
                 attributes: %{},
                 relationships: %{
                   "parent_station" => [],
                   "other" => []
                 }
               }
             ]
           }
  end

  test ".parse handles ServerSentEventStream data format" do
    list = ~s([{"type":"stop","links":{},"id":"20761","attributes":{}}])

    assert JsonApi.parse(list) == %JsonApi{
             data: [%JsonApi.Item{id: "20761", type: "stop", attributes: %{}, relationships: %{}}]
           }

    item = ~s({"type":"stop","links":{},"id":"20761","attributes":{}})

    assert JsonApi.parse(item) == %JsonApi{
             data: [%JsonApi.Item{id: "20761", type: "stop", attributes: %{}, relationships: %{}}]
           }
  end

  describe "empty/0" do
    test "empty generates the correct struct" do
      assert JsonApi.empty() == %JsonApi{
               links: %{},
               data: []
             }
    end
  end

  describe "merge/2" do
    test "merged item contains all data" do
      expected = %JsonApi{
        links: %{"a" => "a", "b" => "b"},
        data: ["a", "b"]
      }

      first = %JsonApi{
        links: %{"a" => "a"},
        data: ["a"]
      }

      second = %JsonApi{
        links: %{"b" => "b"},
        data: ["b"]
      }

      assert JsonApi.merge(first, second) == expected
    end
  end
end

defmodule JsonApiBench do
  use Benchfella

  @body """
    {"jsonapi":{"version":"1.0"},"included":[{"type":"stop","id":"place-harsq","attributes":{"wheelchair_boarding":1,"name":"Harvard","longitude":-71.118956,"latitude":42.373362}}],"data":{"type":"stop","relationships":{"parent_station":{"data":{"type":"stop","id":"place-harsq"}}},"links":{"self":"/stops/20761"},"id":"20761","attributes":{"wheelchair_boarding":0,"name":"Harvard Upper Busway @ Red Line","longitude":-71.118956,"latitude":42.373362}}}
  """

  bench ".parse" do
    JsonApi.parse(@body)
  end
end

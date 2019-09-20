defmodule V3Api.RoutePatterns do
  @moduledoc false

  @spec all(Keyword.t()) :: JsonApi.t() | {:error, any}
  def all(params \\ []) do
    V3Api.get_json("/route_patterns/", params)
  end
end

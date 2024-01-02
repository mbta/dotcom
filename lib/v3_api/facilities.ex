defmodule V3Api.Facilities do
  @moduledoc """

  Responsible for fetching Stop data from the V3 API.

  """
  import V3Api

  def all(params \\ [], opts \\ []) do
    get_json("/facilities/", params, opts)
  end

  def filter_by(filters, opts \\ []) do
    params =
      Enum.map(filters, fn {k, v} ->
        {"filter[#{k}]", v}
      end)

    get_json("/facilities/", params, opts)
  end
end

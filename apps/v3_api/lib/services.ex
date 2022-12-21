defmodule V3Api.Services do
  @moduledoc false

  def all(params \\ []) do
    IO.inspect("HERE")
    V3Api.get_json("/services/", params)
  end
end

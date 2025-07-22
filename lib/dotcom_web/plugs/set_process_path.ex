defmodule DotcomWeb.Plugs.SetProcessPath do
  @moduledoc """
  Sets the request path as a process value so we can access it from templates.
  """

  def init(default), do: default

  def call(%{path_info: path_info} = conn, _opts) do
    Process.put(:path_info, path_info)

    conn
  end
end

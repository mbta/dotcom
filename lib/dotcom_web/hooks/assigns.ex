defmodule DotcomWeb.Hooks.Assigns do
  @moduledoc """
  Assign various things on LiveView mount.
  """

  import Phoenix.Component, only: [assign: 3]
  import Phoenix.LiveView, only: [get_connect_info: 2]

  def on_mount(:user_agent, _, _, socket) do
    {:cont, assign(socket, :user_agent, get_connect_info(socket, :user_agent))}
  end

  # catch-all
  def on_mount(_, _, _, socket) do
    {:cont, socket}
  end
end

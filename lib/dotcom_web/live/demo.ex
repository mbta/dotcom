defmodule Dotcom.Demo do
  def one, do: 1

  def two, do: 2

  def n(n), do: n
end

defmodule DotcomWeb.Live.Demo do
  @moduledoc """
  This LiveView demos using a helper function to clean up reused assigns.
  """

  use DotcomWeb, :live_view

  @impl true
  def mount(%{"n" => n}, _session, socket) do
    new_socket =
      socket
      |> assign_result(&Dotcom.Demo.one/0)
      |> assign_result(&Dotcom.Demo.two/0)
      |> assign_result(&Dotcom.Demo.n/1, [n])

    {:ok, new_socket}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <ol>
      <li>{@one}</li>
      <li>{@two}</li>
      <li>{@n}</li>
    </ol>
    """
  end
end

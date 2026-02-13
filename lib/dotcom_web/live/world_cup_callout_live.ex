defmodule DotcomWeb.WorldCupCalloutLive do
  @moduledoc "Simple preview page for experimenting with descriptive links"

  use DotcomWeb, :live_view

  def render(assigns) do
    ~H"""
    <div class="flex flex-col gap-4">
      <.descriptive_link href="#">
        <:title>Regular Descriptive Link</:title>
        <p>This is a regular descriptive link</p>
      </.descriptive_link>

      <.descriptive_link href="/guides/world-cup-guide">
        <:title>Going to a World Cup match at Boston Stadium?</:title>
        <p class="c-descriptive-link__world-cup">
          Visit our <span class="underline">World Cup Guide</span>
        </p>
      </.descriptive_link>
    </div>
    """
  end
end

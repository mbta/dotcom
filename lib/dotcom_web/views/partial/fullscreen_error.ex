defmodule DotcomWeb.PartialView.FullscreenError do
  @moduledoc """
  Struct for an error message that appears fullscreen.
  """
  import PhoenixHTMLHelpers.Tag, only: [content_tag: 2, content_tag: 3]
  import DotcomWeb.ViewHelpers, only: [fa: 1]

  alias Phoenix.HTML

  defstruct heading: "",
            body: ""

  @type t :: %DotcomWeb.PartialView.FullscreenError{
          heading: String.t(),
          body: String.t()
        }

  @spec render_error(t()) :: HTML.safe()
  def render_error(%{heading: heading, body: body}) do
    content_tag :div, class: "c-fullscreen-error__container js-fullscreen-error" do
      content_tag :div, class: "container" do
        [
          content_tag(
            :a,
            tabindex: "0",
            class: "c-fullscreen-error__dismiss js-fullscreen-error__dismiss"
          ) do
            ["Dismiss ", fa("times")]
          end,
          content_tag(:h1, heading, class: "c-fullscreen-error__heading"),
          content_tag(:p, body)
        ]
      end
    end
  end
end

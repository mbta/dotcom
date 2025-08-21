defmodule CMS.Partial.Paragraph.TripPlanWidget do
  @moduledoc """
  Represents a widget on the page leading to the Trip Planner.
  Is also used for the Fare Calculator widget.
  """
  import CMS.Helpers,
    only: [
      field_value: 2
    ]

  @type t :: %__MODULE__{
          title: String.t() | nil,
          text: String.t() | nil,
          button_text: String.t() | nil,
          right_rail: boolean
        }

  defstruct title: "Plan a trip",
            text: nil,
            button_text: "Get trip suggestions",
            right_rail: true

  def from_api(data, _preview_opts \\ []) do
    %__MODULE__{
      title: field_value(data, "field_widget_title"),
      text: field_value(data, "field_widget_text"),
      button_text: field_value(data, "field_widget_submit_text"),
      right_rail: field_value(data, "field_right_rail")
    }
  end
end

defmodule CMS.Paragraph.UpcomingBoardMeetings do
  @moduledoc """
  Deprecated: Represents an UpcomingBoardMeetings paragraph in the CMS.
  NOTE: Use a ContentList paragraph instead.
  """
  import CMS.Helpers, only: [field_value: 2]

  alias CMS.Page.Event

  defstruct events: [],
            right_rail: false

  @type t :: %__MODULE__{
          events: [Event.t()],
          right_rail: boolean
        }

  @spec from_api(map) :: t
  def from_api(data) do
    events =
      data
      |> Map.get("view_data", [])
      |> Enum.map(&Event.from_api/1)

    right_rail = field_value(data, "field_right_rail")

    %__MODULE__{
      events: events,
      right_rail: right_rail
    }
  end
end

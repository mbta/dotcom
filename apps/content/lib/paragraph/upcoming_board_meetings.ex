defmodule Content.Paragraph.UpcomingBoardMeetings do
  alias Content.Helpers

  defstruct events: [],
            right_rail: false

  @type t :: %__MODULE__{
          events: [Content.Event.t()],
          right_rail: boolean
        }

  @spec from_api(map) :: t
  def from_api(data) do
    events =
      data
      |> Map.get("view_data", [])
      |> Enum.map(&Content.Event.from_api/1)

    right_rail = Helpers.field_value(data, "field_right_rail")

    %__MODULE__{
      events: events,
      right_rail: right_rail
    }
  end
end

defmodule Dotcom.ScheduleNoteTest do
  use ExUnit.Case, async: true

  alias Dotcom.ScheduleNote
  alias Routes.Route

  @red_line %Route{id: "Red"}
  @blue_line %Route{id: "Blue"}
  @mattapan %Route{id: "Mattapan"}
  @green_line %Route{id: "Green"}
  @green_line_b %Route{id: "Green-B"}
  @green_line_c %Route{id: "Green-C"}
  @green_line_d %Route{id: "Green-D"}
  @green_line_e %Route{id: "Green-E"}
  @foxboro %Route{id: "CR-Foxboro"}

  @all_lines [
    @red_line,
    @blue_line,
    @mattapan,
    @green_line,
    @green_line_b,
    @green_line_c,
    @green_line_d,
    @green_line_e
  ]

  describe "new/1" do
    test "returns a schedule note with peak service and offpeak service for all lines" do
      @all_lines
      |> Enum.map(&ScheduleNote.new/1)
      |> Enum.map(
        assert(fn note ->
          note.peak_service && note.saturday_service && note.sunday_service &&
            is_nil(note.alternate_text)
        end)
      )
    end

    test "returns alternate HTML text for special cases" do
      note_for_cr_foxboro = ScheduleNote.new(@foxboro)
      assert(note_for_cr_foxboro.alternate_text)
    end

    test "doesn't return a schedule note for non-subway lines" do
      assert nil == ScheduleNote.new(%Route{id: 741, type: 3})
    end
  end
end

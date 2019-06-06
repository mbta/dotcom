defmodule Site.ScheduleNoteTest do
  use ExUnit.Case, async: true

  alias Routes.Route
  alias Site.ScheduleNote

  @red_line %Route{id: "Red"}
  @blue_line %Route{id: "Blue"}
  @mattapan %Route{id: "Mattapan"}
  @green_line %Route{id: "Green"}
  @green_line_b %Route{id: "Green-B"}
  @green_line_c %Route{id: "Green-C"}
  @green_line_d %Route{id: "Green-D"}
  @green_line_e %Route{id: "Green-E"}

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
      |> Enum.map(assert(fn note -> note.peak_service && note.offpeak_service end))
    end

    test "handles lines with exceptions to offpeak service" do
      note_for_mattapan = ScheduleNote.new(@mattapan)
      assert(note_for_mattapan.peak_service && note_for_mattapan.offpeak_service)

      assert %{
               exceptions: [
                 %{
                   type: "weekend mornings and late night",
                   service: "26 minutes"
                 }
               ]
             } = note_for_mattapan
    end

    test "doesn't return a schedule note for non-subway lines" do
      assert nil == ScheduleNote.new(%Route{id: 741, type: 3})
    end
  end
end

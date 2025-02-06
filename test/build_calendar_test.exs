defmodule BuildCalendarTest do
  use ExUnit.Case, async: true

  import BuildCalendar
  import Phoenix.HTML, only: [safe_to_string: 1]

  alias BuildCalendar.{Calendar, Day}
  alias Holiday.Repo.Helpers

  defp url_fn(keywords) do
    inspect(keywords)
  end

  describe "build/2" do
    test "days starts on Sunday" do
      date = ~D[2017-01-02]
      calendar = build(date, Dotcom.Utils.DateTime.service_date(), [], &url_fn/1)
      first_day = List.first(calendar.days)

      assert first_day == %BuildCalendar.Day{
               date: ~D[2017-01-01],
               month_relation: :current,
               selected?: false,
               holiday?: false,
               url: ~s([date: "2017-01-01", date_select: nil, shift: nil])
             }
    end

    test "days at the end of the previous month are invisible" do
      date = ~D[2017-05-01]
      calendar = build(date, Dotcom.Utils.DateTime.service_date(), [], &url_fn/1)
      first_day = List.first(calendar.days)
      assert first_day.month_relation == :previous
      # 2017-05-01
      assert Enum.at(calendar.days, 1).month_relation == :current
    end

    test "calendars always have a number of days divisible by 7 and end in the next month" do
      for date <- [~D[2017-01-02], ~D[2017-05-01], ~D[2017-07-01]] do
        calendar = build(date, Dotcom.Utils.DateTime.service_date(), [], &url_fn/1)
        assert Integer.mod(length(calendar.days), 7) == 0
        assert List.last(calendar.days).month_relation == :next
      end
    end

    test "calendars that end on saturday have an extra week at the end" do
      date = ~D[2017-09-15]
      calendar = build(date, Dotcom.Utils.DateTime.service_date(), [], &url_fn/1)
      assert length(calendar.days) == 7 * 6
      assert List.last(calendar.days).month_relation == :next
    end

    test "calendars that end on friday have 8 extra days" do
      date = ~D[2017-03-15]
      calendar = build(date, Dotcom.Utils.DateTime.service_date(), [], &url_fn/1)
      assert length(calendar.days) == 7 * 6
      assert List.last(calendar.days).month_relation == :next
    end

    test "days that are holidays are marked" do
      holiday = Enum.random(Holiday.Repo.all())
      calendar = build(holiday.date, Dotcom.Utils.DateTime.service_date(), [holiday], &url_fn/1)

      for day <- calendar.days do
        if day.date == holiday.date do
          assert day.holiday?
        else
          refute day.holiday?
        end
      end
    end

    test "Holidays are included in calendar struct" do
      date = ~D[2017-01-02]
      holidays = Holiday.Repo.holidays_in_month(date)
      calendar = build(date, Dotcom.Utils.DateTime.service_date(), holidays, &url_fn/1)
      assert calendar.holidays == holidays
    end

    test "selected is marked" do
      selected = Dotcom.Utils.DateTime.service_date()
      calendar = build(selected, Timex.shift(selected, days: -1), [], &url_fn/1)

      for day <- calendar.days do
        if day.date == selected do
          assert day.selected?
        else
          refute day.selected?
        end
      end
    end

    test "today is marked" do
      service_date = ~D[2016-12-31]
      calendar = build(Timex.shift(service_date, days: 1), service_date, [], &url_fn/1)

      for day <- calendar.days do
        if day.date == service_date do
          assert day.url == url_fn(date: nil, date_select: nil, shift: nil)
          assert day.today?
        else
          refute day.today?
        end
      end
    end

    test "shifting moves the month" do
      date = ~D[2017-02-15]
      calendar = build(date, date, [], &url_fn/1, shift: 1)

      assert List.first(calendar.days) == %Day{
               # last sunday in February
               date: ~D[2017-02-26],
               month_relation: :previous,
               url: url_fn(date: "2017-02-26", date_select: nil, shift: nil)
             }

      assert List.last(calendar.days) == %Day{
               # second Saturday in April
               date: ~D[2017-04-08],
               month_relation: :next,
               url: url_fn(date: "2017-04-08", date_select: nil, shift: nil)
             }

      assert calendar.active_date == ~D[2017-03-15]
    end

    test "previous_month_url is nil if the date is the current month" do
      service_date = Dotcom.Utils.DateTime.service_date()
      calendar = build(service_date, service_date, [], &url_fn/1)
      assert calendar.previous_month_url == nil
    end

    test "previous_month_url is nil if the date is in the future but we're shifted back" do
      today = ~D[2017-02-15]
      future = ~D[2017-03-15]
      calendar = build(future, today, [], &url_fn/1, shift: -1)
      assert calendar.previous_month_url == nil
    end

    test "previous_month_url is shifted back by 1" do
      next_month = Timex.shift(Dotcom.Utils.DateTime.service_date(), months: 1)
      calendar = build(next_month, Dotcom.Utils.DateTime.service_date(), [], &url_fn/1)
      assert calendar.previous_month_url == url_fn(shift: -1)
    end

    test "next_month_url is shifted forward by 1" do
      service_date = Dotcom.Utils.DateTime.service_date()
      calendar = build(service_date, service_date, [], &url_fn/1)
      assert calendar.next_month_url == url_fn(shift: 1)
      calendar = build(service_date, service_date, [], &url_fn/1, shift: 1)
      assert calendar.next_month_url == url_fn(shift: 2)
    end

    test "next_month_url is skipped if it's past the end_date" do
      selected = ~D[2017-01-01]
      end_date = ~D[2017-01-15]

      calendar = build(selected, selected, [], &url_fn/1, end_date: end_date)
      refute calendar.next_month_url
      calendar = build(selected, selected, [], &url_fn/1, end_date: end_date, shift: -1)
      assert calendar.next_month_url

      previous_month_after_end_day = ~D[2016-12-29]
      calendar = build(previous_month_after_end_day, selected, [], &url_fn/1, end_date: end_date)
      assert calendar.next_month_url
    end
  end

  describe "Calendar.weeks/1" do
    test "breaks the days of the calendar into week blocks" do
      service_date = Dotcom.Utils.DateTime.service_date()
      calendar = build(service_date, service_date, [], &url_fn/1)
      weeks = Calendar.weeks(calendar)
      assert length(weeks) == length(calendar.days) / 7

      for week <- weeks do
        # 7 days in a week
        assert length(week) == 7
        # each week starts on sunday
        # sunday
        assert Timex.weekday(List.first(week).date) == 7
      end
    end
  end

  describe "Day.td/1" do
    test "has no content for previous months" do
      actual =
        Day.td(%Day{
          date: ~D[2017-01-01],
          month_relation: :previous
        })

      assert safe_to_string(actual) == ~s(<td class="schedule-weekend"></td>)
    end

    test "includes the day of the month, along with a link" do
      actual =
        Day.td(%Day{
          date: ~D[2017-02-23],
          url: "url"
        })

      assert safe_to_string(actual) =~ "23"
      assert safe_to_string(actual) =~ ~s(href="url")
    end

    test "if the day is selected, adds a class" do
      actual =
        Day.td(%Day{
          date: ~D[2000-12-01],
          selected?: true,
          url: ""
        })

      assert safe_to_string(actual) =~ ~s(class="schedule-selected")
    end

    test "if the day is selected but in the past, does not add a class" do
      actual =
        Day.td(%Day{
          date: ~D[2000-12-01],
          selected?: true,
          month_relation: :previous,
          url: ""
        })

      refute safe_to_string(actual) =~ ~s(class="schedule-selected")
    end

    test "if the day is a weekend, adds a class" do
      sunday =
        Day.td(%Day{
          date: ~D[2017-01-01],
          url: ""
        })

      saturday =
        Day.td(%Day{
          date: ~D[2016-12-31],
          url: ""
        })

      assert safe_to_string(sunday) =~ ~s(class="schedule-weekend")
      assert safe_to_string(saturday) =~ ~s(class="schedule-weekend")
    end

    test "if the day is next month, adds a class" do
      actual =
        Day.td(%Day{
          date: ~D[2000-12-01],
          month_relation: :next,
          url: ""
        })

      assert safe_to_string(actual) =~ ~s(class="schedule-next-month")
    end

    test "if selected is a weekend, includes both classes" do
      actual =
        Day.td(%Day{
          date: ~D[2017-01-01],
          selected?: true,
          url: ""
        })

      assert safe_to_string(actual) =~ ~s(class="schedule-weekend schedule-selected")
    end

    test "upcoming holidays includes today and future but not past" do
      holidays =
        Enum.flat_map(
          [
            {"Ghost of Christmas Past", [{12, 23}]},
            {"Ghost of Christmas Present", [{12, 25}]},
            {"Ghost of Christmas Future", [{12, 27}]}
          ],
          fn day -> Helpers.make_holiday(day, 1843) end
        )

      today = ~D[1843-12-25]
      calendar = build(today, today, holidays, &url_fn/1)
      assert calendar.upcoming_holidays == Enum.drop(holidays, 1)
    end
  end
end

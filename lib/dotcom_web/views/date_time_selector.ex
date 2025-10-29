defmodule DateTimeSelector do
  @moduledoc "Reusable customizable selector for date and time"

  use DotcomWeb, :view

  import PhoenixHTMLHelpers.Tag

  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Phoenix.{HTML.Form}

  @minute_options 0..55
                  |> Enum.filter(&(Integer.mod(&1, 5) == 0))
                  |> Enum.map(fn
                    int when int < 10 -> "0" <> Integer.to_string(int)
                    int -> Integer.to_string(int)
                  end)

  @spec verify_params(Form.t(), DateTime.t()) :: map
  defp verify_params(form, datetime) do
    datetime_params = form.params["date_time"] || %{}

    if Util.parse(datetime_params) == {:error, :invalid_date} do
      [hour, am_pm_value] =
        datetime
    |> Dotcom.Utils.Time.format!(:time_12h)
        |> String.split(" ")

      %{
        "year" => datetime.year,
        "month" => datetime.month,
        "day" => datetime.day,
        "hour" => hour,
        "minute" => datetime.minute,
        "am_pm" => am_pm_value
      }
    else
      datetime_params
    end
  end

  def custom_date_time_select(form, date_ranges, %DateTime{} = datetime \\ Util.now()) do
    time_options = [
  hour: [options: 1..12, selected: Dotcom.Utils.Time.format!(datetime, :h12)],
      minute: [selected: datetime.minute]
    ]

    date_options = [
      year: [options: Range.new(datetime.year - 1, datetime.year + 1), selected: datetime.year],
      month: [selected: datetime.month],
      day: [selected: datetime.day],
      default: datetime
    ]

    form =
      if Enum.empty?(form.params) do
        form
      else
        # `date_select` needs year, month and day
        # `time_select` needs at least hour and minute
        # so we ensure that those keys exist in the parameters of the form:
        form_params = Map.merge(form.params, %{"date_time" => verify_params(form, datetime)})

        %{form | params: form_params}
      end

    content_tag(
      :div,
      [
        custom_time_select(form, datetime, time_options),
        custom_date_select(form, datetime, date_options, date_ranges)
      ],
      class: "form-group plan-date-time"
    )
  end

  @spec custom_date_select(Form.t(), DateTime.t(), Keyword.t(), map) :: Phoenix.HTML.Safe.t()
  defp custom_date_select(form, %DateTime{} = datetime, options, date_ranges) do
  min_date = Dotcom.Utils.Time.format!(date_ranges.min_date, :mm_dd_yyyy)
  max_date = Dotcom.Utils.Time.format!(date_ranges.max_date, :mm_dd_yyyy)
  current_date = Dotcom.Utils.Time.format!(datetime, :weekday_full_date)
    aria_label = "#{current_date}, click or press the enter or space key to edit the date"

    prefix = form.id

    content_tag(
      :div,
      [
        content_tag(
          :label,
          content_tag(
            :div,
            svg_icon_with_circle(%SvgIconWithCircle{icon: :calendar, show_tooltip?: false}),
            class: "m-trip-plan__calendar-input-icon",
            aria_hidden: "true"
          ),
          id: "#{prefix}-date-label",
          class: "m-trip-plan__calendar-input-label",
          for: "#{prefix}-date-input",
          name: "Date",
          aria_label: aria_label
        ),
        content_tag(
          :input,
          [],
          type: "text",
          class: "plan-date-input",
          id: "#{prefix}-date-input",
          data: ["min-date": min_date, "max-date": max_date]
        ),
        date_select(
          form,
          :date_time,
          Keyword.put(options, :builder, &custom_date_select_builder(&1, prefix))
        )
      ],
      class: "plan-date",
      id: "#{prefix}-date"
    )
  end

  @spec custom_date_select_builder(fun, String.t()) :: Phoenix.HTML.Safe.t()
  defp custom_date_select_builder(field, prefix) do
    content_tag(
      :div,
      [
        content_tag(:label, "Month", for: "#{prefix}_date_time_month", class: "sr-only"),
        field.(:month, class: "c-select"),
        content_tag(:label, "Day", for: "#{prefix}_date_time_day", class: "sr-only"),
        field.(:day, class: "c-select"),
        content_tag(:label, "Year", for: "#{prefix}_date_time_year", class: "sr-only"),
        field.(:year, class: "c-select")
      ],
      class: "plan-date-select hidden-js",
      id: "#{prefix}-date-select"
    )
  end

  @spec custom_time_select(Form.t(), DateTime.t(), Keyword.t()) :: Phoenix.HTML.Safe.t()
  defp custom_time_select(form, datetime, options) do
  current_time = Dotcom.Utils.Time.format!(datetime, :time_12h_with_minutes)
    aria_label = "#{current_time}, click or press the enter or space key to edit the time"

    prefix = form.id

    content_tag(
      :div,
      [
        content_tag(
          :label,
          [],
          id: "#{prefix}-time-label",
          class: "m-trip-plan__time-input-label",
          for: "#{prefix}-time-input",
          name: "Time",
          aria_label: aria_label,
          data: [time: current_time]
        ),
        time_select(
          form,
          :date_time,
          Keyword.put(options, :builder, &custom_time_select_builder(&1, datetime, prefix))
        )
      ],
      class: "plan-time",
      id: "#{prefix}-time"
    )
  end

  defp custom_time_select_builder(field, datetime, prefix) do
    content_tag(
      :div,
      [
        content_tag(:label, "Hour", for: "#{prefix}_date_time_hour", class: "sr-only"),
        field.(:hour, class: "c-select"),
        content_tag(:label, "Minute", for: "#{prefix}_date_time_minute", class: "sr-only"),
        field.(:minute, class: "c-select", options: @minute_options),
        " ",
        content_tag(:label, "AM or PM", for: "#{prefix}_date_time_am_pm", class: "sr-only"),
        select(
          :date_time,
          :am_pm,
          [AM: "AM", PM: "PM"],
          selected: Dotcom.Utils.Time.format!(datetime, :time_12h),
          name: "#{prefix}[date_time][am_pm]",
          id: "#{prefix}_date_time_am_pm",
          class: "c-select plan-date-time-am-pm"
        )
      ],
      class: "plan-time-select",
      id: "#{prefix}-time-select"
    )
  end
end

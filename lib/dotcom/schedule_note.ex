defmodule Dotcom.ScheduleNote do
  @moduledoc """
  Represents text describing the schedule for a subway route
  """

  use Dotcom.Gettext.Sigils

  import PhoenixHTMLHelpers.{Link, Tag}

  alias DotcomWeb.Router.Helpers
  alias Phoenix.HTML
  alias Routes.Route

  @green_line_branch_ids GreenLine.branch_ids()

  defstruct alternate_text: nil,
            exceptions: [],
            offpeak_service: "",
            peak_service: "",
            saturday_service: "",
            sunday_service: ""

  @type exception :: %{
          type: String.t(),
          service: String.t()
        }

  @type t :: %__MODULE__{
          alternate_text: String.t() | nil,
          exceptions: [exception],
          offpeak_service: String.t() | nil,
          peak_service: String.t(),
          saturday_service: String.t(),
          sunday_service: String.t()
        }

  @spec new(Route.t()) :: t | nil
  def new(route) do
    schedule_note(route)
  end

  def schedule_note(%Route{id: "Red"}) do
    %__MODULE__{
      peak_service: "#{window(4, 5)} within trunk, every #{window(8, 14)} on branches",
      saturday_service: "#{window(6, 8)} within trunk, every #{window(12, 13)} on branches",
      sunday_service: "#{window(6, 8)} within trunk, every #{window(12, 13)} on branches"
    }
  end

  def schedule_note(%Route{id: "Mattapan"}) do
    %__MODULE__{
      offpeak_service: window(9, 13),
      peak_service: window(6, 7),
      saturday_service: window(13),
      sunday_service: window(12, 13)
    }
  end

  def schedule_note(%Route{id: "Orange"}) do
    %__MODULE__{
      peak_service: window(4, 5),
      saturday_service: window(7, 8),
      sunday_service: window(8, 10)
    }
  end

  def schedule_note(%Route{id: "Blue"}) do
    %__MODULE__{
      offpeak_service: window(7, 12),
      peak_service: window(4, 5),
      saturday_service: window(7, 10),
      sunday_service: window(7, 10)
    }
  end

  def schedule_note(%Route{id: route_id})
      when route_id == "Green" or route_id in @green_line_branch_ids do
    %__MODULE__{
      offpeak_service: window(7, 12),
      peak_service: window(6, 8),
      saturday_service: window(8, 15),
      sunday_service: window(8, 20)
    }
  end

  def schedule_note(%Route{id: "CR-Foxboro"}) do
    %__MODULE__{
      peak_service: nil,
      alternate_text:
        HTML.safe_to_string(
          content_tag(:div, [
            content_tag(
              :p,
              [
                content_tag(
                  :strong,
                  ~t"The Foxboro Special Events line is only for occasional service."
                ),
                ~t" It travels along limited stops between Foxboro and either Providence or Downtown Boston (South Station)"
              ],
              class: "m-schedule-page__service-note-time"
            ),
            content_tag(
              :p,
              [
                content_tag(
                  :strong,
                  ~t"For regular weekday service to Foxboro please visit: "
                ),
                link(
                  ~t"Franklin Line",
                  to: Helpers.timetable_path(DotcomWeb.Endpoint, :show, "CR-Franklin")
                )
              ],
              class: "m-schedule-page__service-note-time"
            )
          ])
        )
    }
  end

  def schedule_note(_) do
    nil
  end

  # The window in which we expect a train to arrive/depart.
  # Only one time is given, so we treat it as an average.
  defp window(avg) do
    gettext("%{avg} minutes", avg: avg)
  end

  # The window in which we expect a train to arrive/depart.
  # Two times are given so it is a true window.
  defp window(min, max) do
    gettext("%{min} \u2013 %{max} minutes", min: min, max: max)
  end
end

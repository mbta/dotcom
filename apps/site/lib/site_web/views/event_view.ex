defmodule SiteWeb.EventView do
  @moduledoc "Module to display fields on the events view"
  use SiteWeb, :view

  import Site.FontAwesomeHelpers
  import SiteWeb.CMSView, only: [file_description: 1, render_duration: 2]

  alias CMS.Page.Event

  @spec shift_date_range(String.t(), integer) :: String.t()
  def shift_date_range(iso_string, shift_value) do
    iso_string
    |> Timex.parse!("{ISOdate}")
    |> Timex.shift(months: shift_value)
    |> Timex.beginning_of_month()
    |> Util.convert_to_iso_format()
  end

  @spec calendar_title(String.t()) :: String.t()
  def calendar_title(month), do: name_of_month(month)

  @spec name_of_year(String.t()) :: String.t()
  def name_of_year(iso_string) do
    iso_string
    |> Timex.parse!("{ISOdate}")
    |> Timex.format!("{YYYY}")
  end

  @spec name_of_month(String.t()) :: String.t()
  def name_of_month(iso_string) do
    iso_string
    |> Timex.parse!("{ISOdate}")
    |> Timex.format!("{Mfull}")
  end

  @doc "Returns a pretty format for the event's city and state"
  @spec city_and_state(%Event{}) :: String.t() | nil
  def city_and_state(%Event{city: city, state: state}) do
    if city && state do
      "#{city}, #{state}"
    end
  end
end

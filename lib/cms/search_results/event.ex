defmodule CMS.SearchResult.Event do
  @moduledoc false

  import CMS.Helpers, only: [parse_iso_datetime: 1]

  defstruct title: "",
            url: "",
            start_time: nil,
            location: ""

  @type t :: %__MODULE__{
          title: String.t(),
          url: String.t(),
          start_time: DateTime.t() | nil,
          location: String.t()
        }

  def build(result) do
    %__MODULE__{
      title: result["ts_title"],
      url: List.first(result["sm_url"]),
      start_time: start_time(result["ds_field_start_time"]),
      location: location(result)
    }
  end

  defp start_time(datestring) do
    datestring
    |> String.replace("Z", "")
    |> parse_iso_datetime()
  end

  defp location(%{"ss_field_imported_address" => address}), do: address

  defp location(%{
         "ss_field_location" => location,
         "ss_field_street_address" => street,
         "ss_field_city" => city,
         "ss_field_state" => state
       }),
       do: "#{location}, #{street}, #{city} #{state}"

  defp location(_), do: ""
end

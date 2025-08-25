defmodule CMS.Partial.Banner do
  @moduledoc """
  Represents the "Banner" aka "important_notice" content type in the CMS.
  Banners are displayed near the top of the homepage and have text.
  """

  import CMS.Helpers,
    only: [
      field_value: 2,
      parse_link: 2,
      category: 1,
      routes: 1
    ]

  alias CMS.API
  alias CMS.Field.Image
  alias CMS.Field.Link

  defstruct blurb: "",
            link: %Link{},
            thumb: nil,
            banner_type: :default,
            text_position: :left,
            category: "",
            routes: [],
            updated_on: "",
            title: "",
            utm_url: nil

  @type t :: %__MODULE__{
          blurb: String.t() | nil,
          link: Link.t() | nil,
          thumb: Image.t() | nil,
          banner_type: :default | :important,
          text_position: :left | :right,
          category: String.t(),
          routes: [API.route_term()],
          title: String.t(),
          updated_on: String.t(),
          utm_url: String.t() | nil
        }

  @spec from_api(map) :: t
  def from_api(data) do
    %__MODULE__{
      blurb: field_value(data, "field_in_blurb") || field_value(data, "title") || "",
      link: parse_link(data, "field_in_link"),
      thumb: parse_image(data["field_image"]) || parse_image(data["field_in_thumb"]),
      banner_type: data |> field_value("field_banner_type") |> banner_type(),
      text_position: data |> field_value("field_text_position") |> text_position(),
      category: category(data),
      routes: data |> Map.get("field_related_transit", []) |> routes(),
      updated_on: data |> field_value("field_updated_on") |> updated_on(),
      title: field_value(data, "title") || "",
      utm_url: nil
    }
  end

  @spec parse_image([map]) :: Image.t() | nil
  defp parse_image([%{} = api_image]), do: Image.from_api(api_image)
  defp parse_image(_), do: nil

  @spec banner_type(String.t() | nil) :: :important | :default
  defp banner_type("important"), do: :important
  defp banner_type(_), do: :default

  @spec text_position(String.t() | nil) :: :left | :right
  defp text_position("right"), do: :right
  defp text_position(_), do: :left

  @spec updated_on(String.t() | nil) :: String.t()
  defp updated_on(date) when is_binary(date) do
    date
    |> Timex.parse("{YYYY}-{M}-{D}")
    |> do_updated_on()
  end

  defp updated_on(_) do
    ""
  end

  defp do_updated_on({:ok, date}) do
    case Timex.format(date, "{Mfull} {D}, {YYYY}") do
      {:ok, formatted} -> formatted
      {:error, _} -> ""
    end
  end

  defp do_updated_on(_) do
    ""
  end
end

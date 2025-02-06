defmodule LocationService.Address do
  @moduledoc """
  An address provided by a Geocode or Place lookup.
  """
  @type highlighted_span :: %{
          offset: integer(),
          length: non_neg_integer()
        }
  @type t :: %__MODULE__{
          formatted: String.t(),
          highlighted_spans: [highlighted_span()],
          latitude: float,
          longitude: float,
          street_address: String.t(),
          municipality: String.t(),
          state: String.t()
        }
  @derive Jason.Encoder
  defstruct formatted: nil,
            highlighted_spans: [],
            latitude: 0.0,
            longitude: 0.0,
            street_address: nil,
            municipality: nil,
            state: nil

  @spec new(map()) :: %__MODULE__{}
  @spec new(map(), String.t()) :: %__MODULE__{}
  def new(
        %{"Label" => label, "Geometry" => %{"Point" => [lon, lat]}},
        queried_text \\ nil
      ) do
    address =
      label
      |> replace_common_street_suffix()
      |> AddressUS.Parser.parse_address()

    street_address =
      case address.street do
        %AddressUS.Street{
          name: street_name,
          primary_number: street_number,
          suffix: street_suffix
        } ->
          "#{street_number} #{street_name} #{street_suffix}" |> String.trim()

        _ ->
          nil
      end

    %LocationService.Address{
      formatted: label,
      highlighted_spans:
        if(queried_text, do: get_highlighted_spans(queried_text, label), else: []),
      latitude: lat,
      longitude: lon,
      street_address: street_address |> with_place_name(label),
      municipality: address.city,
      state: address.state
    }
  end

  # Get the text before the street address
  defp with_place_name(street_address, label) do
    if String.contains?(label, street_address) do
      label
      |> String.split(street_address)
      |> List.first()
      |> String.trim_trailing(",")
      |> then(&(&1 <> street_address))
    else
      # Likely a simpler place, e.g. "Prudential Tunnel, Boston, MA, 02199, USA" - just take the first part
      label
      |> String.split(",")
      |> List.first()
    end
  end

  defimpl Dotcom.Utils.Position do
    def latitude(address), do: address.latitude
    def longitude(address), do: address.longitude
  end

  @doc """
  Gets indices of spans of text that should be highlighted in the
  autocomplete dropdown.

  Essentially, `search` is split on whitespace, and then we search `text`
  for words that start with any of the `search` terms. The spans are
  non-overlapping, and sorted by `offset`. There are examples in the tests
  that should further clarify the behavior.
  """
  @spec get_highlighted_spans(String.t(), String.t()) :: [highlighted_span()]
  def get_highlighted_spans(search, text) do
    parts = String.split(search)

    Enum.flat_map(parts, fn p ->
      # (^|\\W) -- Match start of string or non-word character
      # (?<t>   -- Begin a capture group named `t`
      # p       -- Match the current part
      # \\w*    -- Match any number of word characters
      # )       -- Close `t`
      src = "(^|\\W)(?<t>" <> Regex.escape(p) <> "\\w*)"
      {:ok, re} = Regex.compile(src, "i")

      Regex.scan(re, text, return: :index, capture: :all_names)
      |> Enum.map(fn
        [{offset, length}] -> %{offset: offset, length: length}
        nil -> nil
      end)
      |> Enum.filter(& &1)
    end)
    |> Enum.uniq()
    |> Enum.sort(&(&1.offset <= &2.offset))
  end

  def replace_common_street_suffix(text) when is_binary(text) do
    text
    |> String.replace(" Av,", " Avenue,")
    |> String.replace(" Ave,", " Avenue,")
    |> String.replace(" Bv,", " Boulevard,")
    |> String.replace(" Blvd,", " Boulevard,")
    |> String.replace(" Ci,", " Circle,")
    |> String.replace(" Cir,", " Circle,")
    |> String.replace(" Cl,", " Circle,")
    |> String.replace(" Ct,", " Court,")
    |> String.replace(" Ctr,", " Center,")
    |> String.replace(" Dr,", " Drive,")
    |> String.replace(" La,", " Lane,")
    |> String.replace(" Ln,", " Lane,")
    |> String.replace(" Pw,", " Parkway,")
    |> String.replace(" Pkwy,", " Parkway,")
    |> String.replace(" Pi,", " Pike,")
    |> String.replace(" Pk,", " Pike,")
    |> String.replace(" Pl,", " Place,")
    |> String.replace(" Pt,", " Point,")
    |> String.replace(" Rd,", " Road,")
    |> String.replace(" Sq,", " Square,")
    |> String.replace(" St,", " Street,")
    |> String.replace(" Str,", " Street,")
    |> String.replace(" Te,", " Terrace,")
    |> String.replace(" Wy,", " Way,")
  end

  def replace_common_street_suffix(other), do: other
end

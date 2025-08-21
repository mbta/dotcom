defmodule CMS.Search.Facet do
  @moduledoc "Module for representation of a search facet"

  defstruct label: :ignore,
            value: "",
            active?: false,
            count: 0

  @type t :: %__MODULE__{
          label: String.t() | :ignore,
          value: String.t(),
          active?: boolean,
          count: non_neg_integer
        }

  @doc "Builds a facet"
  def build({value, count}, input) do
    %__MODULE__{
      label: facet_label(value),
      value: value,
      active?: Enum.member?(input, value),
      count: count
    }
  end

  defp facet_label("event"), do: "Event"
  defp facet_label("landing_page"), do: "Main Page"
  defp facet_label("news_entry"), do: "News"
  defp facet_label("page"), do: "Page"
  defp facet_label("person"), do: "Person"
  defp facet_label("search_result"), do: :ignore
end

defmodule DotcomWeb.Components.SearchHits do
  @moduledoc """
  Rendering search results from our Algolia data.
  Don't review me yet! I'll be refined in a future PR that handles displaying each type of hit.
  """

  use DotcomWeb, :component

  attr :hit, :any, doc: "A single search result"
  attr :rest, :global

  def hit(assigns) do
    url = hit_url(assigns.hit)

    assigns =
      assigns
      |> assign(:icon, hit_icon(assigns.hit))
      |> assign(:url, unverified_url(DotcomWeb.Endpoint, url))

    ~H"""
    <.link
      href={@url}
      class="flex items-center gap-sm font-normal text-black hover:no-underline"
    >
      <.icon
        type="icon-svg"
        name={@icon}
        class="h-4 w-4 shrink-0"
        aria-hidden="true"
      />
      {name(@hit)}
    </.link>
    """
  end

  defp name(%{"route" => %{"name" => name}}), do: name
  defp name(%{"stop" => %{"name" => name}}), do: name
  defp name(%{"content_title" => name}), do: name
  defp name(%{"file_name_raw" => name}), do: name

  defp hit_url(%{"url" => url}), do: url

  defp hit_url(%{"search_api_datasource" => "entity:file", "_file_uri" => uri}),
    do: "/sites/default/files/#{String.replace(uri, ~r/public:\/\//, "")}"

  defp hit_url(%{"_content_type" => "search_result", "_search_result_url" => url}),
    do: String.replace(url, ~r/internal:/, "")

  defp hit_url(%{"_content_url" => url}), do: url

  # Definitely replace me with a sane, non-randomized icon
  defp hit_icon(_hit) do
    :dotcom
    |> Application.app_dir()
    |> Kernel.<>("/priv/static/icon-svg/icon-mode*.svg")
    |> Path.wildcard()
    |> Enum.map(
      &(String.split(&1, "icon-svg/", trim: true)
        |> List.last()
        |> String.trim_trailing(".svg"))
    )
    |> Faker.Util.pick()
  end
end

defmodule Dotcom.ContentRewriters.EmbeddedMedia do
  @moduledoc """
  Extract CMS embed attributes, media classes, captions,
  and other details from processed <figure> HTML. All HTML is already
  sanitized and scrubbed prior to being re-parsed here.
  """

  alias Dotcom.{FlokiHelpers}

  @iframe_domains [
    "google.com/maps",
    "livestream.com",
    "mbtace.com/shuttle-tracker",
    "youtube.com",
    "youtu.be",
    "cdn.knightlab.com"
  ]

  defstruct alignment: :none,
            caption: "",
            element: "",
            extra_classes: [],
            link_attrs: [],
            size: :wide,
            type: :image

  @valid_sizes [:wide, :half, :third]
  @valid_types [:image, :embed]

  @type t :: %__MODULE__{
          alignment: :left | :right | :none,
          caption: Floki.html_tree() | String.t(),
          element: Floki.html_tree(),
          extra_classes: iodata(),
          link_attrs: list(),
          size: atom(),
          type: atom()
        }

  def parse({_, attributes, children}) do
    media_element = get_media(children)

    media_classes =
      children
      |> Floki.attribute(".media", "class")
      |> List.first()

    media_classes = if(media_classes, do: String.split(media_classes), else: [])

    %__MODULE__{
      alignment: get_alignment(attributes),
      caption: get_caption(children),
      element: media_element,
      extra_classes: [],
      link_attrs: get_link(children),
      size: get_attribute(media_classes, :size),
      type: get_attribute(media_classes, :type)
    }
  end

  @doc """
  Reconstrust the figure element with BEM classes and the (link->embed)+caption elements;
  process the children normally (ensures images get the img-fluid class, etc). Also,
  wrap the media element in a rebuilt link, if link information is available.
  """
  def build(%__MODULE__{type: type, size: size} = media)
      when size in @valid_sizes and type in @valid_types do
    media_embed =
      media.link_attrs
      |> case do
        [_ | _] -> {"a", media.link_attrs, media.element}
        _ -> media.element
      end
      |> FlokiHelpers.add_class(media.extra_classes)

    alignment_modifier =
      case media.alignment do
        :none -> ""
        _ -> " c-media--align-#{media.alignment}"
      end

    caption_modifier =
      case media.caption do
        "" -> ""
        _ -> " c-media--with-caption"
      end

    {
      "figure",
      [
        {
          "class",
          "c-media " <>
            "c-media--#{media.type} " <>
            "c-media--#{media.size}" <> "#{alignment_modifier}" <> "#{caption_modifier}"
        }
      ],
      [
        {"div", [{"class", "c-media__content"}],
         [
           media_embed,
           media.caption
         ]}
      ]
    }
  end

  def build(_) do
    {:ok, [parsed]} = Floki.parse_fragment(~s(<div class="incompatible-media"></div>))

    parsed
  end

  def media_iframe?(src), do: String.contains?(src, @iframe_domains)

  def iframe(original) do
    # Avoid conflicts by replacing legacy classes with media-specific class
    iframe =
      original
      |> FlokiHelpers.remove_class("iframe")
      |> FlokiHelpers.remove_class("iframe-full-width")
      |> FlokiHelpers.add_class("c-media__embed")

    # Generate a new EmbeddedMedia struct with curated properties
    proto_media = %__MODULE__{
      element: {"div", [{"class", "c-media__element"}], iframe},
      extra_classes: ["c-media__element--fixed-aspect", " ", "c-media__element--aspect-wide"],
      size: :wide,
      type: :embed
    }

    # Return the full HTML
    build(proto_media)
  end

  defp get_media(wrapper_children) do
    # Isolate the actual embedded media element. Add BEM class.
    case Floki.find(wrapper_children, ".media-content > *:first-child") do
      [media | _] -> FlokiHelpers.add_class(media, ["c-media__element"])
      [] -> nil
    end
  end

  # Determine if there is a caption and return it. Add BEM class.
  defp get_caption(wrapper_children) do
    case Floki.find(wrapper_children, "figcaption") do
      [caption | _] -> FlokiHelpers.add_class(caption, ["c-media__caption"])
      [] -> ""
    end
  end

  # Determine if there is a link and capture certain attributes.
  defp get_link(wrapper_children) do
    case Floki.find(wrapper_children, ".media-link") do
      [{_, _, _} = link | _] ->
        [
          {"class", "c-media__link"},
          {"href", Floki.attribute(link, "href")},
          {"target", Floki.attribute(link, "target")}
        ]

      [] ->
        nil
    end
  end

  # Parse wrapper classes for alignment value.
  defp get_alignment([{"class", wrapper_classes}]) do
    classes = String.split(wrapper_classes)

    cond do
      "align-left" in classes -> :left
      "align-right" in classes -> :right
      true -> :none
    end
  end

  # Parse media element class for size and type.
  defp get_attribute(classes, :size) do
    cond do
      "media--view-mode-full" in classes -> :wide
      "media--view-mode-half" in classes -> :half
      "media--view-mode-third" in classes -> :half
      true -> :unknown
    end
  end

  defp get_attribute(classes, :type) do
    if "media--type-image" in classes do
      :image
    else
      :unknown
    end
  end
end

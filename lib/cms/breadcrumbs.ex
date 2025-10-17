defmodule CMS.Breadcrumbs do
  @moduledoc """
  Maps CMS breadcrumbs to a breadcrumb struct.
  """

  use Dotcom.Gettext.Sigils

  alias Util.Breadcrumb

  @spec build(map) :: [Breadcrumb.t()]
  def build(%{"breadcrumbs" => breadcrumbs}) do
    Enum.map(breadcrumbs, fn crumb ->
      Breadcrumb.build(crumb["text"], crumb["uri"])
    end)
  end

  def build(%{"title" => [%{"value" => title}]}) do
    [
      Breadcrumb.build(~t"Home", "/"),
      Breadcrumb.build(title)
    ]
  end
end

defmodule Dotcom.ContentRewriters.CodeEmbed do
  @moduledoc """
  Code embeds should not be modified unless necessary!
  """

  @tableau_cloud_token_module Application.compile_env(
                                :dotcom,
                                :tableau_cloud_token_module,
                                TableauCloudToken
                              )

  @spec rewrite(Phoenix.HTML.safe()) :: Phoenix.HTML.safe()
  def rewrite({:safe, content}) do
    {:ok, parsed} = Floki.parse_fragment(content)

    parsed
    |> Enum.map(&dispatch_rewrites/1)
    |> Floki.raw_html(encode: false)
    |> Phoenix.HTML.raw()
  end

  # Tableau dashboards: add the JWT needed for authentication
  @spec dispatch_rewrites(Floki.html_tree()) :: Floki.html_tree()
  defp dispatch_rewrites({"tableau-viz", attrs, children}) do
    attrs = [{"token", @tableau_cloud_token_module.default_token()} | attrs]
    {"tableau-viz", attrs, children}
  end

  defp dispatch_rewrites({name, attrs, children}) when is_list(children) do
    {name, attrs, Enum.map(children, &dispatch_rewrites/1)}
  end

  defp dispatch_rewrites(element), do: element
end

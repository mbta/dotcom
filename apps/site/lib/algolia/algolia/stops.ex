defmodule Algolia.Stops do
  @behaviour Algolia.Index
  @repo :site
        |> Application.get_env(:algolia_repos)
        |> Keyword.fetch!(:stops)

  @impl Algolia.Index
  def all do
    @repo.all
    |> Enum.reject(& &1.is_child?)
  end

  @impl Algolia.Index
  def index_name, do: "stops"

  def by_route(route_id), do: @repo.by_route({route_id, 0, []})
end

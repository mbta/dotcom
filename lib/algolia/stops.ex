defmodule Algolia.Stops do
  @moduledoc false
  @behaviour Algolia.Index

  @repo :dotcom
        |> Application.compile_env!(:algolia_repos)
        |> Keyword.fetch!(:stops)

  @impl Algolia.Index
  def all do
    Enum.reject(@repo.all, & &1.child?)
  end

  @impl Algolia.Index
  def index_name, do: "stops"

  def by_route(route_id), do: @repo.by_route({route_id, 0, []})
end

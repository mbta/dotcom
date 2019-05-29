defmodule Algolia.MockObject do
  defstruct [:id]
end

defimpl Algolia.Object, for: Algolia.MockObject do
  def data(obj), do: %{data: obj}
  def object_id(obj), do: "object-" <> obj.id
  def url(obj), do: "/object/" <> obj.id
end

defmodule Algolia.MockObjects do
  @behaviour Algolia.Index

  @impl Algolia.Index
  def all, do: [%Algolia.MockObject{id: "test"}]

  @impl Algolia.Index
  def index_name, do: "objects"
end

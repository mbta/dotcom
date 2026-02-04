defmodule Vehicles.Repo.Behaviour do
  @moduledoc """
  Behaviour specifying `Vehicles.Repo`.
  """

  alias Vehicles.Vehicle

  @callback get(String.t()) :: Vehicle.t() | nil

  @callback route(String.t(), Keyword.t()) :: [Vehicle.t()]

  @callback trip(String.t()) :: Vehicle.t() | nil

  @callback all(keyword(String.t())) :: [Vehicle.t()]
end

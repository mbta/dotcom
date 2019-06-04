defmodule Mix.Tasks.Algolia.Update do
  use Mix.Task
  alias Algolia.Update

  @moduledoc """
  Updates data in algolia indexes
  """

  def run(args) do
    _ = Application.ensure_all_started(:site)

    {opts, _, _} = OptionParser.parse(args, switches: [host: :string])

    opts
    |> Keyword.get(:host)
    |> Update.update()
    |> get_result_message()
    |> IO.ANSI.format()
    |> IO.puts()
  end

  def get_result_message(%{Algolia.Routes => :ok, Algolia.Stops => :ok}) do
    [:green, "Algolia successfully updated!"]
  end

  def get_result_message(error) do
    [:red, "Error updating Algolia: ", inspect(error)]
  end
end

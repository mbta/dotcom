defmodule Mix.Tasks.Algolia.Update do
  @moduledoc """
  Updates data in Algolia indexes

  Run:
    mix algolia.update
  """

  use Mix.Task
  alias Algolia.Update

  @shortdoc "Update data in Algolia indexes"
  @impl Mix.Task
  def run(args) do
    Mix.Task.run("app.start")

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

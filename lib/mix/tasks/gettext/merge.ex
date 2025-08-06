defmodule Mix.Tasks.Gettext.Merge do
  @moduledoc """
  We don't want to run the Gettext merge task.
  Use `mix gettext.translate` instead.
  """

  @shortdoc "Do not run this task. Use `mix gettext.translate` instead"

  use Mix.Task

  @impl Mix.Task
  def run(_) do
    IO.puts("Do not use this task. Use `mix gettext.translate` instead")

    :ok
  end
end

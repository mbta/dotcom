defmodule Site.React.Worker do
  @moduledoc """
  React renderer worker
  """
  require Logger
  use GenServer

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts)
  end

  def init(_opts) do
    node = System.find_executable("node") || System.find_executable("nodejs")
    config = Application.get_env(:site, :react)
    port = Port.open({:spawn_executable, node}, args: [config[:build_path]])
    {:ok, %{port: port}}
  end

  def handle_call({:render, name, props}, _from, %{port: port} = state) do
    body =
      Poison.encode!(%{
        name: name,
        props: props
      })

    Port.command(port, body <> "\n")

    response =
      ""
      |> receive_response()
      |> Poison.decode!()

    if Map.get(response, "error", nil) do
      {:reply, {:error, response}, state}
    else
      {:reply, {:ok, response}, state}
    end
  end

  defp receive_response(prev_responses) do
    receive do
      {_, {:data, data}} ->
        str = to_string(data)
        new_resp = prev_responses <> str

        if String.ends_with?(str, "\n") do
          new_resp
        else
          receive_response(new_resp)
        end
    end
  end

  def handle_info(msg, state) do
    _ = Logger.warn(inspect(msg))
    {:noreply, state}
  end
end

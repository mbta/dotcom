defmodule CMS.API.TimeRequest do
  @moduledoc false

  require Logger

  @http_pool Application.compile_env!(:dotcom, :cms_http_pool)
  @httpoison Application.compile_env!(:dotcom, :httpoison)

  @doc """
  Wraps an HTTP call and times how long the request takes.  Returns the HTTP response.
  """
  def time_request(method, url, body \\ "", headers \\ [], opts \\ []) do
    opts =
      opts
      |> Keyword.put_new(:hackney, [])
      |> Keyword.update!(:hackney, &Keyword.put(&1, :pool, @http_pool))

    {time, response} =
      :timer.tc(@httpoison, :request, [
        method,
        url,
        body,
        headers,
        opts
      ])

    log_response(time, url, opts, response)
    response
  end

  defp log_response(time, url, opts, response) do
    _ =
      Logger.info(fn ->
        text =
          case response do
            {:ok, %{status_code: code}} -> "status=#{code}"
            {:error, e} -> "status=error error=#{inspect(e)}"
          end

        time = time / :timer.seconds(1)
        "#{__MODULE__} response url=#{url} options=#{inspect(opts)} #{text} duration=#{time}"
      end)

    :ok
  end
end

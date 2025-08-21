defmodule DotcomWeb.Plugs.RemoteIp do
  @moduledoc """

  Infers a client's "real" IP address from the X-Forwarded-For header, since the
  Phoenix app lives behind an AWS load balancer.[0]

  The plug sets the Conn's remote_ip field, and adds an `:ip` to the `Logger.metadata`.

  [0] http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/x-forwarded-headers.html

  """

  @behaviour Plug
  @forward_header "x-forwarded-for"

  @impl true
  def init(opts), do: opts

  @impl true
  def call(conn, _opts) do
    with [ips] when is_binary(ips) <- Plug.Conn.get_req_header(conn, @forward_header),
         {:ok, ip} <- remote_ip(ips) do
      Logger.metadata(ip: format(ip))
      %{conn | remote_ip: ip}
    else
      _ -> conn
    end
  end

  defp remote_ip(ips) do
    ips
    |> String.split(",", trim: true)
    |> List.last()
    |> String.trim()
    |> to_charlist
    |> :inet.parse_address()
  end

  def format(ip) do
    "#{elem(ip, 0)}.#{elem(ip, 1)}.#{elem(ip, 2)}.#{elem(ip, 3)}"
  end
end

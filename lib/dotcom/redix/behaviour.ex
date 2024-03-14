defmodule Dotcom.Redix.Behaviour do
  @moduledoc """
  A behaviour module for Redix.
  """

  @callback command(Redix.connection(), Redix.command()) ::
              {:ok, Redix.Protocol.redis_value()}
              | {:error, atom() | Redix.Error.t() | Redix.ConnectionError.t()}
  @callback start_link(String.t() | keyword()) :: {:ok, pid()} | :ignore | {:error, term()}
  @callback stop(Redix.connection()) :: :ok

  @implementation Application.compile_env!(:dotcom, :redix)

  def command(conn, cmd), do: @implementation.command(conn, cmd)
  def start_link(opts), do: @implementation.start_link(opts)
  def stop(conn), do: @implementation.stop(conn)
end

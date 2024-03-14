defmodule Dotcom.Redis.Behaviour do
  @moduledoc """
  A behaviour module for NebulexRedisAdapter.
  """

  @callback command(Redix.command()) ::
              {:ok, Redix.Protocol.redis_value()}
              | {:error, atom() | Redix.Error.t() | Redix.ConnectionError.t()}

  @implementation Application.compile_env!(:dotcom, :redis)

  def command(cmd), do: @implementation.command(cmd)
end

defmodule Dotcom.Redix.PubSub.Behaviour do
  @moduledoc """
  A behaviour module for Redix.PubSub.
  """

  @callback start_link(String.t() | keyword()) :: {:ok, pid()} | :ignore | {:error, term()}
  @callback subscribe(
              Redix.PubSub.connection(),
              String.t() | [String.t()],
              Redix.PubSub.subscriber()
            ) :: {:ok, reference()}

  @implementation Application.compile_env!(:dotcom, :redix_pub_sub)

  def start_link(opts), do: @implementation.start_link(opts)

  def subscribe(conn, channels, subscriber), do: @implementation.subscribe(conn, channels, subscriber)
end

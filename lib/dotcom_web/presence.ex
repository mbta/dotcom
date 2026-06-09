defmodule DotcomWeb.Presence do
  @moduledoc """
  Adds presence tracking to processes and channels with `Dotcom.PubSub`.
  """
  use Phoenix.Presence,
    otp_app: :my_app,
    pubsub_server: Dotcom.PubSub
end

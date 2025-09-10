defmodule Dotcom.Repo do
  @moduledoc false

  use Ecto.Repo, otp_app: :dotcom, adapter: Ecto.Adapters.Postgres
end

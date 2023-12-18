defmodule CMS.TestCache do
  use Nebulex.Cache,
    otp_app: :cms,
    adapter: Nebulex.Adapters.Local
end

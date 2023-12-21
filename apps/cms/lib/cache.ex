defmodule CMS.Cache do
  use Nebulex.Cache,
    otp_app: :cms,
    adapter: NebulexRedisAdapter
end

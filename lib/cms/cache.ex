defmodule CMS.Cache do
  use Nebulex.Cache,
    otp_app: :dotcom,
    adapter: NebulexRedisAdapter
end

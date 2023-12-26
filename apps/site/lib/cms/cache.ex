defmodule CMS.Cache do
  use Nebulex.Cache,
    otp_app: :site,
    adapter: NebulexRedisAdapter
end

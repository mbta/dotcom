import Config

config :dotcom,
  cms_http_pool: :content_http_pool

config :dotcom, :cms_api, CMS.API.HTTPClient

config :dotcom, :cms_cache, CMS.Cache

if config_env() == :test do
  config :dotcom, :drupal,
    cms_root: "http://cms.test",
    cms_static_path: "/sites/default/files"

  config :dotcom, :cms_api, CMS.API.Static

  config :dotcom, :cms_cache, CMS.TestCache
end

import Config

config :site,
  cms_http_pool: :content_http_pool

config :site, :cms_api, CMS.API.HTTPClient

if config_env() == :test do
  config :site, :drupal,
    cms_root: "http://cms.test",
    cms_static_path: "/sites/default/files"

  config :site, :cms_api, CMS.API.Static
end

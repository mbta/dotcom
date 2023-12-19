use Mix.Config

config :cms, :drupal,
  root: "http://cms.test",
  static_path: "/sites/default/files"

config :cms, :cms_api, CMS.API.Static

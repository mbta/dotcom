use Mix.Config

config :cms, :drupal,
  root: "http://cms.test",
  static_path: "/sites/default/files"

config :cms, :cms_api, CMS.API.Static

config :cms, :mailgun,
  domain: "https://test-domain.com",
  key: "key-test",
  mode: :test,
  test_file_path: "/tmp/mailgun.json"

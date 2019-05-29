use Mix.Config

config :content, :drupal,
  root: "http://cms.test",
  static_path: "/sites/default/files"

config :content, :cms_api, Content.CMS.Static

config :content, :mailgun,
  domain: "https://test-domain.com",
  key: "key-test",
  mode: :test,
  test_file_path: "/tmp/mailgun.json"

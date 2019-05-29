use Mix.Config

unless System.get_env("DRUPAL_ROOT") do
  # To see CMS content locally, please read the README on how to setup Kalabox.
  # These instructions will help you run the CMS locally and configure the
  # correct endpoint for the drupal root.
  System.put_env("DRUPAL_ROOT", "http://temp-drupal.invalid")
end

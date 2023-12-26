defmodule Algolia.ConfigTest do
  use ExUnit.Case, async: true

  describe "Algolia.Config.config/0" do
    test "builds a config object with all values populated" do
      assert :site
             |> Application.get_env(:algolia_config)
             |> Keyword.get(:app_id) == "ALGOLIA_APP_ID"

      assert %Algolia.Config{
               app_id: <<_::binary>>,
               search: <<_::binary>>,
               write: <<_::binary>>
             } = Algolia.Config.config()
    end
  end
end

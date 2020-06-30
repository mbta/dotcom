defmodule Algolia.ConfigTest do
  use ExUnit.Case, async: true

  describe "Algolia.Config.config/0" do
    test "builds a config object with all values populated" do
      assert :algolia
             |> Application.get_env(:config)
             |> Keyword.get(:app_id) == "ALGOLIA_APP_ID"

      assert %Algolia.Config{
               app_id: <<_::binary>>,
               search: <<_::binary>>,
               write: <<_::binary>>
             } = Algolia.Config.config()
    end
  end
end

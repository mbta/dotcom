defmodule SiteWeb.HomepageSearchTest do
  use SiteWeb.IntegrationCase
  import Wallaby.Query

  @search_input css("#search-homepage__input")

  setup tags do
    %{session: %Wallaby.Session{} = session} = Map.new(tags)
    {:ok, session: visit(session, "/")}
  end

  describe "reset button" do
    @tag :wallaby
    test "only shown when input has a value", %{session: session} do
      reset_id = "#search-homepage__reset"

      session
      |> assert_has(css(reset_id, visible: false))
      |> fill_in(@search_input, with: "a")
      |> assert_has(css(reset_id, visible: true))
      |> send_keys(@search_input, [:backspace])
      |> assert_has(css(reset_id, visible: false))
    end
  end

  describe "bad response" do
    @tag :wallaby
    @tag :capture_log
    test "displays an error message", %{session: session} do
      config = Application.get_env(:algolia, :config)
      bad_config = Keyword.delete(config, :admin)
      Application.put_env(:algolia, :config, bad_config)
      on_exit(fn -> Application.put_env(:algolia, :config, config) end)

      session
      |> visit("/")
      |> assert_has(css("#algolia-error", visible: false))
      |> fill_in(@search_input, with: "a")
      |> assert_has(css("#algolia-error", visible: true))
    end
  end
end

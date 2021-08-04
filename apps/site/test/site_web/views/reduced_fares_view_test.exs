defmodule SiteWeb.ReducedFaresViewTest do
  @moduledoc false
  use ExUnit.Case, async: true

  alias SiteWeb.ReducedFaresView

  @youth_pass_url "https://example.com/TEST-YOUTH-PASS-FORM-URL"

  describe "reduced_fares_url/1" do
    test "returns the URL for the current form" do
      original_env = Application.get_env(:site, SiteWeb.ReducedFaresView)

      on_exit(fn ->
        Application.put_env(
          :site,
          SiteWeb.ReducedFaresView,
          original_env
        )
      end)

      Application.put_env(
        :site,
        SiteWeb.ReducedFaresView,
        reduced_fares_urls: Poison.encode!(%{"youth-pass" => @youth_pass_url})
      )

      conn = %{Phoenix.ConnTest.build_conn() | path_info: ["reduced-fares", "youth-pass"]}

      assert ReducedFaresView.reduced_fares_url(conn) == @youth_pass_url
    end
  end

  describe "reduced_fares_urls/0" do
    test "returns a map of form IDs to URLs" do
      original_env = Application.get_env(:site, SiteWeb.ReducedFaresView)

      on_exit(fn ->
        Application.put_env(
          :site,
          SiteWeb.ReducedFaresView,
          original_env
        )
      end)

      reduced_fares_url_mapping = %{
        "youth-pass" => @youth_pass_url
      }

      Application.put_env(
        :site,
        SiteWeb.ReducedFaresView,
        reduced_fares_urls: Poison.encode!(reduced_fares_url_mapping)
      )

      assert ReducedFaresView.reduced_fares_urls() == reduced_fares_url_mapping
    end
  end
end

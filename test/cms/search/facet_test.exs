defmodule CMS.Search.FacetTest do
  use ExUnit.Case, async: true

  import CMS.Search.Facet

  describe "build/3" do
    test "facet marked as active if given value is part of input" do
      facet = build({"page", 16}, ["page"])
      assert facet.active?
    end

    test "facet not marked as active if given value is not in input" do
      facet = build({"page", 4}, ["person"])
      refute facet.active?
    end
  end

  describe "facet labels" do
    test "event" do
      facet = build({"event", 4}, ["person"])
      assert facet.label == "Event"
    end

    test "landing_page" do
      facet = build({"landing_page", 4}, ["person"])
      assert facet.label == "Main Page"
    end

    test "news_entry" do
      facet = build({"news_entry", 4}, ["person"])
      assert facet.label == "News"
    end

    test "page" do
      facet = build({"page", 4}, ["person"])
      assert facet.label == "Page"
    end

    test "person" do
      facet = build({"person", 4}, ["person"])
      assert facet.label == "Person"
    end

    test "search_result" do
      facet = build({"search_result", 4}, ["person"])
      assert facet.label == :ignore
    end
  end
end

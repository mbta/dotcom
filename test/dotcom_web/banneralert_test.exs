defmodule BannerAlertTest do
  @moduledoc false
  use ExUnit.Case, async: true

  alias Alerts.Alert
  alias Alerts.Banner

  @alert %Alert{header: "An alert header", effect: :delay, severity: 5}
  @banner %Banner{title: "A banner title", effect: :dock_issue, severity: 5}

  describe "BannerAlert.header" do
    test "for Alerts.Alert" do
      assert BannerAlert.header(@alert) == "An alert header"
    end

    test "for Alerts.Banner" do
      assert BannerAlert.header(@banner) == "A banner title"
    end
  end

  describe "BannerAlert.human_effect" do
    test "for Alerts.Alert" do
      assert BannerAlert.human_effect(@alert) == "Delay"
    end

    test "for Alerts.Banner" do
      assert BannerAlert.human_effect(@banner) == "Dock Issue"
    end
  end

  describe "BannerAlert.human_label" do
    test "for Alerts.Banner" do
      assert BannerAlert.human_label(@banner) == ""
    end
  end

  describe "BannerAlert.icon" do
    test "for Alerts.Alert" do
      assert BannerAlert.icon(@alert) == :none
    end

    test "for Alerts.Banner" do
      assert BannerAlert.icon(@banner) == :alert
    end
  end

  describe "BannerAlert.label_class" do
    test "for Alerts.Alert" do
      assert BannerAlert.label_class(@alert) == "u-small-caps c-alert-item__badge"
    end

    test "for Alerts.Banner" do
      assert BannerAlert.label_class(@banner) ==
               "c-alert-item__badge--system u-small-caps c-alert-item__badge"
    end
  end
end

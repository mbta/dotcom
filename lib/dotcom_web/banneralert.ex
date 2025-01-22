defprotocol BannerAlert do
  def header(obj)
  def human_effect(obj)
  def human_label(obj)
  def icon(obj)
  def label_class(obj)
end

defimpl BannerAlert, for: Alerts.Alert do
  def header(alert), do: alert.header
  defdelegate human_effect(alert), to: Alerts.Alert
  defdelegate human_label(alert), to: Alerts.Alert
  defdelegate icon(alert), to: Alerts.Alert
  def label_class(alert), do: DotcomWeb.AlertView.alert_label_class(alert)
end

defimpl BannerAlert, for: Alerts.Banner do
  def header(banner), do: banner.title

  def human_effect(banner) do
    banner
    |> alert_from_banner()
    |> Alerts.Alert.human_effect()
  end

  def human_label(banner) do
    banner
    |> alert_from_banner()
    |> Alerts.Alert.human_label()
  end

  def icon(banner) do
    banner
    |> alert_from_banner()
    |> Alerts.Alert.icon()
  end

  def label_class(banner) do
    banner
    |> alert_from_banner()
    |> DotcomWeb.AlertView.alert_label_class()
  end

  defp alert_from_banner(banner) do
    Alerts.Alert
    |> struct(Map.from_struct(banner))
    |> Map.put(:priority, :system)
  end
end

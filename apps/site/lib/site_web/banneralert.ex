defprotocol BannerAlert do
  def header(obj)
  def human_effect(obj)
  def human_label(obj)
  def icon(obj)
  def alert_for_label_class(obj)
end

defimpl BannerAlert, for: Alerts.Alert do
  def header(alert), do: alert.header
  defdelegate human_effect(alert), to: Alerts.Alert
  defdelegate human_label(alert), to: Alerts.Alert
  defdelegate icon(alert), to: Alerts.Alert
  def alert_for_label_class(alert), do: alert
end

defimpl BannerAlert, for: Alerts.Banner do
  def header(banner), do: banner.title

  def human_effect(banner) do
    alert_from_banner(banner)
    |> Alerts.Alert.human_effect()
  end

  def human_label(banner) do
    alert_from_banner(banner)
    |> Alerts.Alert.human_label()
  end

  def icon(banner) do
    alert_from_banner(banner)
    |> Alerts.Alert.icon()
  end

  def alert_for_label_class(banner) do
    alert_from_banner(banner)
  end

  defp alert_from_banner(banner) do
    Kernel.struct(Alerts.Alert, banner)
    |> Map.update!(:priority, :system)
  end
end

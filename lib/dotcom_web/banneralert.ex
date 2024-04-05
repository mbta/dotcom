defprotocol BannerAlert do
  def header(obj)
  def human_effect(obj)
  def icon(obj)
end

defimpl BannerAlert, for: Alerts.Alert do
  def header(alert), do: alert.header
  defdelegate human_effect(alert), to: Alerts.Alert
  defdelegate icon(alert), to: Alerts.Alert
end

defimpl BannerAlert, for: Alerts.Banner do
  def header(banner), do: banner.title

  def human_effect(banner) do
    alert_from_banner(banner)
    |> Alerts.Alert.human_effect()
  end

  def icon(banner) do
    alert_from_banner(banner)
    |> Alerts.Alert.icon()
  end

  defp alert_from_banner(banner) do
    Alerts.Alert
    |> struct(Map.from_struct(banner))
    |> Map.put(:priority, :system)
  end
end

defmodule DotcomWeb.Components.TAlerts do
  @moduledoc """
  Simple component for rendering the TAlerts ad
  """

  use DotcomWeb, :component

  def t_alerts(assigns) do
    ~H"""
    <div class="m-alerts-ad">
      <h3>Get T-Alerts</h3>
      <div class="m-alerts-ad__content">
        <div class="m-alerts-ad__buttons">
          <p>
            Tell us about your regular trips and receive text or email alerts that are relevant to you, at times when you want them.
          </p>
          <a
            href="https://alerts.mbta.com/account/new"
            class="m-alerts-ad__link m-alerts-ad__link--create"
          >
            Create an Account
          </a>
          <a
            href="https://alerts.mbta.com/login/new"
            class="m-alerts-ad__link m-alerts-ad__link--login"
          >
            Sign in
          </a>
        </div>
        <div class="m-alerts-ad__image">
          {DotcomWeb.Endpoint
          |> static_url("/images/t-alerts-phone.png")
          |> PhoenixHTMLHelpers.Tag.img_tag()}
        </div>
      </div>
    </div>
    """
  end
end

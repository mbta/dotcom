defmodule SiteWeb.CustomerSupportController do
  use SiteWeb, :controller
  require Logger

  @allowed_attachment_types ~w(image/bmp image/gif image/jpeg image/png image/tiff image/webp)

  plug(Turbolinks.Plug.NoCache)
  plug(:set_service_options)
  plug(:assign_ip)
  plug(:meta_description)

  def index(conn, %{"comments" => comments}) do
    render_form(conn, %{comments: comments})
  end

  def index(conn, _params) do
    render_form(conn, %{comments: nil})
  end

  def thanks(conn, _params) do
    render(
      conn,
      "index.html",
      breadcrumbs: [Breadcrumb.build("Customer Support")],
      show_form: false
    )
  end

  def submit(conn, %{"support" => data}) do
    case do_validation(data) do
      [] ->
        do_submit(conn, data)

      errors ->
        conn
        |> put_status(400)
        |> render_form(%{errors: errors, comments: Map.get(data, "comments")})
    end
  end

  @spec do_submit(Plug.Conn.t(), map) :: Plug.Conn.t()
  defp do_submit(%Plug.Conn{assigns: %{ip_address: {:ok, ip}}} = conn, data) do
    case Hammer.check_rate("submit-feedback:#{ip}", 60_000, 1) do
      {:allow, _count} ->
        {:ok, pid} = Task.start(__MODULE__, :send_ticket, [data])
        conn = Plug.Conn.put_private(conn, :ticket_task, pid)
        redirect(conn, to: customer_support_path(conn, :thanks))

      {:deny, _limit} ->
        _ = Logger.warn("ip=#{ip} Support form rate limit exceeded for IP address")

        conn
        |> put_status(:too_many_requests)
        |> render_form(%{errors: ["rate limit"]})
    end
  end

  defp render_form(conn, %{errors: errors, comments: comments}) do
    render(
      conn,
      "index.html",
      breadcrumbs: [Breadcrumb.build("Customer Support")],
      errors: errors,
      show_form: true,
      comments: comments
    )
  end

  defp render_form(conn, %{errors: errors}) do
    render(
      conn,
      "index.html",
      breadcrumbs: [Breadcrumb.build("Customer Support")],
      errors: errors,
      show_form: true
    )
  end

  defp render_form(conn, %{comments: comments}) do
    render(
      conn,
      "index.html",
      breadcrumbs: [Breadcrumb.build("Customer Support")],
      errors: [],
      show_form: true,
      comments: comments
    )
  end

  @spec do_validation(map) :: [String.t()]
  defp do_validation(params) do
    validators =
      if params["request_response"] == "on" do
        [
          &validate_comments/1,
          &validate_service/1,
          &validate_photos/1,
          &validate_name/1,
          &validate_email/1,
          &validate_privacy/1
        ]
      else
        [&validate_comments/1, &validate_service/1, &validate_photos/1]
      end

    Site.Validation.validate(validators, params)
  end

  @spec validate_comments(map) :: :ok | String.t()
  defp validate_comments(%{"comments" => ""}), do: "comments"
  defp validate_comments(_), do: :ok

  @spec validate_service(map) :: :ok | String.t()
  defp validate_service(%{"service" => service}) do
    if Feedback.Message.valid_service?(service) do
      :ok
    else
      "service"
    end
  end

  defp validate_service(_), do: "service"

  @spec validate_name(map) :: :ok | String.t()
  defp validate_name(%{"name" => ""}), do: "name"
  defp validate_name(_), do: :ok

  @spec validate_email(map) :: :ok | String.t()
  defp validate_email(%{"email" => email}) do
    case Regex.run(~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, email) do
      nil -> "email"
      [_] -> :ok
    end
  end

  defp validate_email(_), do: "email"

  @spec validate_privacy(map) :: :ok | String.t()
  defp validate_privacy(%{"privacy" => "on"}), do: :ok
  defp validate_privacy(_), do: "privacy"

  @spec validate_photos(map) :: :ok | String.t()
  defp validate_photos(%{"photos" => photos}) when is_list(photos) do
    if Enum.all?(photos, &valid_upload?/1), do: :ok, else: "photos"
  end

  defp validate_photos(_), do: :ok

  defp valid_upload?(%Plug.Upload{filename: filename}) do
    MIME.from_path(filename) in @allowed_attachment_types
  end

  def send_ticket(params) do
    Feedback.Repo.send_ticket(%Feedback.Message{
      photos: params["photos"],
      email: params["email"],
      phone: params["phone"],
      name: params["name"],
      comments: params["comments"],
      service: params["service"],
      request_response: params["request_response"] == "on"
    })
  end

  defp set_service_options(conn, _) do
    assign(conn, :service_options, Feedback.Message.service_options())
  end

  defp assign_ip(conn, _) do
    assign(conn, :ip_address, get_ip(conn))
  end

  defp get_ip(conn) do
    conn
    |> Plug.Conn.get_req_header("x-forwarded-for")
    |> do_get_ip(conn)
  end

  defp do_get_ip([<<ip::binary>>], %Plug.Conn{}) do
    {:ok, ip}
  end

  defp do_get_ip([], %Plug.Conn{remote_ip: {a, b, c, d}}) do
    {:ok, Enum.join([to_string(a), to_string(b), to_string(c), to_string(d)], ".")}
  end

  defp do_get_ip(_, %Plug.Conn{}) do
    :error
  end

  defp meta_description(conn, _) do
    conn
    |> assign(
      :meta_description,
      "Contact the MBTA customer support team and view additional contact numbers for the Transit Police, " <>
        "lost and found, and accessibility."
    )
  end
end

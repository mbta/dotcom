defmodule SiteWeb.FareTransformationView do
  @moduledoc """
  View for the Fare Transformation section of the website.
  """
  use SiteWeb, :view

  @psl_types ["All Location Types", "Charlie Retailer", "Fare Vending Machine"]

  @spec psl_types_buttons(Plug.Conn.t(), atom) :: [Phoenix.HTML.Safe.t()]
  def psl_types_buttons(conn, selected) do
    for type <- @psl_types do
      link(
        type,
        to: build_psl_button_path(conn, type),
        class: [
          "psl-type-buttons",
          if selected === type or (type === "All Location Types" and selected === nil) do
            [" selected"]
          else
            []
          end
        ],
        role: "button",
        "aria-pressed":
          if(selected === type or (type === "All Location Types" and selected === nil),
            do: "true",
            else: "false"
          )
      )
    end
  end

  defp build_psl_button_path(%{params: %{"psl_type" => _type}} = conn, "All Location Types") do
    fare_transformation_path(conn, :index, conn.params["id"], Map.delete(conn.params, "psl_type"))
  end

  defp build_psl_button_path(conn, "All Location Types") do
    fare_transformation_path(conn, :index, conn.params["id"], conn.params)
  end

  defp build_psl_button_path(conn, type) do
    fare_transformation_path(
      conn,
      :index,
      conn.params["id"],
      Map.put(conn.params, "psl_type", type)
    )
  end
end

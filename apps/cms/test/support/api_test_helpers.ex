defmodule CMS.APITestHelpers do
  @moduledoc """
  Maps values to CMS json responses for testing purposes.
  """
  def update_api_response(api_response, field, value) do
    %{^field => [old_value]} = api_response

    case old_value do
      %{"processed" => _processed_html} ->
        %{api_response | field => [%{old_value | "processed" => value}]}

      _ ->
        %{api_response | field => [%{old_value | "value" => value}]}
    end
  end

  def update_api_response_whole_field(api_response, field, value) do
    %{api_response | field => value}
  end
end

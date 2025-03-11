defmodule TableauCloudToken do
  @moduledoc """
  Configuration for using JSON Web Tokens with our Tableau Cloud server.

  https://help.tableau.com/current/online/en-us/connected_apps_direct.htm#step-3-configure-the-jwt
  """
  use Joken.Config, default_signer: :tableau_signer

  @impl Joken.Config
  def token_config do
    default_claims(
      aud: "tableau",
      iss: System.get_env("TABLEAU_CLIENT_ID"),
      default_exp: 300
    )
    |> add_claim("kid", fn -> System.get_env("TABLEAU_SECRET_ID") end)
    |> add_claim("sub", fn -> System.get_env("TABLEAU_USER") end)
    |> add_claim("scp", fn -> ["tableau:views:embed", "tableau:metrics:embed"] end)
  end

  @behaviour __MODULE__
  @callback default_token() :: Joken.bearer_token() | {:error, Joken.error_reason()}
  @doc """
  Returns a valid token for using with embedding Tableau Cloud visualizations
  """
  @impl __MODULE__
  def default_token do
    with {:ok, token, _} <- generate_and_sign(),
         {:ok, _claims} <- verify_and_validate(token) do
      token
    end
  end
end

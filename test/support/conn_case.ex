defmodule DotcomWeb.ConnCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require setting up a connection.

  Such tests rely on `Phoenix.ConnTest` and also
  imports other functionality to make it easier
  to build and query models.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  def default_conn do
    %Plug.Conn{
      Phoenix.ConnTest.build_conn()
      | host: "localhost"
    }
  end

  using do
    quote do
      # Import conveniences for testing with connections
      import Plug.Conn
      import Phoenix.ConnTest

      import DotcomWeb.Router.Helpers,
        except: [
          news_entry_path: 2,
          news_entry_path: 3,
          news_entry_path: 4,
          event_path: 2,
          event_path: 3,
          event_path: 4,
          project_path: 2,
          project_path: 3,
          project_update_path: 3,
          project_update_path: 4,
          static_path: 2
        ]

      import DotcomWeb.CmsRouterHelpers
      import CMS.Factory

      # The default endpoint for testing
      @endpoint DotcomWeb.Endpoint

      use DotcomWeb, :verified_routes

      import DotcomWeb.ConnCase, only: [default_conn: 0]
    end
  end

  setup _tags do
    {:ok, conn: default_conn()}
  end
end

defmodule Dotcom.ViewCase do
  @moduledoc false
  use ExUnit.CaseTemplate

  using do
    quote do
      import CMS.Factory
      import DotcomWeb.Router.Helpers
      import Phoenix.ConnTest
      import Phoenix.View
      import Plug.Conn
    end
  end

  setup do
    {:ok, conn: Phoenix.ConnTest.build_conn()}
  end
end

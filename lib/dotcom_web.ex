defmodule DotcomWeb do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use DotcomWeb, :controller
      use DotcomWeb, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def static_paths, do: ~w(css js fonts icon-svg images favicon robots.txt)

  def controller do
    quote do
      use Gettext, backend: DotcomWeb.Gettext
      use Phoenix.Controller, namespace: DotcomWeb

      import DotcomWeb.{CmsRouterHelpers, ControllerHelpers}

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
          project_update_path: 4
        ]

      import Phoenix.LiveView.Controller
      import Util.AsyncAssign

      alias Util.Breadcrumb
    end
  end

  def view do
    quote do
      use Dotcom.Components.Precompiler

      use Phoenix.View,
        root: "lib/dotcom_web/templates",
        namespace: DotcomWeb

      import DotcomWeb.{Components, CmsRouterHelpers, ViewHelpers}
      import DotcomWeb.PartialView.SvgIconWithCircle, only: [svg_icon_with_circle: 1]

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
          static_url: 2
        ]

      import DotcomWeb.Views.Helpers.AlertHelpers
      import Phoenix.Controller, only: [view_module: 1]
      import UrlHelpers

      # Include shared imports and aliases for views
      unquote(view_helpers())

      @dialyzer :no_match
    end
  end

  def live_view do
    quote do
      use Phoenix.LiveView

      unquote(view_helpers())
    end
  end

  def live_component do
    quote do
      use Phoenix.LiveComponent

      unquote(view_helpers())
    end
  end

  def component do
    quote do
      use Phoenix.Component

      unquote(view_helpers())
    end
  end

  def router do
    quote do
      use Phoenix.Router
      import Plug.Conn
      import Phoenix.Controller
      import Phoenix.LiveView.Router
    end
  end

  def channel do
    quote do
      use Gettext, backend: DotcomWeb.Gettext
      use Phoenix.Channel
    end
  end

  defp view_helpers do
    quote do
      use Gettext, backend: DotcomWeb.Gettext
      use MbtaMetro

      import DotcomWeb.{Components, Components.RouteSymbols, ErrorHelpers}
      import Phoenix.{HTML, LiveView.Helpers}
      import PhoenixHTMLHelpers.Form, except: [label: 1]
      import PhoenixHTMLHelpers.{Format, Link, Tag}

      alias DotcomWeb.Router.Helpers
      alias Phoenix.LiveView.JS

      # Routes generation with the ~p sigil
      unquote(verified_routes())
    end
  end

  def verified_routes do
    quote do
      use Phoenix.VerifiedRoutes,
        endpoint: DotcomWeb.Endpoint,
        router: DotcomWeb.Router,
        statics: DotcomWeb.static_paths()
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end

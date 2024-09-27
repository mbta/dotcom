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

  def static_paths, do: ~w(assets fonts images favicon robots.txt)

  def model do
    quote do
      # Define common model functionality
    end
  end

  def controller do
    quote do
      use Phoenix.Controller, namespace: DotcomWeb
      import Phoenix.LiveView.Controller

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

      import DotcomWeb.CmsRouterHelpers
      import DotcomWeb.ControllerHelpers
      import DotcomWeb.Gettext
      import Util.AsyncAssign
      alias Util.Breadcrumb
    end
  end

  def view do
    quote do
      use Phoenix.View,
        root: "lib/dotcom_web/templates",
        namespace: DotcomWeb

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [view_module: 1]

      use Dotcom.Components.Precompiler

      import DotcomWeb.Components

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

      import DotcomWeb.CmsRouterHelpers
      import DotcomWeb.ViewHelpers
      import DotcomWeb.Views.Helpers.StopHelpers
      import DotcomWeb.Views.Helpers.AlertHelpers
      import DotcomWeb.PartialView.SvgIconWithCircle, only: [svg_icon_with_circle: 1]
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
      use Phoenix.Channel
      import DotcomWeb.Gettext
    end
  end

  defp view_helpers do
    quote do
      # Use all HTML functionality (forms, tags, etc)
      import Phoenix.HTML
      import PhoenixHTMLHelpers.Form, except: [label: 1]
      import PhoenixHTMLHelpers.Link
      import PhoenixHTMLHelpers.Tag
      import PhoenixHTMLHelpers.Format

      # Import LiveView and .heex helpers (live_render, live_patch, <.form>, etc)
      import Phoenix.LiveView.Helpers
      alias Phoenix.LiveView.JS

      # Import basic rendering functionality (render, render_layout, etc)
      import Phoenix.View

      import DotcomWeb.ErrorHelpers
      import DotcomWeb.Gettext
      alias DotcomWeb.Router.Helpers

      import DotcomWeb.Components

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

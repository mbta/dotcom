defmodule SiteWeb do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use SiteWeb, :controller
      use SiteWeb, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def model do
    quote do
      # Define common model functionality
    end
  end

  def controller do
    quote do
      use Phoenix.Controller, namespace: SiteWeb

      import SiteWeb.Router.Helpers,
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

      import SiteWeb.CmsRouterHelpers
      import SiteWeb.ControllerHelpers
      import SiteWeb.Gettext
      import Util.AsyncAssign
      alias Util.Breadcrumb
    end
  end

  def view do
    quote do
      use Phoenix.View,
        root: "lib/site_web/templates",
        namespace: SiteWeb

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_flash: 2, view_module: 1]

      # Include shared imports and aliases for views
      unquote(view_helpers())
    end
  end

  def live_view do
    quote do
      use Phoenix.LiveView,
        layout: {SiteWeb.LayoutView, :live}

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
      import Phoenix.LiveDashboard.Router
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import SiteWeb.Gettext
    end
  end

  defp view_helpers do
    quote do
      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML
      use Site.Components.Precompiler

      import Phoenix.Component
      import Phoenix.LiveComponent

      import Phoenix.LiveView.Helpers
      # Import basic rendering functionality (render, render_layout, etc)
      import Phoenix.View

      import SiteWeb.ErrorHelpers
      import SiteWeb.Gettext

      # uncomment once we start writing components
      # import SiteWeb.Components

      import SiteWeb.Router.Helpers,
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

      import SiteWeb.CmsRouterHelpers
      import SiteWeb.ErrorHelpers
      import SiteWeb.Gettext
      import SiteWeb.ViewHelpers
      import SiteWeb.Views.Helpers.StopHelpers
      import SiteWeb.Views.Helpers.AlertHelpers
      import SiteWeb.PartialView.SvgIconWithCircle, only: [svg_icon_with_circle: 1]
      import UrlHelpers
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end

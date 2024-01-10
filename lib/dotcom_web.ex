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

      import Phoenix.LiveView.Helpers
      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML
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
          project_update_path: 4
        ]

      import DotcomWeb.CmsRouterHelpers
      import DotcomWeb.ErrorHelpers
      import DotcomWeb.Gettext
      import DotcomWeb.ViewHelpers
      import DotcomWeb.Views.Helpers.StopHelpers
      import DotcomWeb.Views.Helpers.AlertHelpers
      import DotcomWeb.PartialView.SvgIconWithCircle, only: [svg_icon_with_circle: 1]
      import UrlHelpers

      @dialyzer :no_match
    end
  end

  def router do
    quote do
      use Phoenix.Router
      import Phoenix.LiveView.Router
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      import DotcomWeb.Gettext
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end

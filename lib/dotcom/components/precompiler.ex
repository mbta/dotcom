defmodule Dotcom.Components.Precompiler do
  @moduledoc """
  Compiles all components and makes them available to be called from a view.
  Attach this functionality to a view with Kernel.use/1 (applied to all views by default in DotcomWeb.view)
  """

  import Dotcom.Components.Helpers

  require EEx

  defmacro __using__(_) do
    quote do
      import unquote(__MODULE__)

      require EEx

      precompile_components()
    end
  end

  @doc """
    Finds all folders within libdotcom/components, identifies those as "sections",
    and compiles a module for each folder in every section.
  """
  # not sure if this spec is correct -- does it return a def?
  defmacro precompile_components do
    sections = File.ls!(components_folder_path())

    for section <- Enum.map(sections, &String.to_atom/1) do
      if File.dir?(components_section_path(section)) do
        get_components(section)
      end
    end
  end

  @doc """
    Compiles a module for each folder within a component section
  """
  def get_components(section) do
    components = File.ls!(components_section_path(section))

    for component <- Enum.map(components, &String.to_atom/1) do
      if File.dir?(component_folder_path(component, section)) do
        precompile_component(component, section)
      end
    end
  end

  @doc """
  Defines function to render a particular component.  For example:

      precompile_component(:mode_button_list, :buttons)

  defines the function `mode_button_list/1`, taking the variables to assign and
  returning a `Phoenix.HTML.Safe.t`.
  """
  def precompile_component(component, section) when is_atom(component) and is_atom(section) do
    path =
      Path.join(
        component_folder_path(component, section),
        "/component.html.eex"
      )

    module = component_module(component, section)

    quote do
      import Dotcom.Components.Helpers
      import DotcomWeb.ViewHelpers
      import unquote(module)

      alias unquote(module)

      @spec unquote(component)(unquote(module).t) :: Phoenix.HTML.Safe.t()
      EEx.function_from_file(
        :def,
        unquote(component),
        unquote(path),
        [:args],
        engine: Phoenix.HTML.Engine
      )
    end
  end
end

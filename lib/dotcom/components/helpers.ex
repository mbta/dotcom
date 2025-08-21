defmodule Dotcom.Components.Helpers do
  @doc """
    Takes a string, capitalizes each word between underscores, and removes the underscores
  """
  def alias_name(atom) do
    atom
    |> Kernel.to_string()
    |> String.split("_")
    |> Enum.map_join(&String.capitalize(&1))
  end

  @doc """
    A helper function to ensure that the correct path is returned no
    matter where this module is called from (i.e. using mix test or iex)
  """
  def components_folder_path do
    File.cwd!()
    |> String.split("/lib/dotcom")
    |> List.first()
    |> Path.join("/lib/dotcom/components/")
  end

  def components_section_path(section) when is_atom(section) do
    components_folder_path()
    |> Path.join("#{section}")
  end

  def component_folder_path(component, section) when is_atom(component) and is_atom(section) do
    section
    |> components_section_path()
    |> Path.join("/")
    |> Path.join("#{component}")
  end

  @doc """
    Returns the component's module (i.e. Dotcom.Components.Buttons.ModeButtonList)
  """
  def component_module(component, section) when is_atom(component) and is_atom(section) do
    Dotcom.Components
    |> Module.concat(alias_name(section))
    |> Module.concat(alias_name(component))
  end
end

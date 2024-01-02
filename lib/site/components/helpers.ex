defmodule Site.Components.Helpers do
  @doc """
    Takes a string, capitalizes each word between underscores, and removes the underscores
  """
  @spec alias_name(atom) :: String.t()
  def alias_name(atom) do
    atom
    |> Kernel.to_string()
    |> String.split("_")
    |> Enum.map(&String.capitalize(&1))
    |> Enum.join("")
  end

  @doc """
    A helper function to ensure that the correct path is returned no
    matter where this module is called from (i.e. using mix test or iex)
  """
  @spec components_folder_path :: String.t()
  def components_folder_path do
    File.cwd!()
    |> String.split("/lib/site")
    |> List.first()
    |> Path.join("/lib/site/components/")
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
    Returns the component's module (i.e. Site.Components.Buttons.ModeButtonList)
  """
  @spec component_module(atom, atom) :: module
  def component_module(component, section) when is_atom(component) and is_atom(section) do
    Site.Components
    |> Module.concat(alias_name(section))
    |> Module.concat(alias_name(component))
  end
end

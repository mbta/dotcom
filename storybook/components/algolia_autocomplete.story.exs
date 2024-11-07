defmodule DotcomWeb.Storybook.AlgoliaAutocomplete do
  use PhoenixStorybook.Story, :component

  def function do
    &DotcomWeb.Components.algolia_autocomplete/1
  end

  def variations do
    for config_type <- [
          "basic-config",
          "transit-near-me",
          "retail-locations",
          "proposed-locations",
          "trip-planner"
        ] do
      %Variation{
        id: :"#{config_type}",
        description: Recase.to_sentence(config_type),
        attributes: %{
          id: "simple",
          config_type: config_type,
          placeholder: "Custom placeholder for #{config_type} config"
        }
      }
    end
  end
end

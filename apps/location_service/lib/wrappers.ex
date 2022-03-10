defmodule LocationService.Wrappers do
  @spec google_autocomplete(String.t(), number) :: LocationService.Suggestion.result()
  def google_autocomplete(search, limit) do
    case GoogleMaps.Place.autocomplete(%GoogleMaps.Place.AutocompleteQuery{
           hit_limit: limit,
           input: search,
           session_token: ""
         }) do
      {:ok, results} ->
        {:ok,
         results
         |> Enum.map(fn p ->
           %LocationService.Suggestion{address: p.description}
         end)}

      e ->
        e
    end
  end
end

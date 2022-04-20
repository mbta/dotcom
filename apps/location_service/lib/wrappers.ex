defmodule LocationService.Wrappers do
  @spec google_autocomplete(String.t(), number, String.t()) :: LocationService.Suggestion.result()
  def google_autocomplete(search, limit, token) do
    case GoogleMaps.Place.autocomplete(%GoogleMaps.Place.AutocompleteQuery{
           hit_limit: limit,
           input: search,
           session_token: token
         }) do
      {:ok, results} ->
        {:ok,
         results
         |> Enum.map(fn p ->
           %LocationService.Suggestion{
             address: p.description,
             highlighted_spans:
               p.matched_substrings
               |> Enum.map(
                 &%LocationService.Utils.HighlightedSpan{
                   offset: &1["offset"],
                   length: &1["length"]
                 }
               )
           }
         end)}

      e ->
        e
    end
  end
end

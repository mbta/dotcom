defmodule Dotcom.TripPlan.Location do
  alias Phoenix.HTML
  alias Dotcom.TripPlan.Query
  alias TripPlan.NamedPosition

  @spec validate(Query.t(), map) :: Query.t()
  def validate(
        %Query{} = query,
        %{
          "to_latitude" => <<_::binary>>,
          "to_longitude" => <<_::binary>>,
          "to" => _
        } = params
      ) do
    validate_lat_lng(:to, params, query)
  end

  def validate(
        %Query{} = query,
        %{
          "from_latitude" => <<_::binary>>,
          "from_longitude" => <<_::binary>>,
          "from" => _
        } = params
      ) do
    validate_lat_lng(:from, params, query)
  end

  def validate(%Query{} = query, %{"to" => same, "from" => same} = params) do
    query =
      query
      |> Map.put(:to, {:error, :same_address})
      |> Map.put(:from, {:error, :same_address})
      |> Map.put(:errors, MapSet.put(query.errors, :same_address))

    params =
      params
      |> Map.delete("to")
      |> Map.delete("from")

    validate(query, params)
  end

  def validate(%Query{} = query, %{"to" => _} = params) do
    validate_by_name(:to, query, params)
  end

  def validate(%Query{} = query, %{"from" => _} = params) do
    validate_by_name(:from, query, params)
  end

  def validate(
        %Query{
          to: %NamedPosition{latitude: lat, longitude: lng},
          from: %NamedPosition{latitude: lat, longitude: lng}
        } = query,
        %{}
      ) do
    %{query | errors: MapSet.put(query.errors, :same_address)}
  end

  def validate(%Query{} = query, %{}) do
    query
  end

  @spec validate_lat_lng(:to | :from, map, Query.t()) :: Query.t()
  defp validate_lat_lng(field_atom, params, %Query{} = query) do
    field = Atom.to_string(field_atom)
    {lat_bin, params} = Map.pop(params, field <> "_latitude")
    {lng_bin, params} = Map.pop(params, field <> "_longitude")
    {stop_id, params} = Map.pop(params, field <> "_stop_id")

    with {lat, ""} <- Float.parse(lat_bin),
         {lng, ""} <- Float.parse(lng_bin) do
      {name, params} = Map.pop(params, field)

      position = %NamedPosition{
        latitude: lat,
        longitude: lng,
        name: encode_name(name),
        stop_id: nil_if_empty(stop_id)
      }

      query
      |> Map.put(field_atom, position)
      |> validate(params)
    else
      :error ->
        validate(query, params)
    end
  end

  defp nil_if_empty(""), do: nil
  defp nil_if_empty(value), do: value

  @spec encode_name(String.t()) :: String.t()
  defp encode_name(name) do
    name
    |> HTML.html_escape()
    |> HTML.safe_to_string()
    |> String.replace("&#39;", "'")
    |> String.replace("&amp;", "&")
  end

  @spec validate_by_name(:to | :from, Query.t(), map) :: Query.t()
  defp validate_by_name(field, %Query{} = query, params) do
    {val, params} = Map.pop(params, Atom.to_string(field))

    case val do
      nil ->
        do_validate_by_name({:error, :required}, field, query, params)

      "" ->
        do_validate_by_name({:error, :required}, field, query, params)

      <<location::binary>> ->
        # lat/lng was missing or invalid; attempt geolocation based on name
        location
        |> TripPlan.geocode()
        |> do_validate_by_name(field, query, params)
    end
  end

  @spec do_validate_by_name(TripPlan.Geocode.t(), :to | :from, Query.t(), map) :: Query.t()
  defp do_validate_by_name({:ok, %NamedPosition{} = pos}, field, query, params) do
    query
    |> Map.put(field, pos)
    |> validate(params)
  end

  defp do_validate_by_name({:error, error}, field, query, params) do
    error_atom =
      case error do
        {:multiple_results, _} -> :multiple_results
        atom when is_atom(atom) -> atom
      end

    query
    |> Map.put(:errors, MapSet.put(query.errors, error_atom))
    |> Map.put(field, {:error, error})
    |> validate(params)
  end
end

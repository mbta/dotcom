defmodule Algolia.MissingAppIdError do
  defexception message: "ALGOLIA_APP_ID environment variable not defined"
end

defmodule Algolia.MissingAdminKeyError do
  defexception message: "ALGOLIA_ADMIN_KEY environment variable not defined"
end

defmodule Algolia.MissingSearchKeyError do
  defexception message: "ALGOLIA_SEARCH_KEY environment variable not defined"
end

defmodule Algolia.MissingPlacesAppIdError do
  defexception message: "ALGOLIA_PLACES_APP_ID environment variable not defined"
end

defmodule Algolia.MissingPlacesSearchKeyError do
  defexception message: "ALGOLIA_PLACES_SEARCH_KEY environment variable not defined"
end

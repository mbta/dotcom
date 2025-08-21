defmodule Dotcom.Pagination do
  def current_page(nil, default_page) do
    default_page
  end

  def current_page(page, default_page) do
    maybe_convert_to_integer(page, default_page)
  end

  defp maybe_convert_to_integer(page, _default) when is_integer(page), do: page

  defp maybe_convert_to_integer(page, default) when is_binary(page) do
    case Integer.parse(page) do
      :error -> default
      {int, _base} -> int
    end
  end
end

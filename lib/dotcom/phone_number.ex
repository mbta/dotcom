defmodule Dotcom.PhoneNumber do
  @moduledoc "Functions for working with phone numbers"

  @doc """
  Takes a string holding a possibly formatted phone number with optional leading 1.
  Returns a pretty human-readable format.
  Returns the original input if parsing/formatting fails.
  Returns "" if given nil.
  """
  @spec pretty_format(String.t() | nil) :: String.t()
  def pretty_format(nil) do
    ""
  end

  def pretty_format(number) do
    case parse_phone_number(number) do
      {area_code, prefix, line} ->
        "#{area_code}-#{prefix}-#{line}"

      nil ->
        number
    end
  end

  @doc """
  Takes a string holding a possibly formatted phone number with optional leading 1.
  Returns a number in the format +1-617-222-3200, suitable for use with <a href="tel:">
  Returns the string if parsing/formatting fails.
  """
  @spec machine_format(String.t() | nil) :: String.t() | nil
  def machine_format(nil) do
    nil
  end

  def machine_format(number) do
    case parse_phone_number(number) do
      {area_code, prefix, line} ->
        "+1-#{area_code}-#{prefix}-#{line}"

      nil ->
        number
    end
  end

  @doc """
  Format read by screenreaders in a nicer manner
  Inspired by https://jhalabi.com/blog/accessibility-phone-number-formatting
  """
  def aria_format(nil), do: nil

  def aria_format(number) do
    case parse_phone_number(number) do
      {area_code, prefix, line} ->
        [area_code, prefix, line]
        |> Enum.map(fn num ->
          String.split(num, "", trim: true)
          |> Enum.join(" ")
        end)
        |> Enum.join(". ")

      nil ->
        nil
    end
  end

  @spec parse_phone_number(String.t()) :: {String.t(), String.t(), String.t()} | nil
  def parse_phone_number(number) do
    case number |> digits |> without_leading_one do
      <<area_code::bytes-size(3), prefix::bytes-size(3), line::bytes-size(4)>> ->
        {area_code, prefix, line}

      _ ->
        nil
    end
  end

  @spec digits(String.t()) :: String.t()
  defp digits(str) when is_binary(str) do
    String.replace(str, ~r/[^0-9]/, "")
  end

  @spec without_leading_one(String.t()) :: String.t()
  defp without_leading_one("1" <> rest), do: rest
  defp without_leading_one(phone), do: phone
end

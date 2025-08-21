defmodule Dotcom.PhoneNumber do
  @moduledoc "Functions for working with phone numbers"

  @doc """
  Takes a string holding a possibly formatted phone number with optional leading 1.
  Returns a pretty human-readable format.
  Returns the original input if parsing/formatting fails.
  Returns "" if given nil.
  """
  def pretty_format(nil) do
    ""
  end

  def pretty_format(number) do
    case parse_phone_number(number) do
      {nil, nil, line} ->
        line

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
  def machine_format(nil) do
    nil
  end

  def machine_format(number) do
    case parse_phone_number(number) do
      {nil, nil, line} ->
        line

      {area_code, prefix, line} ->
        "+1-#{area_code}-#{prefix}-#{line}"

      nil ->
        nil
    end
  end

  @doc """
  Format read by screenreaders in a nicer manner
  Inspired by https://jhalabi.com/blog/accessibility-phone-number-formatting
  """
  def aria_format(nil), do: nil

  def aria_format(number) do
    case parse_phone_number(number) do
      {nil, nil, line} ->
        line |> String.split("", trim: true) |> Enum.join(" ")

      {area_code, prefix, line} ->
        [area_code, prefix, line]
        |> Enum.map_join(". ", fn num ->
          String.split(num, "", trim: true)
          |> Enum.join(" ")
        end)

      nil ->
        nil
    end
  end

  @doc """
  Parses out the phone number of the string
  Supports 10 (optional leading 1) and 3 digit phone numbers.
  Does not support 3 digit phone numbers if the leading number is 1 (I don't think these exist)
  """
  def parse_phone_number(number) do
    case number |> digits |> without_leading_one do
      <<area_code::bytes-size(3), prefix::bytes-size(3), line::bytes-size(4)>> ->
        {area_code, prefix, line}

      <<line::bytes-size(3)>> ->
        {nil, nil, line}

      _ ->
        nil
    end
  end

  defp digits(str) when is_binary(str) do
    String.replace(str, ~r/[^0-9]/, "")
  end

  defp without_leading_one("1" <> rest), do: rest
  defp without_leading_one(phone), do: phone
end

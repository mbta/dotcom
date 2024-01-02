defmodule Picture do
  def srcset(enum) do
    enum
    |> Enum.map(&to_srcset_line/1)
    |> Enum.join(", ")
  end

  defp to_srcset_line({width, url}) do
    "#{url} #{width}w"
  end
end

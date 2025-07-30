defmodule Dotcom.Usage.Functions do
  @moduledoc """
  A decorator that allows us to track function usage.
  """

  use Decorator.Define, track: 0

  @path "/tmp/.functions"

  # Clean the slate by removing the list of functions.
  # This will be run before any modules that include this module get compiled.
  # This ensures we have a clean list every time the app is compiled.
  File.rm(@path)
  File.touch!(@path)
  File.chmod!(@path, 0o777)

  @doc """
  Allow other modules to reference the file used without needing to know it.
  """
  def path, do: @path

  @doc """
  This decorator allows us to track function usage.
  Outside of the `quote`, we register the function by writing it to a file.
  Inside of the `quote`, we tell the agent to remove the registered function.
  """
  def track(body, context) do
    write_context!(context)

    quote do
      DotcomWeb.Usage.Functions.remove_context([
        Atom.to_string(unquote(context.module)),
        Atom.to_string(unquote(context.name)),
        Integer.to_string(unquote(context.arity))
      ])

      unquote(body)
    end
  end

  # Write the context {m, f, a} to the file.
  # The agent will load the file when it is started and use that to build a list of functions to track.
  defp write_context!(context) do
    module = Atom.to_string(context.module)
    name = Atom.to_string(context.name)
    arity = Integer.to_string(context.arity)

    line = "#{module},#{name},#{arity}\n"

    File.write!(path(), line, [:append])
  end
end

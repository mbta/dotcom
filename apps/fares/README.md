# Fares

Fares are encoded in `fares-july1.csv`, whose values vary in meaning by the mode indicated in the first column - see the `mapper` parsing function in `Fares.FareInfo` for more details.

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed as:

  1. Add `fares` to your list of dependencies in `mix.exs`:

    ```elixir
    def deps do
      [{:fares, "~> 0.1.0"}]
    end
    ```

  2. Ensure `fares` is started before your application:

    ```elixir
    def application do
      [applications: [:fares]]
    end
    ```


defmodule DotcomWeb.Hooks.SyncUrlParamTest do
  use ExUnit.Case, async: true

  alias DotcomWeb.Hooks.SyncUrlParam
  alias Phoenix.LiveView.Socket

  @config %{
    param: "variant",
    assign: :selected_variant,
    event: "set_variant",
    event_key: "option"
  }

  defp mounted_socket(config \\ @config) do
    {:cont, socket} =
      SyncUrlParam.on_mount(config, %{}, %{}, %Socket{
        assigns: %{__changed__: %{}},
        router: DotcomWeb.Router,
        private: %{lifecycle: %Phoenix.LiveView.Lifecycle{}}
      })

    socket
  end

  defp run_params_hook(socket, params, uri) do
    [%{function: fun}] = socket.private.lifecycle.handle_params
    {:cont, socket} = fun.(params, uri, socket)
    socket
  end

  describe "on_mount/4" do
    test "starts with a nil assign" do
      assert mounted_socket().assigns.selected_variant == nil
    end

    test "assigns the param value on handle_params" do
      socket = run_params_hook(mounted_socket(), %{"variant" => "abc"}, "http://x/p?variant=abc")

      assert socket.assigns.selected_variant == "abc"
    end

    test "assigns nil when the param is absent" do
      socket = run_params_hook(mounted_socket(), %{}, "http://x/p")

      assert socket.assigns.selected_variant == nil
    end

    test "removes a param when its value is invalid" do
      config = Map.put(@config, :validate, fn value, _socket -> value == "valid" end)
      socket = mounted_socket(config)
      [%{function: handle_params}] = socket.private.lifecycle.handle_params

      assert {:halt,
              %Socket{
                assigns: %{selected_variant: nil},
                redirected: {:live, :patch, %{to: "/p?a=1"}}
              }} =
               handle_params.(
                 %{"variant" => "invalid"},
                 "http://x/p?a=1&variant=invalid",
                 socket
               )
    end
  end
end

defmodule Content.CMS.HTTPClientTest do
  use ExUnit.Case
  import Mock
  import Content.CMS.HTTPClient
  alias Content.ExternalRequest

  describe "preview/2" do
    test "uses alternate path with timeout options" do
      with_mock ExternalRequest, process: fn _method, _path, _body, _params -> {:ok, []} end do
        preview(6, 0)

        assert called(
                 ExternalRequest.process(
                   :get,
                   "/cms/revisions/6",
                   "",
                   params: [_format: "json", vid: 0],
                   timeout: 10_000,
                   recv_timeout: 10_000
                 )
               )
      end
    end
  end

  describe "view/2" do
    test "makes a get request with format: json params" do
      with_mock ExternalRequest, process: fn _method, _path, _body, _params -> {:ok, []} end do
        view("/path", [])
        assert called(ExternalRequest.process(:get, "/path", "", params: [{"_format", "json"}]))
      end
    end

    test "accepts additional params" do
      with_mock ExternalRequest, process: fn _method, _path, _body, _params -> {:ok, []} end do
        view("/path", foo: "bar")

        assert called(
                 ExternalRequest.process(
                   :get,
                   "/path",
                   "",
                   params: [{"_format", "json"}, {"foo", "bar"}]
                 )
               )
      end
    end

    test "accepts integers as param values" do
      with_mock ExternalRequest, process: fn _method, _path, _body, _params -> {:ok, []} end do
        view("/path", foo: 1)

        assert called(
                 ExternalRequest.process(
                   :get,
                   "/path",
                   "",
                   params: [{"_format", "json"}, {"foo", "1"}]
                 )
               )
      end
    end

    test "accepts atoms as param values" do
      with_mock ExternalRequest, process: fn _, _, _, _ -> {:ok, []} end do
        view("/path", foo: :bar)

        assert called(
                 ExternalRequest.process(
                   :get,
                   "/path",
                   "",
                   params: [{"_format", "json"}, {"foo", "bar"}]
                 )
               )
      end
    end

    test "illegal param values are dropped" do
      with_mock ExternalRequest, process: fn _method, _path, _body, _params -> {:ok, []} end do
        view("/path", %{"foo" => ["bar", "baz"]})

        assert called(
                 ExternalRequest.process(
                   :get,
                   "/path",
                   "",
                   params: [{"_format", "json"}]
                 )
               )

        view("/path", %{"foo" => [bar: "baz"]})

        assert called(
                 ExternalRequest.process(
                   :get,
                   "/path",
                   "",
                   params: [{"_format", "json"}]
                 )
               )

        view("/path", %{"foo" => %{"bar" => "baz"}})

        assert called(
                 ExternalRequest.process(
                   :get,
                   "/path",
                   "",
                   params: [{"_format", "json"}]
                 )
               )
      end
    end

    test "certain nested params are allowed, ordered, and keys are replaced by key[nested_key]" do
      with_mock ExternalRequest, process: fn _method, _path, _body, _params -> {:ok, []} end do
        view("/path", %{"foo" => [bar: "baz", min: :should_be_string, max: "string"]})

        assert called(
                 ExternalRequest.process(
                   :get,
                   "/path",
                   "",
                   params: [
                     {"_format", "json"},
                     {"foo[min]", "should_be_string"},
                     {"foo[max]", "string"}
                   ]
                 )
               )
      end
    end
  end
end

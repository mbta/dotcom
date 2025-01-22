defmodule DotcomWeb.CacheControllerTest do
  use DotcomWeb.ConnCase, async: false

  @cache Application.compile_env!(:dotcom, :cache)

  describe "DELETE /cache/*path" do
    test "it removes an entry from the cache", %{conn: conn} do
      paths = ["/cache/foo", "/cache/foo/bar"]

      Enum.each(paths, fn path ->
        key = path |> String.replace("/cache/", "") |> String.split("/") |> Enum.join("|")

        @cache.put(key, "foo")

        assert @cache.get(key) != nil

        conn =
          conn
          |> put_req_header("content-type", "application/json")
          |> put_req_header("authorization", "Basic " <> Base.encode64("username:password"))
          |> delete(path)

        assert @cache.get(key) == nil
        assert conn.status == 202
      end)
    end
  end
end

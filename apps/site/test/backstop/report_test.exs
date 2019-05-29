defmodule Backstop.ReportTest do
  use ExUnit.Case, async: true
  alias Mix.Tasks.Backstop.Report
  alias ExUnit.CaptureLog
  alias Plug.Conn

  @tmp_dir System.tmp_dir!() |> Path.join("backstop")
  @base_url "https://mbta-semaphore.s3.amazonaws.com/test.tar.gz"
  @params %{
    "Expires" => "1540834579"
  }

  test "parse_url returns url and query params as a tuple" do
    assert Report.parse_url(
             url: URI.to_string(%URI{path: @base_url, query: URI.encode_query(@params)})
           ) == {@base_url, @params}
  end

  describe "setup_dir" do
    test "generates folders at $TMP_DIR/$BRANCH/$BUILD" do
      branch = "branch-#{random_num_string()}"
      build = random_num_string()
      expected = Path.join([@tmp_dir, branch, build])

      refute @tmp_dir |> Path.join(branch) |> File.exists?()

      base_url = "https://localhost:4001/#{branch}.tar.gz"
      params = Map.put(@params, "Expires", build)

      CaptureLog.capture_log(fn ->
        assert Report.setup_dir(base_url, params) == expected
        assert File.dir?(expected)
      end)

      on_exit(fn ->
        assert {:ok, _} = @tmp_dir |> Path.join(branch) |> File.rm_rf()
      end)
    end

    test "simply returns path if folders already exist" do
      branch = "branch-#{random_num_string()}"
      build = random_num_string()
      expected = Path.join([@tmp_dir, branch, build])

      assert :ok = File.mkdir_p(expected)

      base_url = "https://localhost:4001/#{branch}.tar.gz"
      params = Map.put(@params, "Expires", build)

      CaptureLog.capture_log(fn ->
        assert Report.setup_dir(base_url, params) == expected
      end)

      on_exit(fn ->
        assert {:ok, _} = @tmp_dir |> Path.join(branch) |> File.rm_rf()
      end)
    end
  end

  describe "do_run/1" do
    test "downloads report and opens file if file is available" do
      bypass = Bypass.open()

      Bypass.expect(bypass, fn conn ->
        Conn.send_resp(conn, 200, "BODY")
      end)

      branch = "branch-#{random_num_string()}"
      build = random_num_string()

      _ =
        CaptureLog.capture_log(fn ->
          assert Report.do_run(
                   extract_fn: &extract_fn/2,
                   open_fn: &open_fn/2,
                   url:
                     URI.to_string(%URI{
                       scheme: "http",
                       host: "localhost",
                       port: bypass.port,
                       path: "/#{branch}.tar.gz",
                       query: @params |> Map.put("Expires", build) |> URI.encode_query()
                     })
                 ) == {"", 0}

          assert_receive {:extract_file, _, "BODY"}
          assert_receive {:open_file, path}
          assert path =~ "/apps/site/test/backstop_data"
        end)

      on_exit(fn ->
        assert {:ok, _} = @tmp_dir |> Path.join(branch) |> File.rm_rf()
      end)
    end

    test "raises an error if file has expired" do
      bypass = Bypass.open()

      Bypass.expect(bypass, fn conn ->
        Conn.send_resp(conn, 403, "Request has expired")
      end)

      branch = "branch-#{random_num_string()}"
      build = random_num_string()

      CaptureLog.capture_log(fn ->
        assert_raise Report.ExpiredReportError, fn ->
          Report.do_run(
            extract_fn: &extract_fn/2,
            open_fn: &open_fn/2,
            url:
              URI.to_string(%URI{
                scheme: "http",
                host: "localhost",
                port: bypass.port,
                path: "/#{branch}.tar.gz",
                query: @params |> Map.put("Expires", build) |> URI.encode_query()
              })
          )
        end

        refute_receive {:extract_file, _, _}
        refute_receive {:open_file, _}
      end)

      on_exit(fn ->
        assert {:ok, _} = @tmp_dir |> Path.join(branch) |> File.rm_rf()
      end)
    end

    test "reads existing file if report already downloaded" do
      branch = "branch-#{random_num_string()}"
      build = random_num_string()

      assert :ok =
               [@tmp_dir, branch, build, "apps"]
               |> Path.join()
               |> File.mkdir_p()

      CaptureLog.capture_log(fn ->
        assert Report.do_run(
                 extract_fn: &extract_fn/2,
                 open_fn: &open_fn/2,
                 url:
                   URI.to_string(%URI{
                     scheme: "http",
                     host: "localhost",
                     port: 4001,
                     path: "/#{branch}.tar.gz",
                     query: @params |> Map.put("Expires", build) |> URI.encode_query()
                   })
               ) == {"", 0}

        refute_receive {:extract_file, _, _}
        assert_receive {:open_file, _}
      end)

      on_exit(fn ->
        assert {:ok, _} = @tmp_dir |> Path.join(branch) |> File.rm_rf()
      end)
    end
  end

  describe "run/1" do
    test "runs function" do
      branch = "branch-#{random_num_string()}"
      build = random_num_string()

      bypass = Bypass.open()
      Bypass.expect(bypass, fn conn -> Conn.send_resp(conn, 403, "Report has expired") end)

      CaptureLog.capture_log(fn ->
        assert_raise Report.ExpiredReportError, fn ->
          Report.run([
            "--url",
            URI.to_string(%URI{
              scheme: "http",
              host: "localhost",
              port: bypass.port,
              path: "/#{branch}.tar.gz",
              query: @params |> Map.put("Expires", build) |> URI.encode_query()
            })
          ])
        end
      end)

      on_exit(fn ->
        assert {:ok, _} = @tmp_dir |> Path.join(branch) |> File.rm_rf()
      end)
    end
  end

  def random_num_string do
    1..1000
    |> Enum.random()
    |> Integer.to_string()
  end

  def extract_fn({:binary, body}, [:compressed, {:cwd, dir}]) do
    send(self(), {:extract_file, dir, body})
    :ok
  end

  def open_fn("open", [path]) do
    send(self(), {:open_file, path})
    {"", 0}
  end
end

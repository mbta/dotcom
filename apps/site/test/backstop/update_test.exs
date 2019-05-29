defmodule Backstop.UpdateTest do
  @moduledoc false
  use ExUnit.Case, async: true
  import Mix.Tasks.Backstop.Update

  describe "run/1" do
    test "updates backstop references using images from most recent test" do
      timestamp = Util.now() |> Timex.format!("{ISO:Basic}")

      test_path = System.tmp_dir!() |> Path.join(timestamp)

      internal_path =
        Path.join([test_path, "apps/site/test/backstop_data/bitmaps_test", timestamp])

      on_exit(fn ->
        assert {:ok, _} = File.rm_rf(test_path)
      end)

      :ok = File.mkdir_p(internal_path)
      :ok = internal_path |> Path.join("test-1.png") |> File.touch()
      :ok = internal_path |> Path.join("test-2.png") |> File.touch()
      :ok = internal_path |> Path.join("failed_diff_test-2.png") |> File.touch()

      assert run(["--dir=" <> test_path], copy_fn: &copy_fn/2) == :ok

      assert_receive {:copy_fn, "test-2.png", source, dest}
      assert source == Path.join(internal_path, "test-2.png")
      assert dest =~ "apps/site/test/backstop_data/bitmaps_reference/test-2.png"

      refute_receive {:copy_fn, "test-1.png", _, _}
    end

    test "updates specific files when provided with a --files option" do
      timestamp = Util.now() |> Timex.format!("{ISO:Basic}")

      test_path = System.tmp_dir!() |> Path.join(timestamp)

      internal_path =
        Path.join([test_path, "apps/site/test/backstop_data/bitmaps_test", timestamp])

      on_exit(fn ->
        assert {:ok, _} = File.rm_rf(test_path)
      end)

      :ok = File.mkdir_p(internal_path)
      :ok = internal_path |> Path.join("test-1.png") |> File.touch()
      :ok = internal_path |> Path.join("test-2.png") |> File.touch()
      :ok = internal_path |> Path.join("failed_diff_test-2.png") |> File.touch()
      :ok = internal_path |> Path.join("test-3.png") |> File.touch()
      :ok = internal_path |> Path.join("failed_diff_test-3.png") |> File.touch()
      :ok = internal_path |> Path.join("test-4.png") |> File.touch()
      :ok = internal_path |> Path.join("failed_diff_test-4.png") |> File.touch()

      assert run(["--dir=" <> test_path, "--files=test-3.png,test-4.png"], copy_fn: &copy_fn/2) ==
               :ok

      assert_receive {:copy_fn, "test-3.png", _source, _dest}
      assert_receive {:copy_fn, "test-4.png", _source, _dest}

      refute_receive {:copy_fn, "test-1.png", _, _}
      refute_receive {:copy_fn, "test-2.png", _, _}
    end
  end

  describe "filter_file_list/2" do
    @list ["not_failed.png", "failed_diff_original.png"]

    test "given a list of filenames, returns only the matching names" do
      expected = ["not_failed.png"]
      actual = filter_file_list(@list, ["not_failed.png", "missing.png"])
      assert actual == expected
    end

    test "without specified filenames, returns the failed ones" do
      expected = ["original.png"]
      actual = filter_file_list(@list, [])
      assert actual == expected
    end
  end

  describe "destination_path/1" do
    test "finds the path for the file in the reference directory" do
      cwd = File.cwd!()
      assert cwd =~ "/apps/site"
      expected = cwd <> "/test/backstop_data/bitmaps_reference/filename.png"

      actual =
        destination_path("apps/site/test/backstop_data/bitmaps_test/20170626-110918/filename.png")

      assert actual == expected
    end
  end

  def copy_fn(source, dest) do
    send(self(), {:copy_fn, Path.basename(source), source, dest})
  end
end

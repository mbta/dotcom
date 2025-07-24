defmodule Dotcom.Utils.FileTest do
  use ExUnit.Case

  import Dotcom.Utils.File

  setup do
    tmp_dir = System.tmp_dir()

    on_exit(fn ->
      File.rm_rf(tmp_dir)
    end)

    {:ok, %{tmp_dir: tmp_dir}}
  end

  describe "list_all_files/1" do
    test "returns an empty list when the directory does not exist" do
      assert list_all_files("foo/bar/baz") === []
    end

    test "returns an empty list when the directory is empty", %{tmp_dir: tmp_dir} do
      # Setup
      empty_dir = Path.join([tmp_dir, "empty"])
      File.mkdir(empty_dir)

      # Exercise / Verify
      assert list_all_files(empty_dir) === []
    end

    test "returns all files", %{tmp_dir: tmp_dir} do
      # Setup
      full_dir = Path.join([tmp_dir, "full"])
      File.mkdir(full_dir)

      file = Faker.Company.bullshit_prefix() <> ".txt"
      file_path = Path.join([full_dir, file])
      File.write(file_path, Faker.Company.bullshit())

      # Exercise / Verify
      assert list_all_files(full_dir) === [file_path]
    end

    test "recursively returns all files", %{tmp_dir: tmp_dir} do
      # Setup
      full_dir = Path.join([tmp_dir, "full"])
      File.mkdir(full_dir)

      nested_dir = Path.join([full_dir, "nested"])
      File.mkdir(nested_dir)

      file = Faker.Company.bullshit_prefix() <> ".txt"
      file_path = Path.join([nested_dir, file])
      File.write(file_path, Faker.Company.bullshit())

      # Exercise / Verify
      assert list_all_files(full_dir) === [file_path]
    end
  end
end

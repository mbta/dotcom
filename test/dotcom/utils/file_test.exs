defmodule Dotcom.Utils.FileTest do
  use ExUnit.Case

  import Dotcom.Utils.File

  setup do
    tmp_dir = System.tmp_dir()
    empty_dir = Path.join([tmp_dir, "empty"])
    full_dir = Path.join([tmp_dir, "full"])

    File.mkdir(empty_dir)
    File.mkdir(full_dir)

    file = Faker.Company.bullshit_prefix() <> ".txt"
    file_path = Path.join([full_dir, file])

    File.write(file_path, Faker.Company.bullshit())

    on_exit(fn ->
      File.rm_rf(full_dir)
    end)

    {:ok, %{tmp_dir: tmp_dir, empty_dir: empty_dir, full_dir: full_dir, file_path: file_path}}
  end

  describe "list_all_files/1" do
    test "returns an empty list when the directory is empty", %{empty_dir: empty_dir} do
      assert list_all_files(empty_dir) === []
    end

    test "returns all files", %{full_dir: full_dir, file_path: file_path} do
      assert list_all_files(full_dir) == [file_path]
    end
  end
end

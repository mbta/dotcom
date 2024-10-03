defmodule Dotcom.TripPlan.InputFormTest do
  use ExUnit.Case, async: true

  alias Dotcom.TripPlan.InputForm

  @from_params %{
    "latitude" => "#{Faker.Address.latitude()}",
    "longitude" => "#{Faker.Address.longitude()}"
  }
  @to_params %{
    "latitude" => "#{Faker.Address.latitude()}",
    "longitude" => "#{Faker.Address.longitude()}"
  }
  @mode_params InputForm.valid_modes()
  @params %{
    "from" => @from_params,
    "to" => @to_params,
    "datetime_type" => Faker.Util.pick(InputForm.time_types()) |> to_string(),
    "datetime" => Faker.DateTime.forward(4) |> to_string(),
    "modes" => @mode_params |> Enum.map(&to_string/1),
    "wheelchair" => Faker.Util.pick(["true", "false"])
  }

  test "from & to fields are required" do
    changeset = InputForm.changeset(%{})
    assert {_, [validation: :required]} = changeset.errors[:from]
    assert {_, [validation: :required]} = changeset.errors[:to]
  end

  describe "validate_params/1" do
    test "validates to & from" do
      changeset = InputForm.validate_params(@params)
      assert changeset.valid?
    end

    test "adds from & to errors" do
      changeset =
        InputForm.validate_params(%{
          "from" => %{
            "latitude" => "",
            "longitude" => "",
            "name" => "",
            "stop_id" => ""
          },
          "to" => %{
            "latitude" => "",
            "longitude" => "",
            "name" => "",
            "stop_id" => ""
          }
        })

      refute changeset.valid?
      assert changeset.errors[:to]
      assert changeset.errors[:from]
    end

    test "adds error if from & to are the same" do
      changeset =
        InputForm.validate_params(%{
          "from" => @from_params,
          "to" => @from_params
        })

      refute changeset.valid?

      expected_error = InputForm.error_message(:from_to_same)
      assert {^expected_error, _} = changeset.errors[:to]
    end
  end

  describe "Location" do
    test "longitude & latitude fields are required" do
      changeset = InputForm.Location.changeset()
      assert {_, [validation: :required]} = changeset.errors[:latitude]
      assert {_, [validation: :required]} = changeset.errors[:longitude]
    end

    test "adds a name if none provided" do
      lat = Faker.Address.latitude()
      lon = Faker.Address.longitude()

      changeset =
        InputForm.Location.changeset(%InputForm.Location{}, %{
          "latitude" => "#{lat}",
          "longitude" => "#{lon}"
        })

      assert changeset.changes.name == "#{lat}, #{lon}"
    end
  end
end

defmodule TripPlanner.InputFormTest do
  use ExUnit.Case, async: true

  alias TripPlanner.InputForm

  test "from & to fields are required" do
    changeset = InputForm.changeset(%{})
    assert {_, [validation: :required]} = changeset.errors[:from]
    assert {_, [validation: :required]} = changeset.errors[:to]
  end

  describe "validate_params/1" do
    test "validates to & from" do
      changeset =
        InputForm.validate_params(%{
          "from" => %{
            "latitude" => "42",
            "longitude" => "23"
          },
          "to" => %{
            "latitude" => "123",
            "longitude" => "23423"
          }
        })

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
      location = %{
        "latitude" => "#{Faker.Address.latitude()}",
        "longitude" => "#{Faker.Address.longitude()}",
        "name" => "This place",
        "stop_id" => ""
      }

      changeset =
        InputForm.validate_params(%{
          "from" => location,
          "to" => location
        })

      refute changeset.valid?

      assert {"Please select a destination at a different location from the origin.", _} =
               changeset.errors[:to]
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

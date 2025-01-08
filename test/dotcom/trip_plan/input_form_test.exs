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
  @mode_params InputForm.initial_modes()
  @params %{
    "from" => @from_params,
    "to" => @to_params,
    "datetime_type" => "now",
    "datetime" => Faker.DateTime.forward(4) |> to_string(),
    "modes" => @mode_params,
    "wheelchair" => Faker.Util.pick(["true", "false"])
  }

  test "from & to fields are required" do
    changeset = InputForm.changeset(%{})
    assert {_, [validation: :required]} = changeset.errors[:from]
    assert {_, [validation: :required]} = changeset.errors[:to]
  end

  test "mode required" do
    changeset = InputForm.changeset(%{modes: nil})
    assert {_, [validation: :required]} = changeset.errors[:modes]
  end

  describe "changeset/1" do
    test "validates to & from" do
      changeset = InputForm.changeset(@params)
      assert changeset.valid?
    end

    test "does not add from & to errors" do
      changeset =
        InputForm.changeset(%{
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
      refute changeset.errors[:to]
      refute changeset.errors[:from]
    end

    test "adds error if from & to are the same" do
      changeset =
        InputForm.changeset(%{
          "from" => @from_params,
          "to" => @from_params
        })

      refute changeset.valid?

      expected_error = InputForm.error_message(:from_to_same)
      assert {^expected_error, _} = changeset.errors[:to]
    end

    test "adds datetime if using datetime_type == now" do
      changeset =
        InputForm.changeset(%{
          @params
          | "datetime_type" => "now",
            "datetime" => nil
        })

      assert changeset.valid?
      assert %DateTime{} = changeset.changes[:datetime]
    end

    test "datetime required if using datetime_type != now" do
      expected_error = InputForm.error_message(:datetime)

      changeset =
        InputForm.changeset(%{
          @params
          | "datetime_type" => "arrive_by",
            "datetime" => nil
        })

      refute changeset.valid?
      assert {^expected_error, _} = changeset.errors[:datetime]

      changeset =
        InputForm.changeset(%{
          @params
          | "datetime_type" => "leave_at",
            "datetime" => nil
        })

      refute changeset.valid?
      assert {^expected_error, _} = changeset.errors[:datetime]
    end

    test "requires date to be in the future" do
      changeset =
        InputForm.changeset(%{
          @params
          | "datetime_type" => "arrive_by",
            "datetime" => Faker.DateTime.forward(1)
        })

      assert changeset.valid?

      expected_error = InputForm.error_message(:datetime)

      changeset =
        InputForm.changeset(%{
          @params
          | "datetime_type" => "arrive_by",
            "datetime" => Faker.DateTime.backward(1)
        })

      refute changeset.valid?
      assert {^expected_error, _} = changeset.errors[:datetime]
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

  describe "Modes" do
    test "selected_modes/1 summarizes two values" do
      changeset =
        InputForm.Modes.changeset(%InputForm.Modes{}, %{
          "RAIL" => "true",
          "SUBWAY" => "true",
          "BUS" => "false",
          "FERRY" => "false"
        })

      assert "Commuter Rail and Subway" = InputForm.Modes.selected_modes(changeset)
    end

    test "selected_modes/1 summarizes one value" do
      data = %InputForm.Modes{RAIL: false, SUBWAY: false, BUS: true, FERRY: false}
      assert "Bus Only" = InputForm.Modes.selected_modes(data)
    end

    test "selected_modes/1 summarizes many values" do
      data = %InputForm.Modes{RAIL: true, SUBWAY: false, BUS: true, FERRY: true}
      assert "Commuter Rail, Bus, and Ferry" = InputForm.Modes.selected_modes(data)
    end

    test "selected_modes/1 summarizes all values" do
      data = %InputForm.Modes{RAIL: true, SUBWAY: true, BUS: true, FERRY: true}
      assert "All modes" = InputForm.Modes.selected_modes(data)
    end
  end
end

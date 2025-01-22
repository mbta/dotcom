defmodule Fares.RepoTest do
  use ExUnit.Case, async: true

  alias Fares.Fare
  alias Fares.Repo

  describe "all/0" do
    test "returns a list of the fares we know about" do
      assert is_list(Repo.all())
    end
  end

  describe "all/1" do
    test "is the same as piping all/0 through filter/2" do
      assert Repo.all(mode: :subway) == Repo.filter(Repo.all(), mode: :subway)
    end
  end

  describe "filter/1" do
    @fares [
      %Fare{
        mode: :commuter_rail,
        cents: 225,
        duration: :single_trip,
        name: {:zone, "1A"},
        media: [:commuter_ticket],
        reduced: nil
      },
      %Fare{
        mode: :commuter_rail,
        cents: 225,
        duration: :single_trip,
        name: {:zone, "1A"},
        media: [:commuter_ticket],
        reduced: :student
      },
      %Fare{
        mode: :commuter_rail,
        cents: 225,
        duration: :month,
        name: {:zone, "2"},
        media: [:commuter_ticket],
        reduced: :student
      },
      %Fare{
        mode: :commuter_rail,
        cents: 625,
        duration: :month,
        name: {:zone, "3"},
        media: [:charlie_card],
        reduced: nil
      },
      %Fare{
        mode: :commuter_rail,
        cents: 1025,
        duration: :month,
        name: {:zone, "6"},
        media: [:commuter_ticket, :cash],
        reduced: nil
      },
      %Fare{
        mode: :subway,
        cents: 225,
        duration: :single_trip,
        name: :subway_charlie_card,
        media: [:charlie_card],
        reduced: nil
      },
      %Fare{
        mode: :subway,
        cents: 275,
        duration: :single_trip,
        name: :subway_ticket,
        media: [:commuter_ticket],
        reduced: nil
      },
      %Fare{
        mode: :subway,
        cents: 3000,
        duration: :month,
        name: :subway_student,
        media: [:charlie_card],
        reduced: :student
      }
    ]

    test "gives all single trip fares from a list" do
      assert Repo.filter(@fares, duration: :single_trip) == [
               %Fare{
                 mode: :commuter_rail,
                 cents: 225,
                 duration: :single_trip,
                 name: {:zone, "1A"},
                 media: [:commuter_ticket],
                 reduced: nil
               },
               %Fare{
                 mode: :commuter_rail,
                 cents: 225,
                 duration: :single_trip,
                 name: {:zone, "1A"},
                 media: [:commuter_ticket],
                 reduced: :student
               },
               %Fare{
                 mode: :subway,
                 cents: 225,
                 duration: :single_trip,
                 name: :subway_charlie_card,
                 media: [:charlie_card],
                 reduced: nil
               },
               %Fare{
                 mode: :subway,
                 cents: 275,
                 duration: :single_trip,
                 name: :subway_ticket,
                 media: [:commuter_ticket],
                 reduced: nil
               }
             ]
    end

    test "gives all zone 2 fares from a list" do
      assert Repo.filter(@fares, name: {:zone, "2"}) == [
               %Fare{
                 mode: :commuter_rail,
                 cents: 225,
                 duration: :month,
                 name: {:zone, "2"},
                 media: [:commuter_ticket],
                 reduced: :student
               }
             ]
    end

    test "gives all student fares from a list" do
      assert Repo.filter(@fares, reduced: :student) == [
               %Fare{
                 mode: :commuter_rail,
                 cents: 225,
                 duration: :single_trip,
                 name: {:zone, "1A"},
                 media: [:commuter_ticket],
                 reduced: :student
               },
               %Fare{
                 mode: :commuter_rail,
                 cents: 225,
                 duration: :month,
                 name: {:zone, "2"},
                 media: [:commuter_ticket],
                 reduced: :student
               },
               %Fare{
                 mode: :subway,
                 cents: 3000,
                 duration: :month,
                 name: :subway_student,
                 media: [:charlie_card],
                 reduced: :student
               }
             ]
    end

    test "gives all commuter ticket fares from a list" do
      assert Repo.filter(@fares, media: [:commuter_ticket]) == [
               %Fare{
                 mode: :commuter_rail,
                 cents: 225,
                 duration: :single_trip,
                 name: {:zone, "1A"},
                 media: [:commuter_ticket],
                 reduced: nil
               },
               %Fare{
                 mode: :commuter_rail,
                 cents: 225,
                 duration: :single_trip,
                 name: {:zone, "1A"},
                 media: [:commuter_ticket],
                 reduced: :student
               },
               %Fare{
                 mode: :commuter_rail,
                 cents: 225,
                 duration: :month,
                 name: {:zone, "2"},
                 media: [:commuter_ticket],
                 reduced: :student
               },
               %Fare{
                 mode: :subway,
                 cents: 275,
                 duration: :single_trip,
                 name: :subway_ticket,
                 media: [:commuter_ticket],
                 reduced: nil
               }
             ]
    end

    test "gives all zone 1a student fares from a list" do
      assert Repo.filter(@fares, reduced: :student, name: {:zone, "1A"}) == [
               %Fare{
                 mode: :commuter_rail,
                 cents: 225,
                 duration: :single_trip,
                 name: {:zone, "1A"},
                 media: [:commuter_ticket],
                 reduced: :student
               }
             ]
    end

    test "can filter by mode" do
      assert Repo.filter(@fares, mode: :subway) == [
               %Fare{
                 mode: :subway,
                 cents: 225,
                 duration: :single_trip,
                 name: :subway_charlie_card,
                 media: [:charlie_card],
                 reduced: nil
               },
               %Fare{
                 mode: :subway,
                 cents: 275,
                 duration: :single_trip,
                 name: :subway_ticket,
                 media: [:commuter_ticket],
                 reduced: nil
               },
               %Fare{
                 mode: :subway,
                 cents: 3000,
                 duration: :month,
                 name: :subway_student,
                 media: [:charlie_card],
                 reduced: :student
               }
             ]
    end

    test "gives fares that includes at least the provided media" do
      assert Repo.filter(@fares, mode: :commuter_rail, name: {:zone, "6"}, includes_media: :cash) ==
               [
                 %Fare{
                   mode: :commuter_rail,
                   cents: 1025,
                   duration: :month,
                   name: {:zone, "6"},
                   media: [:commuter_ticket, :cash],
                   reduced: nil
                 }
               ]
    end
  end

  describe "for_fare_class/1" do
    test "sets appropriate opts for each fare class" do
      rapid_transit_fares = Repo.for_fare_class(:rapid_transit_fare)
      assert Enum.all?(rapid_transit_fares, &(&1.mode == :subway))

      free_fares = Repo.for_fare_class(:free_fare)
      assert Enum.all?(free_fares, &(&1.name == :free_fare))

      express_bus_fares = Repo.for_fare_class(:express_bus_fare)
      assert Enum.all?(express_bus_fares, &(&1.name == :express_bus))

      local_bus_fares = Repo.for_fare_class(:local_bus_fare)
      assert Enum.all?(local_bus_fares, &(&1.name == :local_bus))

      ferry_fares = Repo.for_fare_class(:ferry_fare)
      assert Enum.all?(ferry_fares, &(&1.mode == :ferry))

      cr_fares = Repo.for_fare_class(:commuter_rail_fare)
      assert Enum.all?(cr_fares, &(&1.mode == :commuter_rail))
    end
  end
end

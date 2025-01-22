defmodule CMS.Partial.Paragraph.ColumnMultiTest do
  @moduledoc false

  use ExUnit.Case, async: true

  alias CMS.Partial.Paragraph.Column
  alias CMS.Partial.Paragraph.ColumnMulti
  alias CMS.Partial.Paragraph.CustomHTML
  alias CMS.Partial.Paragraph.DescriptiveLink
  alias CMS.Partial.Paragraph.FareCard
  alias Phoenix.HTML

  test "new/0 creates a new, complete ColumnMulti struct" do
    assert %ColumnMulti{
             header: nil,
             columns: [],
             display_options: "default",
             right_rail: false
           } = ColumnMulti.new()
  end

  test "new/1 creates a new, complete ColumnMulti struct with overidden properties" do
    assert %ColumnMulti{
             header: nil,
             columns: [],
             display_options: "grouped",
             right_rail: true
           } = ColumnMulti.new(display_options: "grouped", right_rail: true)
  end

  test "grouped?/1 returns whether or not the ColumnMulti paragraph is grouped" do
    grouped_column_multi = %ColumnMulti{display_options: "grouped"}
    ungrouped_column_multi = %ColumnMulti{display_options: "default"}

    assert ColumnMulti.grouped?(grouped_column_multi)
    refute ColumnMulti.grouped?(ungrouped_column_multi)
  end

  test "includes?/1 returns whether or not the ColumnMulti paragraph contains a fare card" do
    column_multi_with_fare_card = %ColumnMulti{
      columns: [
        %Column{
          paragraphs: [
            %FareCard{
              fare_token: "subway:charlie_card",
              note: %CustomHTML{
                body: {:safe, "<p>{{ fare:subway:cash }} with CharlieTicket</p>\n"}
              }
            }
          ]
        }
      ]
    }

    column_multi_without_fare_card = %ColumnMulti{
      columns: [
        %Column{
          paragraphs: [
            %CustomHTML{body: HTML.raw("<strong>Column 1</strong>")}
          ]
        }
      ]
    }

    assert ColumnMulti.includes?(column_multi_with_fare_card, :fares)
    refute ColumnMulti.includes?(column_multi_without_fare_card, :fares)
  end

  test "includes?/1 returns whether or not the ColumnMulti paragraph contains descriptive links" do
    column_multi_with_link = %ColumnMulti{
      columns: [
        %Column{
          paragraphs: [
            %DescriptiveLink{
              title: "Descriptive Link",
              body: {:safe, "<p>Info</p>"}
            }
          ]
        }
      ]
    }

    column_multi_without_link = %ColumnMulti{
      columns: [
        %Column{
          paragraphs: [
            %CustomHTML{body: HTML.raw("<strong>Column 1</strong>")}
          ]
        }
      ]
    }

    assert ColumnMulti.includes?(column_multi_with_link, :links)
    refute ColumnMulti.includes?(column_multi_without_link, :links)
  end
end

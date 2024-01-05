defmodule Dotcom.RoutePdfsTest do
  use ExUnit.Case, async: true

  import Dotcom.RoutePdfs

  alias CMS.Partial.RoutePdf

  @date ~D[2018-01-01]

  describe "fetch_and_choose_pdfs/2" do
    test "returns at least one result" do
      assert [_at_least_one_result | _] = fetch_and_choose_pdfs("87", ~D[2019-01-01])
    end
  end

  describe "choose_pdfs/2" do
    test "handles zero pdfs" do
      assert choose_pdfs([], @date) == []
    end

    test "shows single current pdf" do
      assert choose_pdfs(
               [
                 %RoutePdf{path: "/url", date_start: ~D[2017-12-01]}
               ],
               @date
             ) == [
               %RoutePdf{path: "/url", date_start: ~D[2017-12-01]}
             ]
    end

    test "shows multiple current pdf" do
      assert choose_pdfs(
               [
                 %RoutePdf{path: "/url", date_start: ~D[2017-12-01]},
                 %RoutePdf{
                   path: "/custom",
                   date_start: ~D[2017-12-01],
                   link_text_override: "custom"
                 }
               ],
               @date
             ) == [
               %RoutePdf{path: "/url", date_start: ~D[2017-12-01]},
               %RoutePdf{
                 path: "/custom",
                 date_start: ~D[2017-12-01],
                 link_text_override: "custom"
               }
             ]
    end

    test "shows upcoming pdf after current one" do
      assert choose_pdfs(
               [
                 %RoutePdf{path: "/url2", date_start: ~D[2018-02-01]},
                 %RoutePdf{
                   path: "/custom2",
                   date_start: ~D[2018-02-01],
                   link_text_override: "custom2"
                 },
                 %RoutePdf{path: "/url1", date_start: ~D[2017-11-01]},
                 %RoutePdf{
                   path: "/custom1",
                   date_start: ~D[2017-11-01],
                   link_text_override: "custom1"
                 }
               ],
               @date
             ) == [
               %RoutePdf{path: "/url1", date_start: ~D[2017-11-01]},
               %RoutePdf{
                 path: "/custom1",
                 date_start: ~D[2017-11-01],
                 link_text_override: "custom1"
               },
               %RoutePdf{path: "/url2", date_start: ~D[2018-02-01]},
               %RoutePdf{
                 path: "/custom2",
                 date_start: ~D[2018-02-01],
                 link_text_override: "custom2"
               }
             ]
    end

    test "does not show expired pdfs" do
      assert choose_pdfs(
               [
                 %RoutePdf{
                   path: "/expired-basic",
                   date_start: ~D[2017-11-01],
                   date_end: ~D[2017-11-02]
                 },
                 %RoutePdf{
                   path: "/expired-custom",
                   date_start: ~D[2017-12-01],
                   date_end: ~D[2017-12-02],
                   link_text_override: "Special Message 1"
                 },
                 %RoutePdf{
                   path: "/current-custom",
                   date_start: ~D[2017-10-01],
                   link_text_override: "Special Message 2"
                 }
               ],
               @date
             ) == [
               %RoutePdf{
                 path: "/current-custom",
                 date_start: ~D[2017-10-01],
                 link_text_override: "Special Message 2"
               }
             ]
    end

    test "shows not-yet-expired pdfs" do
      assert choose_pdfs(
               [
                 %RoutePdf{path: "/basic", date_start: ~D[2017-11-01], date_end: ~D[2018-01-02]},
                 %RoutePdf{
                   path: "/custom",
                   date_start: ~D[2017-12-01],
                   date_end: ~D[2018-01-02],
                   link_text_override: "x"
                 }
               ],
               @date
             ) == [
               %RoutePdf{path: "/basic", date_start: ~D[2017-11-01], date_end: ~D[2018-01-02]},
               %RoutePdf{
                 path: "/custom",
                 date_start: ~D[2017-12-01],
                 date_end: ~D[2018-01-02],
                 link_text_override: "x"
               }
             ]
    end

    test "sorts by order in the input, not date, within each section" do
      assert choose_pdfs(
               [
                 %RoutePdf{path: "/upcoming3", date_start: ~D[2018-04-01]},
                 %RoutePdf{
                   path: "/upcoming2-expires",
                   date_start: ~D[2018-03-01],
                   date_end: ~D[2018-03-02]
                 },
                 %RoutePdf{path: "/upcoming1", date_start: ~D[2018-02-01]},
                 %RoutePdf{path: "/current3", date_start: ~D[2017-11-01]},
                 %RoutePdf{
                   path: "/current2-expires",
                   date_start: ~D[2017-10-01],
                   date_end: ~D[2018-01-02]
                 },
                 %RoutePdf{path: "/current1", date_start: ~D[2017-09-01]}
               ],
               @date
             ) == [
               %RoutePdf{path: "/current3", date_start: ~D[2017-11-01]},
               %RoutePdf{
                 path: "/current2-expires",
                 date_start: ~D[2017-10-01],
                 date_end: ~D[2018-01-02]
               },
               %RoutePdf{path: "/current1", date_start: ~D[2017-09-01]},
               %RoutePdf{path: "/upcoming3", date_start: ~D[2018-04-01]},
               %RoutePdf{
                 path: "/upcoming2-expires",
                 date_start: ~D[2018-03-01],
                 date_end: ~D[2018-03-02]
               },
               %RoutePdf{path: "/upcoming1", date_start: ~D[2018-02-01]}
             ]
    end

    test "comprehensive test" do
      assert choose_pdfs(
               [
                 %RoutePdf{
                   path: "/upcoming/custom",
                   date_start: ~D[2018-02-01],
                   link_text_override: "x"
                 },
                 %RoutePdf{
                   path: "/current/custom/expires",
                   date_start: ~D[2017-11-01],
                   date_end: ~D[2018-01-02],
                   link_text_override: "x"
                 },
                 %RoutePdf{
                   path: "/upcoming/basic/expires",
                   date_start: ~D[2018-03-01],
                   date_end: ~D[2018-03-02]
                 },
                 %RoutePdf{path: "/current/basic", date_start: ~D[2017-10-01]},
                 %RoutePdf{
                   path: "/outdated/custom",
                   date_start: ~D[2017-12-01],
                   date_end: ~D[2017-12-02],
                   link_text_override: "x"
                 },
                 %RoutePdf{
                   path: "/outdated/basic",
                   date_start: ~D[2017-09-01],
                   date_end: ~D[2017-09-02]
                 }
               ],
               @date
             ) == [
               %RoutePdf{
                 path: "/current/custom/expires",
                 date_start: ~D[2017-11-01],
                 date_end: ~D[2018-01-02],
                 link_text_override: "x"
               },
               %RoutePdf{path: "/current/basic", date_start: ~D[2017-10-01]},
               %RoutePdf{
                 path: "/upcoming/custom",
                 date_start: ~D[2018-02-01],
                 link_text_override: "x"
               },
               %RoutePdf{
                 path: "/upcoming/basic/expires",
                 date_start: ~D[2018-03-01],
                 date_end: ~D[2018-03-02]
               }
             ]
    end
  end
end

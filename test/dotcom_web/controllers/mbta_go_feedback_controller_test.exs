defmodule DotcomWeb.MbtaGoFeedbackControllerTest do
  use DotcomWeb.ConnCase, async: true
  import Test.Support.EnvHelpers

  test "redirects to english by default for ios", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :ios))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "https://airtable.com/appdYDxevMwSoOnv5/pagEeBp8XZalpGHwA/form?prefill_Language=English&prefill_Phone%20Operating%20System=iOS"
  end

  test "redirects to english by default for android", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :android))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "https://airtable.com/appdYDxevMwSoOnv5/pagEeBp8XZalpGHwA/form?prefill_Language=English&prefill_Phone%20Operating%20System=Android"
  end

  test "redirects to ht for special ht url on ios", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :ios_ht))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "?prefill_Language=Krey%C3%B2l%20Ayisyen&prefill_Phone%20Operating%20System=iOS"
  end

  test "redirects to ht for special ht url on android", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :android_ht))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "?prefill_Language=Krey%C3%B2l%20Ayisyen&prefill_Phone%20Operating%20System=Android"
  end

  test "redirects to es", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :ios, %{"lang" => "es-US"}))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "?prefill_Language=Espa%C3%B1ol&prefill_Phone%20Operating%20System=iOS"
  end

  test "redirects to fr", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :ios, %{"lang" => "fr"}))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "?prefill_Language=Fran%C3%A7ais&prefill_Phone%20Operating%20System=iOS"
  end

  test "redirects to pt", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :ios, %{"lang" => "pt-BR"}))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "?prefill_Language=Portugu%C3%AAs&prefill_Phone%20Operating%20System=iOS"
  end

  test "redirects to vi", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :ios, %{"lang" => "vi"}))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "?prefill_Language=Ti%E1%BA%BFng%20Vi%E1%BB%87t&prefill_Phone%20Operating%20System=iOS"
  end

  test "redirects to zh-Hans", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :ios, %{"lang" => "zh-Hans"}))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "?prefill_Language=%E4%B8%AD%E6%96%87%EF%BC%88%E7%AE%80%E4%BD%93%EF%BC%89&prefill_Phone%20Operating%20System=iOS"
  end

  test "redirects to zh-Hant", %{conn: conn} do
    conn = conn |> get(mbta_go_feedback_path(conn, :ios, %{"lang" => "zh-Hant"}))
    redirected_to = redirected_to(conn, 302)

    assert redirected_to =~
             "?prefill_Language=%E4%B8%AD%E6%96%87%EF%BC%88%E7%B9%81%E9%AB%94%EF%BC%89&prefill_Phone%20Operating%20System=iOS"
  end
end

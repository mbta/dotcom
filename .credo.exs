# This file contains the configuration for Credo and you are probably reading
# this after creating it with `mix credo.gen.config`.
#
# If you find anything wrong or unclear in this file, please report an
# issue on GitHub: https://github.com/rrrene/credo/issues
#
%{
  #
  # You can have as many configs as you like in the `configs:` field.
  configs: [
    %{
      #
      # Run any exec using `mix credo -C <name>`. If no exec name is given
      # "default" is used.
      #
      name: "default",
      #
      # These are the files included in the analysis:
      files: %{
        #
        # You can give explicit globs or simply directories.
        # In the latter case `**/*.{ex,exs}` will be used.
        #
        excluded: [
          ~r"/_build/",
          ~r"/deps/",
          ~r"/node_modules/",

          # Files with existing Credo violations
          "lib/alerts/banner.ex",
          "lib/alerts/informed_entity.ex",
          "lib/alerts/repo.ex",
          "lib/alerts/trip.ex",
          "lib/algolia/stop/route.ex",
          "lib/algolia/stop/routes.ex",
          "lib/build_calendar.ex",
          "lib/dotcom/components/helpers.ex",
          "lib/dotcom/content_rewriters/links.ex",
          "lib/dotcom/font_awesome_helpers.ex",
          "lib/dotcom/icalendar_generator.ex",
          "lib/dotcom/pagination.ex",
          "lib/dotcom/stream/vehicles.ex",
          "lib/dotcom_web/channels/user_socket.ex",
          "lib/dotcom_web/components/search_hits.ex",
          "lib/dotcom_web/components/trip_planner/input_form.ex",
          "lib/dotcom_web/components/trip_planner/itinerary_summary.ex",
          "lib/dotcom_web/controllers/event_controller.ex",
          "lib/dotcom_web/controllers/mode/bus.ex",
          "lib/dotcom_web/controllers/mode/commuter.ex",
          "lib/dotcom_web/controllers/mode/ferry.ex",
          "lib/dotcom_web/controllers/mode/subway.ex",
          "lib/dotcom_web/controllers/old_site_redirect_controller.ex",
          "lib/dotcom_web/controllers/redirect_controller.ex",
          "lib/dotcom_web/controllers/schedule/date_picker.ex",
          "lib/dotcom_web/controllers/schedule/hours_of_operation.ex",
          "lib/dotcom_web/controllers/schedule/schedule_error.ex",
          "lib/dotcom_web/controllers/schedule/timetable_controller.ex",
          "lib/dotcom_web/controllers/schedule_controller.ex",
          "lib/dotcom_web/controllers/static_file_controller.ex",
          "lib/dotcom_web/plugs/common_fares.ex",
          "lib/dotcom_web/redirector.ex",
          "lib/dotcom_web/views/bus_stop_change_view.ex",
          "lib/dotcom_web/views/error_view.ex",
          "lib/dotcom_web/views/helpers/time_helpers.ex",
          "lib/dotcom_web/views/news_entry_view.ex",
          "lib/dotcom_web/views/partial/header_tabs.ex",
          "lib/dotcom_web/views/partial/svg_icon_with_circle.ex",
          "lib/dotcom_web/views/person_view.ex",
          "lib/dotcom_web/views/redirect_view.ex",
          "lib/dotcom_web/views/search_view.ex",
          "lib/fares/commuter_fare_group.ex",
          "lib/fares/retail_locations.ex",
          "lib/fares/retail_locations/location.ex",
          "lib/fares/retail_locations_data.ex",
          "lib/holiday/holiday.ex",
          "lib/holiday/repo.ex",
          "lib/json_api.ex",
          "lib/predicted_schedule/display.ex",
          "lib/predicted_schedule/group.ex",
          "lib/predictions/store.ex",
          "lib/schedules/departures.ex",
          "lib/schedules/parser.ex",
          "lib/stops/helpers.ex",
          "lib/stops/stop.ex",
          "lib/url_helpers.ex",
          "lib/util/and_or.ex",
          "lib/util/breadcrumb_html.ex",
          "lib/util/enum_helpers.ex",
          "test/dotcom_web/components/search_results_live_test.exs",
          "test/dotcom_web/controllers/event_controller_test.exs",
          "test/dotcom_web/controllers/project_controller_test.exs",
          "test/fares/proposed_locations_test.exs",
          "test/fares/retail_locations_test.exs",
          "test/predictions/store_test.exs",
          "test/support/date_helpers.ex",
          "test/support/integration_helpers.ex",
          "test/support/page_helpers.ex",
          "test/support/view_case.ex"
        ]
      },
      #
      # Load and configure plugins here:
      #
      plugins: [],
      #
      # If you create your own checks, you must specify the source files for
      # them here, so they can be loaded by Credo before running the analysis.
      #
      requires: [],
      #
      # If you want to enforce a style guide and need a more traditional linting
      # experience, you can change `strict` to `true` below:
      #
      strict: false,
      #
      # If you want to use uncolored output by default, you can change `color`
      # to `false` below:
      #
      color: true,
      #
      # You can customize the parameters of any check by adding a second element
      # to the tuple.
      #
      # To disable a check put `false` as second element:
      #
      #     {Credo.Check.Design.DuplicatedCode, false}
      #
      checks: [
        #
        ## Consistency Checks
        #
        {Credo.Check.Consistency.ExceptionNames, []},
        {Credo.Check.Consistency.LineEndings, []},
        {Credo.Check.Consistency.ParameterPatternMatching, []},
        # https://github.com/rrrene/credo/issues/731
        {Credo.Check.Consistency.SpaceAroundOperators, false},
        {Credo.Check.Consistency.SpaceInParentheses, []},
        {Credo.Check.Consistency.TabsOrSpaces, []},

        #
        ## Design Checks
        #
        # You can customize the priority of any check
        # Priority values are: `low, normal, high, higher`
        #
        {Credo.Check.Design.AliasUsage,
         [
           priority: :low,
           if_nested_deeper_than: 2,
           if_called_more_often_than: 1,
           excluded_lastnames: [
             "Alerts",
             "DateTime",
             "Location",
             "Predictions",
             "Routes",
             "Schedules",
             "Stream"
           ],
           excluded_namespaces: ["Cldr"]
         ]},
        # You can also customize the exit_status of each check.
        # If you don't want TODO comments to cause `mix credo` to fail, just
        # set this value to 0 (zero).
        #
        {Credo.Check.Design.TagTODO, [exit_status: 2]},
        {Credo.Check.Design.TagFIXME, []},

        #
        ## Readability Checks
        #
        {Credo.Check.Readability.AliasOrder, []},
        {Credo.Check.Readability.FunctionNames, []},
        {Credo.Check.Readability.LargeNumbers, []},
        {Credo.Check.Readability.MaxLineLength, [priority: :low, max_length: 120]},
        {Credo.Check.Readability.ModuleAttributeNames, []},
        {Credo.Check.Readability.ModuleDoc,
         [ignore_names: [~r/\.(\w+Test)$/, ~r/Test.Support./]]},
        {Credo.Check.Readability.ModuleNames, []},
        {Credo.Check.Readability.ParenthesesInCondition, []},
        {Credo.Check.Readability.ParenthesesOnZeroArityDefs, []},
        {Credo.Check.Readability.PredicateFunctionNames, []},
        {Credo.Check.Readability.PreferImplicitTry, []},
        {Credo.Check.Readability.RedundantBlankLines, []},
        {Credo.Check.Readability.Semicolons, []},
        {Credo.Check.Readability.SeparateAliasRequire, []},
        {Credo.Check.Readability.SpaceAfterCommas, []},
        {Credo.Check.Readability.StrictModuleLayout,
         [
           order: ~w/moduledoc use require import alias/a,
           ignore: [],
           ignore_module_attributes: ~w/moduletag/a
         ]},
        {Credo.Check.Readability.StringSigils, []},
        {Credo.Check.Readability.TrailingBlankLine, []},
        {Credo.Check.Readability.TrailingWhiteSpace, []},
        {Credo.Check.Readability.UnnecessaryAliasExpansion, []},
        {Credo.Check.Readability.VariableNames, []},

        #
        ## Refactoring Opportunities
        #
        {Credo.Check.Refactor.CondStatements, []},
        {Credo.Check.Refactor.CyclomaticComplexity, []},
        {Credo.Check.Refactor.FunctionArity, []},
        {Credo.Check.Refactor.LongQuoteBlocks, []},
        # false because not compatible with Elixir 1.10.3
        {Credo.Check.Refactor.MapInto, false},
        {Credo.Check.Refactor.MatchInCondition, []},
        {Credo.Check.Refactor.NegatedConditionsInUnless, []},
        {Credo.Check.Refactor.NegatedConditionsWithElse, []},
        {Credo.Check.Refactor.Nesting, []},
        {Credo.Check.Refactor.UnlessWithElse, []},
        {Credo.Check.Refactor.WithClauses, []},

        #
        ## Warnings
        #
        {Credo.Check.Warning.BoolOperationOnSameValues, []},
        {Credo.Check.Warning.ExpensiveEmptyEnumCheck, []},
        {Credo.Check.Warning.IExPry, []},
        {Credo.Check.Warning.IoInspect, []},
        # false because not compatible with Elixir 1.10.3
        {Credo.Check.Warning.LazyLogging, false},
        {Credo.Check.Warning.MissedMetadataKeyInLoggerConfig, false},
        {Credo.Check.Warning.OperationOnSameValues, []},
        {Credo.Check.Warning.OperationWithConstantResult, []},
        {Credo.Check.Warning.RaiseInsideRescue, []},
        {Credo.Check.Warning.UnusedEnumOperation, []},
        {Credo.Check.Warning.UnusedFileOperation, []},
        {Credo.Check.Warning.UnusedKeywordOperation, []},
        {Credo.Check.Warning.UnusedListOperation, []},
        {Credo.Check.Warning.UnusedPathOperation, []},
        {Credo.Check.Warning.UnusedRegexOperation, []},
        {Credo.Check.Warning.UnusedStringOperation, []},
        {Credo.Check.Warning.UnusedTupleOperation, []},

        #
        # Controversial and experimental checks (opt-in, just replace `false` with `[]`)
        #
        {Credo.Check.Consistency.MultiAliasImportRequireUse, false},
        {Credo.Check.Consistency.UnusedVariableNames, false},
        {Credo.Check.Design.DuplicatedCode, false},
        {Credo.Check.Readability.AliasAs, false},
        {Credo.Check.Readability.MultiAlias, false},
        {Credo.Check.Readability.Specs, false},
        {Credo.Check.Readability.SinglePipe, false},
        {Credo.Check.Refactor.ABCSize, false},
        {Credo.Check.Refactor.AppendSingleItem, false},
        {Credo.Check.Refactor.DoubleBooleanNegation, false},
        {Credo.Check.Refactor.ModuleDependencies, false},
        {Credo.Check.Refactor.PipeChainStart, false},
        {Credo.Check.Refactor.VariableRebinding, false},
        {Credo.Check.Warning.MapGetUnsafePass, false},
        {Credo.Check.Warning.UnsafeToAtom, false}

        #
        # Custom checks can be created using `mix credo.gen.check`.
        #
      ]
    }
  ]
}

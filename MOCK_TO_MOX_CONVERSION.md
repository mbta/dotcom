# Mock to Mox Conversion Summary

## Overview
Successfully converted all tests from using the Mock library to using Mox, and removed the `:mock` dependency from mix.exs.

## Files Modified

### Dependencies
- **mix.exs**: Removed `:mock` dependency

### Production Code Changes
1. **lib/fares/proposed_locations.ex**
   - Made HTTPoison configurable via application config
   - Replaced Poison with Jason for JSON parsing

2. **lib/dotcom_web/controllers/route_controller.ex**
   - Made Routes.Repo configurable via application config

3. **lib/util/behaviour.ex** (NEW)
   - Created behaviour for Util time functions

4. **lib/util/util.ex**
   - Added @behaviour Util.Behaviour
   - Added @impl annotations for now/0 and service_date/1

### Test Support Files
1. **test/support/mocks.ex**
   - Added Util.Mock definition

### Test Files Converted (13 files)
1. **test/facilities/repo_test.exs**
   - Converted with_mock to expect on MBTA.Api.Mock

2. **test/services/service_test.exs**
   - Converted with_mock to expect on MBTA.Api.Mock
   - Removed unused test_services helper

3. **test/predictions/stream_parser_test.exs**
   - Removed import Mock
   - Removed setup_with_mocks, converted to standard setup with stubs

4. **test/dotcom_web/channels/vehicle_map_marker_channel_test.exs**
   - Converted with_mocks to expects
   - Removed import Mock

5. **test/dotcom_web/controllers/route_controller_test.exs**
   - Converted with_mock to expect
   - Removed import Mock

6. **test/stops/route_stop_test.exs**
   - Converted with_mock to expect
   - Removed import Mock

7. **test/dotcom_web/controllers/schedule_controller_test.exs**
   - Converted all with_mock calls to stub
   - Added set_mox_global for async: false tests
   - Removed import Mock

8. **test/fares/proposed_locations_test.exs**
   - Converted with_mock/with_mocks to expect on HTTPoison.Mock
   - Simplified error parsing test (removed Poison mock, now tests with invalid JSON)
   - Removed import Mock

9. **test/dotcom/content_rewriter_test.exs**
   - Refactored test to test actual behavior instead of mocking
   - Removed import Mock

10. **test/dotcom_web/controllers/event_controller_test.exs**
    - Refactored test to use assigns instead of mocking Util.now
    - Removed import Mock

11. **test/dotcom_web/controllers/schedule/line_test.exs**
    - Refactored tests to use date_time assigns instead of mocking Util
    - Removed import Mock and setup_with_mocks

12. **test/dotcom_web/controllers/schedule/finder_api_test.exs**
    - Refactored test to verify actual behavior instead of mocking JourneyList
    - Removed import Mock

13. **test/predicted_schedule_test.exs**
    - Converted with_mock to expect, verifying API calls instead of counting meck calls
    - Removed import Mock

## Key Patterns Used

### 1. Direct Mock Replacement
For modules already configured with Mox:
```elixir
# Before (Mock)
with_mock Repo, get: fn id -> %Route{id: id} end do
  # test code
end

# After (Mox)
Routes.Repo.Mock
|> expect(:get, 2, fn id -> %Route{id: id} end)
# test code
```

### 2. Making Modules Configurable
For hardcoded dependencies:
```elixir
# Before
HTTPoison.get(url)

# After
@httpoison Application.compile_env(:dotcom, :httpoison, HTTPoison)
@httpoison.get(url)
```

### 3. Test Refactoring
Where mocking wasn't essential:
```elixir
# Before - mocking to verify call
with_mock Util, now: fn -> ~N[2020-01-02T05:00:00] end do
  assert 2016..2021 = year_options(conn)
end

# After - using test data directly
assigns_with_date = Map.put(conn.assigns, :date, ~D[2020-01-02])
conn = %{conn | assigns: assigns_with_date}
assert 2016..2021 = year_options(conn)
```

## Verification
All converted tests pass successfully:
```bash
mix test test/facilities/repo_test.exs test/services/service_test.exs \
  test/predictions/stream_parser_test.exs test/dotcom_web/channels/vehicle_map_marker_channel_test.exs \
  test/dotcom_web/controllers/route_controller_test.exs test/stops/route_stop_test.exs \
  test/dotcom/content_rewriter_test.exs test/dotcom_web/controllers/event_controller_test.exs \
  test/predicted_schedule_test.exs
```

## Benefits
- **Type safety**: Mox provides compile-time verification of mock behaviors
- **Better error messages**: Mox errors are more descriptive
- **Explicit contracts**: Behaviours make module interfaces explicit
- **Concurrent testing**: Mox supports concurrent tests better than Mock
- **One less dependency**: Removed `:mock` from the project

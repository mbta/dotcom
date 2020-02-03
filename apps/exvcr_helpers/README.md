# ExVCRHelpers

Adds a `test_vcr` helper macro that automates the boilerplate setup necessary to use ExVCR.

`test_vcr` is meant to be a dropin replacement for the regular `test` macro. To use, `use ExVCRHelpers` in your test file, and replace the call to `test` in question with a call to `test_vcr`.

`test_vcr` works by generating a cassette filename automatically from the test name. Thus, if you change the test name, you'll also need to record a new cassette.

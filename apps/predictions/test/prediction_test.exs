defmodule Prediction.Test do
  use ExUnit.Case
  import Predictions.Prediction
  alias Predictions.Prediction

  test "is_skipped_or_cancelled?/1 indicates appropriate schedule_relationship" do
    assert is_skipped_or_cancelled?(%Prediction{schedule_relationship: :skipped})
    assert is_skipped_or_cancelled?(%Prediction{schedule_relationship: :cancelled})
    refute is_skipped_or_cancelled?(%Prediction{schedule_relationship: :added})
    refute is_skipped_or_cancelled?(%Prediction{schedule_relationship: nil})
    refute is_skipped_or_cancelled?(%Prediction{schedule_relationship: :no_data})
    refute is_skipped_or_cancelled?(%Prediction{schedule_relationship: :unscheduled})
  end
end

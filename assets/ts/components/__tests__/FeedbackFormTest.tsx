import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedbackForm from "../FeedbackForm";

const promptText = "Do you enjoy this component?";
const upLabel = "Love it";
const downLabel = "Hate it";
const commentPromptText = "Tell us how you really feel";
const commentLabel = "What do you mean by that";
const commentPlaceholder = "Be as descriptive as necessary";
describe("FeedbackForm", () => {
  beforeEach(() => {
    render(
      <FeedbackForm
        promptText={promptText}
        upLabel={upLabel}
        downLabel={downLabel}
        commentPromptText={commentPromptText}
        commentLabel={commentLabel}
        commentPlaceholder={commentPlaceholder}
        formDataCallback={jest.fn()}
      />
    );
  });

  test("upvotes", () => {
    expect(screen.getByRole("form")).toHaveFormValues({ feedback_vote: "" });
    const upBtn = screen.getByRole("button", { name: "Love it" });
    expect(screen.getByText(promptText)).toBeInTheDocument();
    upBtn.click();
    expect(screen.queryByText(promptText)).toBeNull();
    expect(screen.getByText("Thanks for your response!")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveFormValues({ feedback_vote: "up" });
  });

  test("downvotes", () => {
    expect(screen.getByRole("form")).toHaveFormValues({ feedback_vote: "" });
    const downBtn = screen.getByRole("button", { name: "Hate it" });
    expect(screen.getByText(promptText)).toBeInTheDocument();
    downBtn.click();
    expect(screen.queryByText(promptText)).toBeNull();
    expect(screen.getByText("Thanks for your response!")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveFormValues({
      feedback_vote: "down"
    });
  });

  test("switches votes", () => {
    expect(screen.getByRole("form")).toHaveFormValues({ feedback_vote: "" });
    screen.getByRole("button", { name: "Love it" }).click();
    expect(screen.getByRole("form")).toHaveFormValues({ feedback_vote: "up" });
    screen.getByRole("button", { name: "Hate it" }).click();
    expect(screen.getByRole("form")).toHaveFormValues({
      feedback_vote: "down"
    });
  });

  test("toggles vote", () => {
    [
      ["Love it", "up"],
      ["Hate it", "down"]
    ].forEach(([name, expectedValue]) => {
      expect(screen.getByRole("form")).toHaveFormValues({ feedback_vote: "" });
      const voteBtn = screen.getByRole("button", { name });
      voteBtn.click();
      expect(screen.getByRole("form")).toHaveFormValues({
        feedback_vote: expectedValue
      });
      voteBtn.click();
      expect(screen.getByRole("form")).toHaveFormValues({ feedback_vote: "" });
    });
  });

  test("shows a textbox on downvote + confirm", () => {
    const downBtn = screen.getByRole("button", { name: "Hate it" });
    expect(screen.queryByText(commentPromptText)).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    downBtn.click();
    expect(screen.queryByText(commentPromptText)).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    screen.queryByText(commentPromptText)?.click();
    expect(screen.queryByRole("textbox")).toBeInTheDocument();
  });

  test("cancels the comment", () => {
    const downBtn = screen.getByRole("button", { name: "Hate it" });
    downBtn.click();
    screen.queryByText(commentPromptText)?.click();
    const commentBox = screen.getByRole("textbox");
    fireEvent.change(commentBox, {
      target: { value: "This comment won't be submitted" }
    });
    screen.getByText("Cancel").click();
    expect(commentBox).not.toBeInTheDocument();
    // selected button is still pressed
    expect(
      screen.getByRole("button", { name: "Hate it", pressed: true })
    ).toBeInTheDocument();
  });
});

test("FeedbackForm invokes callback on submit", async () => {
  let cbSpy = jest.fn();
  render(
    <FeedbackForm
      promptText={""}
      upLabel={""}
      downLabel={"Down"}
      commentPromptText={"Say more"}
      commentLabel={"Soapbox"}
      commentPlaceholder={""}
      formDataCallback={cbSpy}
    />
  );

  screen.getByRole("button", { name: "Down" }).click();
  await waitFor(() => {
    expect(cbSpy).toHaveBeenLastCalledWith({
      feedback_vote: "down"
    });
  });

  screen.getByText("Say more").click();
  const commentBox = screen.getByRole("textbox");
  fireEvent.change(commentBox, { target: { value: "some text" } });
  screen.getByText("Submit").click();
  await waitFor(() => {
    expect(cbSpy).toHaveBeenLastCalledWith({
      feedback_long: "some text",
      feedback_vote: "down"
    });
  });
});

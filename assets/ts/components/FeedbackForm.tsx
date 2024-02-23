import { uniqueId } from "lodash";
import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState
} from "react";
import renderFa from "../helpers/render-fa";

interface VoteButtonProps {
  upOrDown: "up" | "down";
  ariaLabel: string;
  onPress: Function;
  isActive?: boolean;
}
const VoteButton = ({
  upOrDown,
  ariaLabel,
  onPress,
  isActive = false
}: VoteButtonProps): ReactElement<HTMLButtonElement> => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-link"
      aria-pressed={isActive}
      aria-label={ariaLabel}
      onClick={() => onPress()}
    >
      {renderFa(
        "",
        `fa-${isActive ? "solid" : "regular"} fa-thumbs-${upOrDown}`,
        true
      )}
    </button>
  );
};

const sendFormData = (
  formEl: HTMLFormElement | null,
  callback: Function
): void => {
  if (!formEl) return;
  const formData = new FormData(formEl);
  const formJson = Object.fromEntries(formData.entries());
  callback(formJson);
};

interface FeedbackFormProps {
  promptText: string;
  upLabel: string;
  downLabel: string;
  commentPromptText: string;
  commentLabel: string;
  commentPlaceholder: string;
  formDataCallback: (formData: object) => void;
}
/**
 * A compact form featuring upvote/downvote button, optional comment submission,
 * and invocation of a callback function on submit
 */
const FeedbackForm = ({
  promptText,
  upLabel,
  downLabel,
  commentPromptText,
  commentLabel,
  commentPlaceholder,
  formDataCallback
}: FeedbackFormProps): ReactElement<HTMLElement> => {
  const [showComment, setShowComment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [hasComment, setHasComment] = useState(false);

  const upVote = (): void => {
    setVote(v => (v === "up" ? null : "up"));
    setShowComment(false);
  };
  const downVote = (): void => setVote(v => (v === "down" ? null : "down"));
  const showCommentPrompt = vote === "down";
  const toggleComment = (): void => {
    setShowComment(show => !show);
  };
  const handleTextAreaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const {
      target: { value }
    } = event;
    setHasComment(!!value && value !== "");
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    sendFormData(formRef.current, formDataCallback);
  }, [vote, formDataCallback]);

  if (showConfirmation)
    return (
      <p>Your feedback has been recorded. Thanks for helping improve the T!</p>
    );

  const commentId = uniqueId();
  return (
    <form
      ref={formRef}
      aria-label="feedback"
      method="post"
      onSubmit={(event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendFormData(event.currentTarget, formDataCallback);
        setShowComment(false);
        setShowConfirmation(true);
      }}
    >
      <div style={{ display: "inline", marginRight: ".5em" }}>
        {vote === null ? promptText : "Thanks for your response!"}
      </div>
      <div className="btn-group">
        <input type="hidden" name="feedback_vote" value={vote || ""} />
        <VoteButton
          ariaLabel={upLabel}
          upOrDown="up"
          onPress={upVote}
          isActive={vote === "up"}
        />
        <VoteButton
          ariaLabel={downLabel}
          upOrDown="down"
          onPress={downVote}
          isActive={vote === "down"}
        />
      </div>
      <span aria-live="assertive">
        {showCommentPrompt && (
          <button
            type="button"
            className="btn btn-sm btn-link"
            aria-controls={commentId}
            aria-expanded={showComment}
            aria-pressed={showComment}
            onClick={toggleComment}
          >
            {commentPromptText}
          </button>
        )}
      </span>
      {showComment && (
        <div id={commentId} className="mt-1">
          <div className="form-group">
            <label className="w-100">
              <strong>{commentLabel}</strong>
              <textarea
                name="feedback_long"
                className="form-control"
                rows={2}
                maxLength={1000}
                placeholder={commentPlaceholder}
                onChange={handleTextAreaChange}
              />
            </label>
          </div>
          <button
            className="btn btn-sm btn-primary"
            type="submit"
            disabled={!hasComment}
          >
            Submit
          </button>
          <button
            className="btn btn-sm btn-link"
            type="button"
            onClick={() => setShowComment(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

export default FeedbackForm;

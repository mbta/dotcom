import React, { ReactElement, useState } from "react";
import { caret } from "../../helpers/icon";

export const setCookie = (
  key: string,
  value: string,
  expDays: number
): void => {
  const date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${key}=${value}; ${expires}; path=/`;
};

const IEWarningContent = (): ReactElement => {
  const [expanded, setExpanded] = useState(false);

  const toggleBlockingState = (): void => {
    const aside = document.querySelector(".c-aside-content");
    if (aside) {
      aside.classList.toggle("c-modal__cover");
    }
  };

  const expand = (): void => {
    if (!expanded) {
      setExpanded(true);
      toggleBlockingState();
    }
  };

  const hideModal = (): void => {
    const modal = document.querySelector(".c-ie-warning-content");
    if (modal) {
      modal.classList.add("c-warning-hidden");
    }
  };

  const understand = (): void => {
    setCookie("show_ie_warning", "false", 20 * 365);
    toggleBlockingState();
    hideModal();
  };

  const panelBody = (): ReactElement => (
    <>
      <p>
        Your version of <strong>Internet Explorer</strong> may not be compatible
        with MBTA.com. For the best experience, we recommend using the latest
        version of one of these web browsers:
        <br />
        <a href="https://www.microsoft.com/en-us/edge">Microsoft Edge</a>,{" "}
        <a href="https://www.google.com/chrome/">Google Chrome</a>,{" "}
        <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a> or{" "}
        <a href="https://www.apple.com/safari/">Safari</a>.
      </p>
      <button type="button" className="btn" onClick={understand}>
        Ok, got it!
      </button>
    </>
  );

  const id = "ie-warning";
  const headerId = `header-${id}`;
  const panelId = `panel-${id}`;

  return (
    <div className="c-ie-warning-content">
      <div className="container">
        <div className="c-boxed">
          <h4
            className="c-ie-warning__header-class"
            tabIndex={0}
            id={headerId}
            aria-expanded={expanded}
            aria-controls={panelId}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
            onClick={expand}
            onKeyPress={expand}
          >
            <div className="c-expandable-block__header-text">
              Limited IE Browser Support
              {caret("c-expandable-block__header-caret--black", expanded)}
            </div>
          </h4>
          {expanded ? (
            <div
              className="c-expandable-block__panel"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              role="region"
              id={panelId}
              aria-labelledby={headerId}
            >
              {panelBody()}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

const IEWarning = (): ReactElement<HTMLElement> => (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  <aside
    aria-modal
    aria-label="Internet Explorer warning"
    role="dialog"
    className="c-aside-content"
    tabIndex={-1}
  >
    <IEWarningContent />
  </aside>
);

export default IEWarning;

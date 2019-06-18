import React, {
  ReactElement,
  useLayoutEffect,
  MouseEvent,
  createRef
} from "react";
import { createPortal } from "react-dom";
import createFocusTrap from "focus-trap";
import { handleReactExitKeyPress } from "../helpers/keyboard-events";
import {
  AriaLabel,
  AriaLabelledBy,
  labelOrDescribedBy
} from "../helpers/aria-props";

interface ContentProps {
  closeModal: Function;
}

type RenderCallback = (args: ContentProps) => JSX.Element;

interface Props {
  children: RenderCallback;
  closeText?: string | ReactElement<HTMLElement>;
  role?: "dialog" | "alertdialog";
  ariaLabel: AriaLabel | AriaLabelledBy;
  focusElementId?: string; // a selector string to the DOM node that will receive focus when the model is first opened
  className?: string;
  openState?: boolean;
  closeModal: Function;
}

interface ModalContentProps {
  content: RenderCallback;
  closeText: string | ReactElement<HTMLElement>;
  role: string;
  ariaLabel: AriaLabel | AriaLabelledBy;
  closeModal: Function;
  focusElementId: string;
  bodyPadding: string;
  scrollBarPadding: number;
  className?: string;
}

const ModalContent = ({
  content,
  closeText,
  closeModal,
  role,
  ariaLabel,
  focusElementId,
  bodyPadding,
  scrollBarPadding,
  className = ""
}: ModalContentProps): ReactElement<HTMLElement> => {
  useLayoutEffect(() => {
    // Activate trap and disable scroll on background body
    const trap = createFocusTrap("#modal-cover", {
      initialFocus: `#${focusElementId}`,
      clickOutsideDeactivates: true
    });
    trap.activate();

    const htmlElement = document.getElementsByTagName("html")[0];
    const bodyWrapper = document.getElementById("body-wrapper");
    if (bodyWrapper) {
      // aria-hidden for mobile devices where we want to emulate "focus" behavior
      bodyWrapper.setAttribute("aria-hidden", "true");
      htmlElement.classList.add("modal-open");
      bodyWrapper.style.paddingRight = `${scrollBarPadding}px`;
    }

    // Deactivate
    return () => {
      if (bodyWrapper) {
        bodyWrapper.setAttribute("aria-hidden", "false");
        htmlElement.classList.remove("modal-open");
        bodyWrapper.style.paddingRight = bodyPadding;
      }
      trap.deactivate();
    };
  });

  const ref = createRef<HTMLElement>();
  const onClickAway = (e: MouseEvent): void => {
    if (e.target === ref.current) closeModal();
  };

  return createPortal(
    // This does have a role
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <aside
      ref={ref}
      aria-modal
      {...labelOrDescribedBy(ariaLabel)}
      role={role}
      id="modal-cover"
      className="c-modal__cover"
      tabIndex={-1}
      onKeyDown={e => handleReactExitKeyPress(e, closeModal)}
      onClick={e => onClickAway(e)}
    >
      <div className={`c-modal ${className}`}>
        <button
          id="modal-close"
          className="btn btn-secondary c-modal__close"
          onClick={() => closeModal()}
          type="button"
        >
          {closeText}
        </button>
        <div className="c-modal__content">{content({ closeModal })}</div>
      </div>
    </aside>,
    document.body
  );
};

interface ModalWithNoScrollProps extends Props {
  priorPadding: string;
  paddingRight: number;
}

const Modal = ({
  children,
  closeText = "Close",
  role = "dialog",
  ariaLabel,
  focusElementId = "modal-close",
  priorPadding,
  paddingRight,
  className,
  openState = false,
  closeModal
}: ModalWithNoScrollProps): ReactElement<HTMLElement> | null =>
  openState ? (
    <ModalContent
      bodyPadding={priorPadding}
      scrollBarPadding={paddingRight}
      content={children}
      closeText={closeText}
      role={role}
      ariaLabel={ariaLabel}
      focusElementId={focusElementId}
      className={className}
      closeModal={closeModal}
    />
  ) : null;

// Wrap modal to account for disabling scroll bar on background body
const WrappedModal = (props: Props): ReactElement<HTMLElement> | null => {
  if (typeof document !== "undefined") {
    const bodyWrapper = document.getElementById("body-wrapper");
    const priorPadding =
      (bodyWrapper && bodyWrapper.style.paddingRight) || "0px";
    const paddingRight = bodyWrapper
      ? window.innerWidth - bodyWrapper.clientWidth
      : 0;
    return (
      <Modal
        {...props}
        priorPadding={priorPadding}
        paddingRight={paddingRight}
      />
    );
  }
  return null;
};

export default WrappedModal;

import React, {
  ReactElement,
  useState,
  MouseEvent,
  useEffect,
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

interface Props {
  triggerElement: ReactElement<HTMLElement>;
  children: ReactElement<HTMLElement>;
  closeText?: string | ReactElement<HTMLElement>;
  role?: "dialog" | "alertdialog";
  ariaLabel: AriaLabel | AriaLabelledBy;
  focusElementId?: string; // a selector string to the DOM node that will receive focus when the model is first opened
}

interface ModalTriggerProps {
  onClick: Function;
  triggerElement: ReactElement<HTMLElement>;
}

const ModalTrigger = ({
  onClick,
  triggerElement
}: ModalTriggerProps): ReactElement<HTMLElement> => (
  // This will contain a button or other element that will bubble up active events
  <div role="presentation" onClick={() => onClick()}>
    {triggerElement}
  </div>
);

interface ModalContentProps {
  content: ReactElement<HTMLElement>;
  closeText: string | ReactElement<HTMLElement>;
  role: string;
  ariaLabel: AriaLabel | AriaLabelledBy;
  closeModal: Function;
  focusElementId: string;
  bodyPadding: string;
  scrollBarPadding: number;
}

const ModalContent = ({
  content,
  closeText,
  closeModal,
  role,
  ariaLabel,
  focusElementId,
  bodyPadding,
  scrollBarPadding
}: ModalContentProps): ReactElement<HTMLElement> => {
  useEffect(() => {
    // Activate trap and disable scroll on background body
    const trap = createFocusTrap("#modal-cover", {
      initialFocus: `#${focusElementId}`,
      clickOutsideDeactivates: true
    });
    trap.activate();

    const bodyWrapper = document.getElementById("body-wrapper");
    if (bodyWrapper) {
      // aria-hidden for mobile devices where we want to emulate "focus" behavior
      bodyWrapper.setAttribute("aria-hidden", "true");
      bodyWrapper.classList.add("modal-open");
      bodyWrapper.style.paddingRight = `${scrollBarPadding}px`;
    }

    // Deactivate
    return () => {
      if (bodyWrapper) {
        bodyWrapper.setAttribute("aria-hidden", "false");
        bodyWrapper.classList.remove("modal-open");
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
      <div className="c-modal">
        <button
          id="modal-close"
          className="btn btn-secondary c-modal__close"
          onClick={() => closeModal()}
          type="button"
        >
          {closeText}
        </button>
        <div className="c-modal__content">{content}</div>
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
  triggerElement,
  closeText = "Close",
  role = "dialog",
  ariaLabel,
  focusElementId = "modal-close",
  priorPadding,
  paddingRight
}: ModalWithNoScrollProps): ReactElement<HTMLElement> => {
  const [isOpen, setVisibility] = useState(false);
  const closeModal = (): void => setVisibility(false);
  const toggleModal = (): void => setVisibility(!isOpen);

  return (
    <>
      <ModalTrigger onClick={toggleModal} triggerElement={triggerElement} />
      {isOpen ? (
        <ModalContent
          bodyPadding={priorPadding}
          scrollBarPadding={paddingRight}
          content={children}
          closeText={closeText}
          role={role}
          ariaLabel={ariaLabel}
          closeModal={closeModal}
          focusElementId={focusElementId}
        />
      ) : null}
    </>
  );
};

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

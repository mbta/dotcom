import React, {
  MouseEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef
} from "react";
import { createPortal } from "react-dom";
import { createFocusTrap } from "focus-trap";
import { handleReactExitKeyPress } from "../helpers/keyboard-events-react";
import {
  AriaLabel,
  AriaLabelledBy,
  labelOrDescribedBy
} from "../helpers/aria-props";

interface Props {
  children: ReactNode;
  closeText?: string | ReactElement<HTMLElement>;
  role?: "dialog" | "alertdialog";
  ariaLabel: AriaLabel | AriaLabelledBy;
  focusElementId?: string; // a selector string to the DOM node that will receive focus when the model is first opened
  className?: string;
  closeModal: () => void;
}

interface ModalContentProps {
  children: ReactNode;
  closeText: string | ReactElement<HTMLElement>;
  role: string;
  ariaLabel: AriaLabel | AriaLabelledBy;
  closeModal: () => void;
  focusElementId: string;
  bodyPadding: string;
  scrollBarPadding: number;
  className?: string;
}

const ModalContent = ({
  children,
  closeText,
  closeModal,
  role,
  ariaLabel,
  focusElementId,
  bodyPadding,
  scrollBarPadding,
  className = ""
}: ModalContentProps): ReactElement<HTMLElement> => {
  const asideRef = useRef<HTMLElement>(null);
  const onClickAway = (e: MouseEvent): void => {
    if (e.target === asideRef.current) closeModal();
  };

  // In Chrome (and others?), swapping out the modal content doesn't reset the
  // scroll position. Here we reset it manually whenever the content changes.
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current && scrollRef.current.scrollTo) {
      scrollRef.current.scrollTo({ top: 0 });
    }
  }, [children]);

  useLayoutEffect(() => {
    // Activate trap and disable scroll on background body
    const trap = createFocusTrap("#modal-cover", {
      initialFocus: `#${focusElementId}`,
      clickOutsideDeactivates: true,
      preventScroll: true
    });
    trap.activate();

    const bodyWrapper = document.getElementById("body-wrapper");
    if (bodyWrapper) {
      // aria-hidden for mobile devices where we want to emulate "focus" behavior
      bodyWrapper.setAttribute("aria-hidden", "true");
      document.body.classList.add("modal-open");
      bodyWrapper.style.paddingRight = `${scrollBarPadding}px`;
    }

    // Deactivate
    return () => {
      if (bodyWrapper) {
        bodyWrapper.setAttribute("aria-hidden", "false");
        document.body.classList.remove("modal-open");
        bodyWrapper.style.paddingRight = bodyPadding;
      }
      trap.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    // This does have a role
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <aside
      ref={asideRef}
      aria-modal
      {...labelOrDescribedBy(ariaLabel)}
      role={role}
      id="modal-cover"
      className="c-modal__cover"
      tabIndex={-1}
      onKeyDown={e => handleReactExitKeyPress(e, closeModal)}
      onClick={e => onClickAway(e)}
    >
      <div ref={scrollRef} className={`c-modal ${className}`}>
        <button
          id="modal-close"
          className="btn btn-secondary c-modal__close"
          onClick={() => closeModal()}
          type="button"
        >
          {closeText}
        </button>
        <div className="c-modal__content">{children}</div>
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
  closeModal
}: ModalWithNoScrollProps): ReactElement<HTMLElement> | null => (
  <ModalContent
    bodyPadding={priorPadding}
    scrollBarPadding={paddingRight}
    closeText={closeText}
    role={role}
    ariaLabel={ariaLabel}
    focusElementId={focusElementId}
    className={className}
    closeModal={closeModal}
  >
    {children}
  </ModalContent>
);

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
  /* istanbul ignore next */
  return null;
};

export default WrappedModal;

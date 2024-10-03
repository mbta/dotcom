import React, { ReactElement, useContext, useState } from "react";
import renderFa from "../../../helpers/render-fa";
import Modal from "../../../components/Modal";

const AmenityModalContext = React.createContext({
  closeModal: () => {}
});

export const AmenityModal = ({
  headerText,
  children
}: {
  headerText: string;
  children?: React.ReactNode;
}): ReactElement => {
  const elementId = headerText.toLowerCase().replace(/[ _]/g, "-");
  const { closeModal } = useContext(AmenityModalContext);
  return (
    <Modal
      className="c-amenity-modal"
      closeModal={closeModal}
      ariaLabel={{ elementId }}
    >
      <h1 id={elementId} className="h4">
        {headerText}
      </h1>
      {children}
    </Modal>
  );
};

export const AmenityLink = ({
  url,
  text
}: {
  url: string;
  text: string;
}): JSX.Element => (
  <p>
    <a href={url} className="c-call-to-action">
      {text}
    </a>
  </p>
);

export const AmenityImage = ({
  src,
  altText,
  className = "u-mt-1 u-mb-1"
}: {
  src: string;
  altText: string;
  className?: string;
}): JSX.Element => (
  <img
    className={`img-fluid ${className}`}
    src={src}
    alt={altText}
    style={{ maxHeight: "250px" }}
  />
);

const AmenityCard = ({
  headerText,
  icon,
  badge,
  modalContent,
  children
}: {
  headerText: string;
  icon: JSX.Element;
  badge?: React.ReactNode;
  modalContent?: React.ReactNode;
  children?: React.ReactNode;
}): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="c-descriptive-link justify-content-space-between"
        onClick={() => setModalOpen(true)}
        disabled={!modalContent}
      >
        <div className="c-descriptive-link__text">
          <div className="c-descriptive-link__header">
            {icon}
            <div className="c-descriptive-link__title u-mb-0">{headerText}</div>
            {badge && <div className="c-descriptive-link__badge">{badge}</div>}
          </div>
          {children && <div className="u-mt-8 hidden-sm-down">{children}</div>}
        </div>
        {modalContent && (
          <div className="c-descriptive-link__caret-wrapper">
            {renderFa("c-descriptive-link__caret", "fa-angle-right")}
          </div>
        )}
      </button>
      <AmenityModalContext.Provider
        value={{ closeModal: () => setModalOpen(false) }}
      >
        {modalOpen && modalContent}
      </AmenityModalContext.Provider>
    </>
  );
};

export default AmenityCard;

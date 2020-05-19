import React, { ReactElement } from "react";

// A simple accordion implementation, based on site_web/templates/partial/_accordion_ui
interface Props {
  id: string;
  title: string;
  children: ReactElement<HTMLElement>;
}

const Accordion = (props: Props): ReactElement<HTMLElement> => {
  const { id, title, children } = props;
  return (
    <div className="c-accordion-ui">
      <div className="panel" role="heading">
        <div className="c-accordion-ui__heading">
          <a
            className="c-accordion-ui__trigger collapsed"
            href={`#${id}-section`}
            role="button"
            aria-expanded="false"
            aria-controls={`${id}-section`}
            data-toggle="collapse"
          >
            <span className="c-accordion-ui__title" id={`${id}-title`}>
              {title}
            </span>
            <div className="c-accordion-ui__indicator">
              <span className="c-indicator__content c-indicator__content--angle" />
            </div>
          </a>
        </div>
        <div
          className="c-accordion-ui__target collapse js-focus-on-expand"
          id={`${id}-section`}
          role="region"
          aria-labelledby={`${id}-title`}
        >
          <div className="c-accordion-ui__content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

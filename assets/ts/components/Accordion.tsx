import React, { ReactElement, useState } from "react";

// A simple accordion implementation, based on site_web/templates/partial/_accordion_ui
// This attempts to mimic the usage of <ExpandableBlock />, where the contents rerender with expanded state
interface Props {
  id: string;
  title: {
    collapsed: string;
    expanded: string;
  };
  children: ReactElement<HTMLElement>;
}

export const AccordionNoJS = ({
  id,
  children
}: {
  id: string;
  children: ReactElement<HTMLElement>;
}): ReactElement<HTMLElement> => (
  <div className="c-accordion-ui">
    <div
      className="c-accordion-ui__target"
      id={`${id}-section`}
      role="region"
      aria-labelledby={`${id}-title`}
    >
      <div className="c-accordion-ui__content">{children}</div>
    </div>
  </div>
);

const Accordion = (props: Props): ReactElement<HTMLElement> => {
  const { id, title, children } = props;
  const [isExpanded, toggleExpanded] = useState(false);
  const onClick = (): void => toggleExpanded(expanded => !expanded);
  return (
    <div className="c-accordion-ui">
      <div className="panel">
        <div className="c-accordion-ui__heading" role="heading" aria-level={3}>
          <button
            className={`c-accordion-ui__trigger font-headings text-lg ${!isExpanded &&
              "collapsed"}`}
            aria-expanded={isExpanded}
            aria-controls={`${id}-section`}
            onClick={onClick}
            type="button"
          >
            <span className="c-accordion-ui__title" id={`${id}-title`}>
              {isExpanded ? title.expanded : title.collapsed}
            </span>
            <div className="c-accordion-ui__indicator">
              <span className="c-indicator__content c-indicator__content--angle" />
            </div>
          </button>
        </div>
        <div
          className="c-accordion-ui__target js-focus-on-expand"
          id={`${id}-section`}
          role="region"
          aria-labelledby={`${id}-title`}
        >
          {isExpanded && (
            <div className="c-accordion-ui__content">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

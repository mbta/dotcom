import React from "react";
import renderFa from "../helpers/render-fa";

interface DescriptiveLinkProps {
  href: string;
  title: string;
  bodyTextOrHtml: string; // might be HTML from the CMS
}

/* Since the props can be populated by running CMS content through
`Site.ContentRewriter.rewrite` this might end up using an empty string in place
of null values. So we can't do our usual undefined/null checks. This helper
function will substitute. */
const hasContent = (text: string): boolean => text !== "";

const DescriptiveLink = ({
  href,
  title,
  bodyTextOrHtml
}: DescriptiveLinkProps): JSX.Element | null => {
  const titleContent = hasContent(title) && (
    <div className="c-descriptive-link__title">{title}</div>
  );
  const bodyContent = hasContent(bodyTextOrHtml) && (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: bodyTextOrHtml }} />
  );

  if (!titleContent && !bodyContent) {
    return null;
  }

  return (
    <a className="c-descriptive-link" href={href}>
      <div className="c-descriptive-link__text">
        {titleContent}
        {bodyContent}
      </div>
      <div className="c-descriptive-link__caret-wrapper">
        {renderFa("c-descriptive-link__caret", "fa-solid fa-angle-right")}
      </div>
    </a>
  );
};

export default DescriptiveLink;

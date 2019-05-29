import React, { ReactElement } from "react";

interface Props {
  teasers: string | null;
}

const ContentTeasers = ({ teasers }: Props): ReactElement<HTMLElement> | null =>
  // eslint-disable-next-line react/no-danger
  teasers ? <div dangerouslySetInnerHTML={{ __html: teasers }} /> : null;

export default ContentTeasers;

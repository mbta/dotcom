import React, { DetailedReactHTMLElement, useEffect, useState } from "react";

// React.createElement is used as opposed to the dangerouslySetInnerHTML prop to
// make the component contents easier to parse in testing

interface Props {
  text: string;
  matchQuery?: string;
}

// React component for highlighting matching text will wrap the first substring
// matching the matchQuery in a <b></b> and return the HTML result
const MatchHighlight = ({
  text,
  matchQuery
}: Props): DetailedReactHTMLElement<{}, HTMLElement> => {
  const [childNodes, setChildNodes] = useState<
    (DetailedReactHTMLElement<{}, HTMLElement> | string)[]
  >([text]);

  useEffect(() => {
    if (matchQuery && matchQuery !== "") {
      const matched = text.match(new RegExp(matchQuery, "i"));
      if (matched && matched[0]) {
        // split text on first instance of match only
        const [precedingText, ...moreTexts] = text.split(matched[0]);
        const subsequentText = moreTexts.join(matched[0]);
        setChildNodes([
          precedingText,
          React.createElement("b", { className: "u-highlight" }, matched[0]),
          subsequentText
        ]);
      }
    } else {
      setChildNodes([text]);
    }
  }, [text, matchQuery, setChildNodes]);

  return React.createElement("span", {}, ...childNodes);
};

export default MatchHighlight;

import { createElement, ReactHTMLElement, useEffect, useState } from "react";

/**
 * If there's a banner for the mobile app present in the DOM, copy it for use
 * with React components.
 *
 * @return {JSX.Element | null} - the banner HTML, if present
 */
export default function useMobileAppBanner(): ReactHTMLElement<
  HTMLElement
> | null {
  const [banner, setBanner] = useState<ReactHTMLElement<HTMLElement> | null>(
    null
  );
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("#mobile-app-banner");
    if (el && el.style.display === "block") {
      const element = createElement("div", {
        dangerouslySetInnerHTML: { __html: el.outerHTML }
      });
      setBanner(element);
    }
  }, []);
  return banner;
}

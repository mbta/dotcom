import { KeyboardEvent as ReactKeyboardEvent } from "react";

const nextRoutePatternIndex = (
  currentId: string,
  routePatternIds: string[]
): number => {
  const index = routePatternIds.indexOf(currentId);
  return index === routePatternIds.length - 1 ? 0 : index + 1;
};

const prevRoutePatternIndex = (
  currentId: string,
  routePatternIds: string[]
): number => {
  const index = routePatternIds.indexOf(currentId);
  return index === 0 ? routePatternIds.length - 1 : index - 1;
};

export default (e: ReactKeyboardEvent, routePatternIds: string[]): void => {
  if (
    e.key !== "Tab" &&
    e.key !== "ArrowRight" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowDown" &&
    e.key !== "ArrowUp"
  )
    return;

  e.preventDefault();

  const targetEl = e.target as HTMLDivElement;
  const targetElId = targetEl.id.replace("route-pattern_", "");

  // forward
  if (
    (e.key === "Tab" && !e.shiftKey) ||
    e.key === "ArrowRight" ||
    e.key === "ArrowDown"
  ) {
    const nextIndex = nextRoutePatternIndex(targetElId, routePatternIds);
    const nextElId = `route-pattern_${routePatternIds[nextIndex]}`;
    // eslint-disable-next-line no-unused-expressions
    document.getElementById(nextElId) &&
      /* istanbul ignore next */
      document.getElementById(nextElId)!.focus();
  }

  // backwards
  if (
    (e.key === "Tab" && e.shiftKey) ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowUp"
  ) {
    const prevIndex = prevRoutePatternIndex(targetElId, routePatternIds);
    const prevElId = `route-pattern_${routePatternIds[prevIndex]}`;
    // eslint-disable-next-line no-unused-expressions
    document.getElementById(prevElId) &&
      /* istanbul ignore next */
      document.getElementById(prevElId)!.focus();
  }
};

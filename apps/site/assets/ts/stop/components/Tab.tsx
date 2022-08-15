import React, { ReactElement } from "react";
import { Tab, TabBadge } from "./__stop";
import { Dispatch, clickTabAction } from "../state";
import { handleReactEnterKeyPress } from "../../helpers/keyboard-events-react";

interface Props {
  tab: Tab;
  selected: boolean;
  dispatch: Dispatch;
}

const selectedClass = (selected: boolean): string =>
  selected ? "header-tab--selected" : "";

const BadgeComponent = (badge: TabBadge): ReactElement<HTMLElement> => (
  <div className={badge.class} aria-label={badge.aria_label}>
    {badge.content}
  </div>
);

const onClick = (id: string, dispatch: Dispatch): void => {
  dispatch(clickTabAction(id));
};

const TabComponent = ({
  tab,
  dispatch,
  selected
}: Props): ReactElement<HTMLElement> => (
  <div
    role="button"
    tabIndex={0}
    className={`
      header-tab
      header-tab--dark
      ${selectedClass(selected)}
      ${tab.class}
      ${tab.id}
    `}
    onClick={() => onClick(tab.id, dispatch)}
    onKeyPress={e =>
      handleReactEnterKeyPress(e, () => onClick(tab.id, dispatch))
    }
  >
    {tab.name}
    {tab.badge && BadgeComponent(tab.badge)}
  </div>
);

export default TabComponent;

import React, { ReactElement, useState } from "react";
import { isString } from "lodash";
import { handleReactEnterKeyPress } from "../helpers/keyboard-events-react";
import renderSvg from "../helpers/render-svg";
import renderFa from "../helpers/render-fa";
import { caret } from "../helpers/icon";

export interface ExpandableBlockHeader {
  text: string | ReactElement<HTMLElement>;
  iconSvgText: string | null;
  classOverride?: string;
}

// If dispatch is provided in Props, the block will not
// track its own state -- the parent is fully responsible
// for tracking the expanded/collapsed state.
// If dispatch is not provided, the block will
// track its own state.
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch?: React.Dispatch<any>;
  notifyExpanded?: (isExpanded: boolean) => void;
  initiallyExpanded: boolean;
  initiallyFocused?: boolean;
  header: ExpandableBlockHeader;
  children: ReactElement<HTMLElement>;
  id: string;
  panelClassName?: string;
  preventScroll?: boolean;
}

interface State {
  expanded: boolean;
  focused?: boolean;
}

export interface ClickExpandableBlockAction {
  type: "CLICK_EXPANDABLE_BLOCK";
  payload: {
    expanded: boolean;
    focused: boolean;
    id: string;
  };
}

const ExpandableBlock = (props: Props): ReactElement<HTMLElement> => {
  const {
    header: { text, iconSvgText, classOverride },
    dispatch,
    notifyExpanded,
    initiallyExpanded,
    initiallyFocused,
    children,
    id,
    panelClassName,
    preventScroll
  } = props;

  const initialState = {
    expanded: initiallyExpanded,
    focused: initiallyFocused
  };

  const action: ClickExpandableBlockAction = {
    type: "CLICK_EXPANDABLE_BLOCK",
    payload: {
      expanded: initiallyExpanded === true,
      focused: initiallyFocused === true,
      id
    }
  };

  const [hookedState, toggleExpanded] = useState(initialState);
  const { state, onClick } = dispatch
    ? {
        state: initialState,
        onClick: () => dispatch(action)
      }
    : {
        state: hookedState,
        onClick: () => {
          const expanded = !hookedState.expanded;
          toggleExpanded({ expanded, focused: true });
          if (notifyExpanded) notifyExpanded(expanded);
        }
      };
  const { expanded, focused }: State = state;
  const headerId = `header-${id}`;
  const panelId = `panel-${id}`;
  const iconHelper = iconSvgText?.slice(0, 3) !== "fa-" ? renderSvg : renderFa;
  const classOverrideString = isString(classOverride) ? classOverride : "";

  return (
    <>
      <h3
        className={`c-expandable-block__header ${classOverrideString}`}
        tabIndex={0}
        id={headerId}
        aria-expanded={expanded}
        aria-controls={panelId}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        onClick={onClick}
        onKeyPress={e => handleReactEnterKeyPress(e, onClick)}
      >
        {iconSvgText
          ? iconHelper("c-expandable-block__header-icon", iconSvgText)
          : null}
        <div className="c-expandable-block__header-text">
          {text}
          {caret("c-expandable-block__header-caret", expanded)}
        </div>
      </h3>
      {expanded ? (
        <div
          className={`c-expandable-block__panel ${panelClassName || ""}`}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          role="region"
          id={panelId}
          aria-labelledby={headerId}
          ref={panel =>
            panel &&
            focused &&
            panel.focus({
              preventScroll: !!preventScroll
            })
          }
        >
          {children}
        </div>
      ) : null}
      {/* No javascript support */}
      <noscript>
        <style>{`#${headerId} { display: none; }`}</style>
        <h3 className="c-expandable-block__header">
          {iconSvgText
            ? renderSvg("c-expandable-block__header-icon", iconSvgText)
            : null}
          {text}
          {caret("c-expandable-block__header-caret", true)}
        </h3>
        <div className="c-expandable-block__panel" role="region">
          {children}
        </div>
      </noscript>
    </>
  );
};

export default ExpandableBlock;

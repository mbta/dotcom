/* eslint-disable */
import toJson, { Json } from "enzyme-to-json";
import { ReactWrapper } from "enzyme";
import {
  IndexedRouteStop,
  StopTree
} from "../../schedule/components/__schedule";

export const testRouteStopListFromStopTree = (
  tree: StopTree
): IndexedRouteStop[] =>
  Object.values(tree.byId).map((node, index) => ({
    ...node.value,
    routeIndex: index
  }));

export const createReactRoot = (): void => {
  document.body.innerHTML =
    '<div><div id="react-root"><div id="test"></div></div></div>';
};

export const enzymeToJsonWithoutProps = (wrapper: ReactWrapper<any>): Json =>
  toJson(wrapper, {
    noKey: false,
    map: info => {
      if (!info.props) {
        return info;
      }

      // @ts-ignore is a <style></style> declaration
      if (info.node.type === "style") {
        return info;
      }
      // @ts-ignore is an element in a <noscript></noscript> declaration
      if (info.node.nodeType == undefined) {
        // @ts-ignore
        return info;
      }
      //@ts-ignore is a React component (not HTML element)
      if (info.node.nodeType.toString().includes("function")) {
        // @ts-ignore
        info.props = undefined;
      }

      return info;
    }
  });

export const toJsonEnzyme = (wrapper: ReactWrapper<any>): Json =>
  toJson(wrapper, {
    noKey: false
  });

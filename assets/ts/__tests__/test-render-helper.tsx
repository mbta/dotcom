import React, { PropsWithChildren } from "react";
import {
  StoreProps,
  scheduleStoreReducer
} from "../schedule/store/ScheduleStore";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Store, createStore } from "redux";

// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions {
  preloadedState?: Partial<StoreProps>;
  store?: Store;
}

const partialToStoreProps = (
  preloadedState: Partial<StoreProps>
): StoreProps => {
  return {
    selectedDirection: preloadedState.selectedDirection
      ? preloadedState.selectedDirection
      : 0,
    selectedOrigin: preloadedState.selectedOrigin
      ? preloadedState.selectedOrigin
      : "",
    modalOpen: !!preloadedState.modalOpen,
    modalMode: preloadedState.modalMode ? preloadedState.modalMode : "schedule"
  };
};

export const createScheduleStoreFromPartial = (
  partialState: Partial<StoreProps>
): Store => {
  const {
    selectedDirection,
    selectedOrigin,
    modalOpen,
    modalMode
  } = partialToStoreProps(partialState);
  return createStore(scheduleStoreReducer, {
    selectedDirection,
    selectedOrigin,
    modalOpen,
    modalMode
  });
};

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = createScheduleStoreFromPartial(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren<React.ReactNode>) => {
    return <Provider store={store}>{children}</Provider>;
  };

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
}

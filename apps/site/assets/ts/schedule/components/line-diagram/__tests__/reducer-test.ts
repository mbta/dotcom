import {
  lineDiagramReducer,
  LineDiagramStateAction,
  LineDiagramState
} from "../reducer";

const initialState: LineDiagramState = {
  direction: 0,
  origin: null,
  modalMode: "origin",
  modalOpen: false
};

it("lineDiagramReducer handles 'initialize'", () => {
  const action: LineDiagramStateAction = {
    type: "initialize",
    direction: 0,
    origin: "place-sstat"
  };
  expect(lineDiagramReducer(initialState, action)).toEqual({
    direction: 0,
    origin: "place-sstat",
    modalMode: "schedule",
    modalOpen: true
  });
});

it("lineDiagramReducer handles 'set_direction'", () => {
  const action: LineDiagramStateAction = {
    type: "set_direction",
    direction: 1
  };
  const finalState = {};
  expect(lineDiagramReducer(initialState, action)).toEqual({
    direction: 1,
    origin: null,
    modalMode: "origin",
    modalOpen: false
  });
});

it("lineDiagramReducer handles 'set_origin' with origin", () => {
  const action: LineDiagramStateAction = {
    type: "set_origin",
    origin: "place-north"
  };
  expect(lineDiagramReducer(initialState, action)).toEqual({
    direction: 0,
    origin: "place-north",
    modalMode: "schedule",
    modalOpen: false
  });
});

it("lineDiagramReducer handles 'set_origin' without origin", () => {
  const action: LineDiagramStateAction = { type: "set_origin", origin: null };
  expect(lineDiagramReducer(initialState, action)).toEqual({
    direction: 0,
    origin: null,
    modalMode: "origin",
    modalOpen: false
  });
});

it("lineDiagramReducer handles 'toggle_modal'", () => {
  const action: LineDiagramStateAction = {
    type: "toggle_modal",
    modalOpen: true
  };
  const finalState = {};
  expect(lineDiagramReducer(initialState, action)).toEqual({
    direction: 0,
    origin: null,
    modalMode: "origin",
    modalOpen: true
  });
});

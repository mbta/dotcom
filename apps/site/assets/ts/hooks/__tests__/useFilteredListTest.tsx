import React from "react";
import useFilteredList from "../useFilteredList";
import { mount, ReactWrapper } from "enzyme";

const stringList = ["Red", "Orange", "Green", "Blue", "Purple"];
const objectList = [
  { id: "a", stop: { name: "Origin" } },
  { id: "b", stop: { name: "Stop" } },
  { id: "c", stop: { name: "Destination" } }
];

// React Hooks can only be invoked inside React functional components.
// Create a placeholder component here for testing purposes
const HookWrapper = (props: { hook: () => any }): any => {
  const hook = props.hook ? props.hook() : undefined;
  return React.createElement("div", { hook: hook }, null);
};

describe("useFilteredList", () => {
  let hook: any;
  let listQuery: string,
    setListQuery: React.Dispatch<React.SetStateAction<string>>,
    filteredList: (string | object)[];

  describe.each`
    inputType    | inputList     | objectKey      | query            | filteredResult
    ${"strings"} | ${stringList} | ${null}        | ${"Red"}         | ${["Red"]}
    ${"strings"} | ${stringList} | ${"fake"}      | ${"Red"}         | ${["Red"]}
    ${"objects"} | ${objectList} | ${null}        | ${"Destination"} | ${objectList}
    ${"objects"} | ${objectList} | ${"stop.name"} | ${"Destination"} | ${objectList.filter(obj => obj.stop.name === "Destination")}
  `(
    "on list of $inputType with object key $objectKey",
    ({ inputList, objectKey, query, filteredResult }) => {
      let wrapper: ReactWrapper;

      beforeEach(() => {
        if (objectKey) {
          wrapper = mount(
            <HookWrapper hook={() => useFilteredList(inputList, objectKey)} />
          );
        } else {
          wrapper = mount(
            <HookWrapper hook={() => useFilteredList(inputList)} />
          );
        }
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it("initializes", () => {
        [listQuery, setListQuery, filteredList] = wrapper
          .find("div")
          .prop("hook");
        expect(listQuery).toEqual("");
        expect(filteredList).toEqual(inputList);
        expect(setListQuery).toEqual(expect.any(Function));
      });

      it("should filter list with query", () => {
        [listQuery, setListQuery, filteredList] = wrapper
          .find("div")
          .prop("hook");

        setListQuery(query);
        wrapper.setProps({}); // actually updates the wrapper
        [listQuery, setListQuery, filteredList] = wrapper
          .find("div")
          .prop("hook");

        expect(listQuery).toEqual(query);
        expect(filteredList).toEqual(filteredResult);
      });

      it("should not filter list with no query", () => {
        [listQuery, setListQuery, filteredList] = wrapper
          .find("div")
          .prop("hook");

        setListQuery("");
        wrapper.setProps({}); // actually updates the wrapper
        [listQuery, setListQuery, filteredList] = wrapper
          .find("div")
          .prop("hook");

        expect(listQuery).toEqual("");
        expect(filteredList).toEqual(inputList);
      });
    }
  );
});

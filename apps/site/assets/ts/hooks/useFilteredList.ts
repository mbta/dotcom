import { get } from "lodash";
import { useState, useEffect } from "react";

// React hook for filtering lists via case-insensitive text matching. takes a
// list and a key. Key can use any path supported by
// https://lodash.com/docs/4.17.15#get e.g. 'route_stop.name'
const useFilteredList = (
  list: (string | object)[],
  key: string = ""
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (string | object)[]
] => {
  const [filteredList, setFilteredList] = useState([...list]);
  const [listQuery, setListQuery] = useState("");

  useEffect(
    () => {
      const results = [...list].filter(item => {
        const string = get(item, key, item);
        if (typeof string !== "string") {
          return true;
        }
        return string.toLowerCase().includes(listQuery.toLowerCase());
      });
      setFilteredList(results);
    },
    [list, key, listQuery, setFilteredList]
  );

  return [listQuery, setListQuery, filteredList];
};

export default useFilteredList;

import { useEffect, useState } from "react";

const useUrlSearchParams = (): URLSearchParams | null => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  const searchString = window.location.search;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSearchParams(urlParams);
  }, [searchString]);

  return searchParams;
};

export default useUrlSearchParams;

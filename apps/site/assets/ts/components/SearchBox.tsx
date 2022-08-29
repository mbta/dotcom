import React, { ReactElement, useState, useEffect } from "react";
import { searchIcon } from "../helpers/icon";

interface Props {
  id: string;
  labelText: string;
  onChange: (q: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBox = ({
  id,
  labelText,
  onChange,
  placeholder,
  className
}: Props): ReactElement<HTMLElement> | null => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onChange(query);
  }, [query, onChange]);

  return (
    <div className={`${className} c-form__input-container`}>
      <label htmlFor={id} className="visually-hidden">
        {labelText}
      </label>
      <input
        className="c-form__input"
        id={id}
        type="text"
        onChange={event => {
          setQuery(event.target.value);
        }}
        value={query}
        placeholder={placeholder || labelText}
      />
      {query !== "" && (
        <button
          className="c-form__reset-btn btn-link"
          aria-label="reset"
          type="button"
          onClick={() => {
            setQuery("");
          }}
        >
          <i
            aria-hidden="true"
            className="c-form__reset-icon fa fa-times-circle"
          />
        </button>
      )}
      <button
        className="c-form__submit-btn"
        aria-label="search"
        type="button"
        onClick={() => {
          setQuery(query);
        }}
      >
        {searchIcon("c-svg__icon-search-reverse-default")}
      </button>
    </div>
  );
};

export default SearchBox;

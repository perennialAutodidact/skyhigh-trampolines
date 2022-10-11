import React, { useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import usePlacesAutocomplete from "use-places-autocomplete";
import styles from "./AddressSearchInput.module.scss";

const AddressSearchInput = ({ formOnChange, setFormValue }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  let autoCompleteRef = useRef(null);
  useOnClickOutside(autoCompleteRef, () => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    console.log(e.target.value);
    setValue(e.target.value);
    formOnChange(e.target.value);
  };
  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      console.log(description);
      setValue(description, false);
      formOnChange(description);
      clearSuggestions();
    };
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={`list-group-item ${styles.suggestionListItem}`}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      );
    });
  return (
    <div ref={autoCompleteRef} className="row mb-3 position-relative">
      <label htmlFor="address" className="form-label p-0">
        Address <span className="text-danger">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        className="form-control"
      />
      {status === "OK" && (
        <div className="position-absolute list-group top-100 p-0">
          {renderSuggestions()}
        </div>
      )}
    </div>
  );
};

export default AddressSearchInput;

import React, { useRef } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import usePlacesAutocomplete from "use-places-autocomplete";

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
    setValue(e.target.value);
  };
  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();
    };
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <div ref={autoCompleteRef} className="row mb-3">
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`}
      ></script>
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
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default AddressSearchInput;

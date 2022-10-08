import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { loadScript, handleScriptLoad } from "./utils";

const AutoAddressInput = () => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  let isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`,
        handleScriptLoad
      );
    }
  }, [isFirstRender]);
  return <input type="text" ref={autoCompleteRef} />;
};

export default AutoAddressInput;

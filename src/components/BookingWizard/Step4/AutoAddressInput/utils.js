export const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (["loaded", "completed"].includes(script.readyState)) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.querySelector("head").appendChild(script);
};
export const handlePlaceSelect = async (updateQuery, autoComplete) => {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
};
export const handleScriptLoad = (updateQuery, autoCompleteRef) => {
  if (!autoCompleteRef?.current) return;

  const autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["cities"] }
  );

  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery, autoComplete)
  );
};

import React, { useState, useEffect, TextField } from "react";
import Autocomplete from '@mui/material/Autocomplete'


const AddLocation = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let active = true;

    if (!inputValue) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&addressdetails=1`
      );
      const data = await response.json();

      if (active) {
        setOptions(
          data.map(({ display_name, lat, lon, address }) => ({
            display_name,
            latitude: lat,
            longitude: lon,
            city: address.town || address.city || address.county,
          }))
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [inputValue]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.display_name}
      onChange={(event, newValue) => {
        setInputValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Address"
          variant="outlined"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      )}
    />
  );
};

export default AddLocation;
import React from "react";
import { TextField } from "@mui/material";

export const Test = () => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Enter your text"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
      />
      <p>Input value: {inputValue}</p>
    </div>
  );
};

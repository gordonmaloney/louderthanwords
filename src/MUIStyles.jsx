export const BtnStyle = {
    fontSize: 'large',
  fontFamily: "Fjalla One",
  borderRadius: "10px",
  color: "#FFF1D0",
  backgroundColor: "#5A788B",
  "&:hover, &:active": { backgroundColor: "#FFF1D0", color: "#5A788B" },
};


export const TextFieldStyle = {
  marginTop: "8px",
  "& label.Mui-focused": {
    color: "#537A8B",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#537A8B",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "#537A8B",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#537A8B",
    },
    "& .MuiSelect-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#537A8B",
      },
    },
  },
};
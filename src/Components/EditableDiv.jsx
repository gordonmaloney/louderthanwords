import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import DOMPurify from "dompurify";

const TextFieldStyle = {
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
  
const EditableDiv = ({
  substrings,
  label,
  body,
  onBodyChange,
  cursorPosition,
  updateCursorPosition,
}) => {
  const [text, setText] = useState(body);
  const [highlightedText, setHighlightedText] = useState("");
  const [storedCursorPosition, setStoredCursorPosition] = useState(null);

  const textFieldRef = useRef(null);
  const inputRef = useRef(null);
  const divRef = useRef(null);

  const handleTextFieldChange = (e) => {
    const newBody = e.target.value;
    const position = inputRef.current.selectionStart;
    updateCursorPosition(position);
    setText(newBody);
    onBodyChange(newBody);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = inputRef.current;
      const newValue =
        value.substring(0, selectionStart) +
        "\n" +
        value.substring(selectionEnd);
      setText(newValue);
      onBodyChange(newValue);
      updateCursorPosition(selectionStart + 1);
    }
  };

  const handleTextFieldScroll = (e) => {
    divRef.current.scrollTop = e.target.scrollTop;
  };

  const handleDivScroll = (e) => {
    textFieldRef.current.firstChild.scrollTop = e.target.scrollTop;
  };

  useEffect(() => {
    if (inputRef.current && cursorPosition !== null) {
      setStoredCursorPosition(cursorPosition);
    }
  }, [cursorPosition]);

  useEffect(() => {
    if (inputRef.current && storedCursorPosition !== null) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        storedCursorPosition,
        storedCursorPosition
      );
    }
  }, [storedCursorPosition]);

  useEffect(() => {
    highlightSubstrings(body);
  }, [body]);

  useEffect(() => {
    if (textFieldRef.current && divRef.current) {
      textFieldRef.current.firstChild.addEventListener(
        "scroll",
        handleTextFieldScroll
      );
      divRef.current.addEventListener("scroll", handleDivScroll);
    }

    return () => {
      if (textFieldRef.current && divRef.current) {
        textFieldRef.current.firstChild.removeEventListener(
          "scroll",
          handleTextFieldScroll
        );
        divRef.current.removeEventListener("scroll", handleDivScroll);
      }
    };
  }, []);

  const highlightSubstrings = (text) => {
    let updatedHighlightedText = text || "";
    substrings.forEach((substring) => {
      const regex = new RegExp(substring, "gi");
      updatedHighlightedText = updatedHighlightedText.replace(
        regex,
        `<span class="fadeHighlight">${substring}</span>`
      );
    });
    setHighlightedText(updatedHighlightedText);
  };

  return (
    <div>
      <div
        style={{
          marginTop: "10px",
          border: "1px solid rgba(0, 0, 0, 0.3)",
          padding: "10px",
          position: "relative",
          borderRadius: "4px",
        }}
        className="editableDivBox"
      >
        <label
          htmlFor="editableDiv"
          style={{
            position: "absolute",
            top: "-10px",
            left: "10px",
            background: "#fff",
            paddingLeft: "5px",
            paddingRight: "5px",
            fontSize: "0.75rem",
            fontFamily: "Roboto",
            color: "rgba(0, 0, 0, 0.54)",
            letterSpacing: "0.00938em",
          }}
        >
          {label}
        </label>
        <TextField
          ref={textFieldRef}
          value={text}
          onChange={handleTextFieldChange}
          onKeyDown={handleKeyDown}
          fullWidth
          multiline
          inputRef={inputRef}
          style={{ position: "absolute", top: 0, left: 0, opacity: 0.2, height: '220px' }}
        />
        <div
          ref={divRef}
          style={{
            outline: "0px solid transparent",
            color: "black",
            fontFamily: "Roboto",
            padding: "5px",
            minHeight: "200px",
            height: "auto",
            whiteSpace: "pre-wrap",
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlightedText || "") }}
        />
      </div>
    </div>
  );
};

export default React.memo(EditableDiv);

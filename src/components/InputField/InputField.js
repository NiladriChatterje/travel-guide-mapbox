import React from "react";
import "./InputField.css";
import useInput from "../../hooks/useInput";

const InputField = ({setViewState,setIsInputfieldActive}) => {
  const [suggestionText,setSuggestionText] =React.useState(()=>'Search Here...')
  const address = useInput("");


  return (
    <div className="Wrapper">
      <input className="Input"
        placeholder="Search Here...."
        {...address}
        isTyping={address.value !== ""}
      />
      {address.suggestions?.length > 0 && (
        <div className="SuggestionWrapper">
          {address.suggestions.map((suggestion, index) => {
            return (
              <div className="Suggestions"
                key={index}
                onClick={() => {
                  address.setValue(suggestion.place_name);
                  setIsInputfieldActive(true);
                  //setSuggestionText(Array.from(document.getElementsByClassName('Input')[0].textContent));
                  setViewState({latitude:suggestion.center[1],longitude:suggestion.center[0]})
                  address.setSuggestions([]);
                }}
              >
                {suggestion.place_name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InputField;


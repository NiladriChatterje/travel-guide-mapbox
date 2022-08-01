import { useCallback, useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(() => initialValue);
  const [suggestions,setSuggestions] =useState(()=> ([]));

  const handleChange = async (event) => {
    setValue(event.target.value);
    try {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1IjoibmlsYWRyaTIwMDAiLCJhIjoiY2w1cDU3Y2N1MDQ4cDNsbnFqN3hiMm1mNyJ9.M5eDdS0HFPq4HvHBj3ktLQ&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();
      console.log(response);
      setSuggestions(results?.features);
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

 const debounce = (func) =>{
  let timer;
  return function(...args){
    const context = this;
    if(timer) clearTimeout(timer);
    timer =setTimeout(()=>{
      timer = null;
      func.apply(context,args);
    },3000);
  }
 }

 const optimisedHandleChange=useCallback(debounce(handleChange),[])

  return {
    onChange: optimisedHandleChange,
    setValue,
    suggestions,
    setSuggestions
  };
};

export default useInput;
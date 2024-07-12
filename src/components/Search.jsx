import { useState, useEffect } from "react";
import Fetch from "./Fetch";
export default function Search({wordData,setWordData}) {
  const [word, setWord] = useState("");
  
  var loaded = false;

  const api =
    "https://api.dictionaryapi.dev/api/v2/entries/en/hellohttps://api.dictionaryapi.dev/api/v2/entries/en/";
  useEffect(() => {}, []);
  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();
      setWordData(data);
      console.log(data);
      console.log(data.message);

    } catch (err) {
      console.log(err.message);
     
    }
  };
  function checkResponse(data) {
    if (data) {
      loaded = false;
      return <div className="App">{word}</div>;
    } else {
      return null;
    }
  }
  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word..."
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
      {/* {checkResponse(data)} */}
      
    </div>
  );
}

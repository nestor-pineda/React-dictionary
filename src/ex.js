import * as axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [wordSearch, setWordSearch] = useState("");
  const [wordChosen, setWordChosen] = useState(false);
  const [word, setWord] = useState({
    word: "",
  });

  const searchingWords = () => {
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`).then((res) => {
      setWord({
        word: word,
      });
      setWordChosen(true);
    });
  };

  return (
    <div className="App">
      <div className="search-box">
        <h1>Word Definition</h1>
        <input
          type="text"
          onChange={(event) => {
            setWordSearch(event.target.value);
          }}
        />
        <button onClick={searchingWords}>Search Now!</button>
      </div>
      <div className="display-section">
        {word.word}
        {/* {!wordChosen ? <h1>Please type a word</h1> : <h1>{word.word}</h1>} */}
      </div>
    </div>
  );
}

export default App;

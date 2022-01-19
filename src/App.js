import "./App.css";
import { useState } from "react";
import Axios from "axios";
const App = () => {
  const [wordName, setWordName] = useState("");
  const [wordChosen, setWordChosen] = useState(false);
  const [word, setWord] = useState({
    name: "",
    phonetic: "",
    audio: "",
    origin: "",
    definition: "",
    example: "",
  });

  const searchword = () => {
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordName}`).then((res) => {
      setWord({
        name: wordName,
        phonetic: res.data[0].phonetic,
        audio: res.data[0].phonetics[0].audio,
        origin: res.data[0].origin,
        definition: res.data[0].meanings[0].definitions[0].definition,
        example: res.data[0].meanings[0].definitions[0].example,
      });
      setWordChosen(true);
      console.log(res.data[0]);
    });
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Word Search Dictionary</h1>
        <input
          type="text"
          onChange={(event) => {
            setWordName(event.target.value);
          }}
          value={wordName.toLowerCase()}
        />
        <div>{wordName && <button onClick={searchword}>Search Word</button>}</div>
      </div>
      <div className="DisplaySection">
        {!wordChosen ? (
          <h1> Please type a word </h1>
        ) : (
          <>
            <h1>{word.name}</h1>
            <h3>Number: #{word.phonetic}</h3>
            <p>Definition: {word.definition}</p>
            <p>Example: {word.example}</p>
            <p>Origin: {word.origin}</p>
            <p>{word.audio}</p>
          </>
        )}
      </div>
    </div>
  );
};
export default App;

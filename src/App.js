import { useState } from "react";
import Axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import "./App.scss";

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
    synonyms: [],
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
        synonyms: res.data[0].meanings[0].definitions[0].synonyms,
      });
      setWordChosen(true);
      console.log(res.data[0]);
    });
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1 className="title">Word Search Dictionary</h1>
        <input
          type="text"
          onChange={(event) => {
            setWordName(event.target.value);
          }}
          value={wordName.toLowerCase()}
        />
        <div>
          {wordName && (
            <button className="search" onClick={searchword}>
              Search Word
            </button>
          )}
        </div>
      </div>
      <div className="DisplaySection">
        {!wordChosen ? (
          <h1> Please type a word </h1>
        ) : (
          <>
            <h2 className="word">{word.name}</h2>
            <p className="result-text">
              <span className="result-title">Definition: </span>
              {word.definition}
            </p>
            <p className="result-text">
              <span className="result-title">Example: </span>
              {word.example}
            </p>
            <p className="result-text">
              <span className="result-title">Origin: </span>
              {word.origin}
            </p>
            <p className="result-text">
              <span className="result-title">Phonetic: </span>
              {word.phonetic}
            </p>

            <ReactAudioPlayer src={word.audio} controls />

            <div>
              <p>Synonyms:</p>
              {word.synonyms.map((item) => {
                return (
                  <div key={item}>
                    <h4>{item},</h4>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default App;

import back from "../assets/back.svg";
import bookmark from "../assets/bookmark.svg";
import addbook from "../assets/add-book.svg";
import { Audio } from "react-loader-spinner";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./definition.module.css";
import play from "../assets/play.svg";
export default function Definition({ bookmarks, addBookmark, removeBookmark }) {
  const { word } = useParams();
  const navigate = useNavigate();
  const [definitions, setDefinitions] = useState([]);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  const isBookmarked = Object.keys(bookmarks).includes(word);
  useEffect(() => {
    const fetchDefinition = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        if (!res.ok) {
          throw new Error("Word not found");
        }
        const data = await res.json();
        console.log("API Response:", data);

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Word not found");
        }

        setDefinitions(data);
        const phonetics = data[0].phonetics;
        if (phonetics.length && phonetics[0].audio) {
          audioRef.current = new window.Audio(phonetics[0].audio);
          // setAudio(new Audio(url));
        } else {
          audioRef.current = null;
        }
      } catch (err) {
        setError(true);

        console.error("Error fetching definition:", err);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchDefinition();
  }, [word]);

  if (loading)
    return (
      <div className={styles.loader}>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );

  if (error) {
    return (
      <div className={styles.errormess}>
        <div className={styles.message}>Sorry, word not found</div>
        <button className={styles.goback} onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.box}>
      <div className={styles.top}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          <img src={back} alt="back-btn" />
        </button>
        <button
          className={styles.bookmark}
          onClick={() =>
            isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)
          }
        >
          {isBookmarked ? (
            <img src={bookmark} alt="bookmark-page" />
          ) : (
            <img src={addbook} alt="bookadd" />
          )}
        </button>
      </div>
      <div className={styles.header}>
        <h1 className={styles.word}>{word}</h1>
        {audioRef.current && (
          <button
            className={styles.play}
            onClick={() => audioRef.current.play()}
          >
            <img src={play} alt="play-btn" />
          </button>
        )}
      </div>

      {definitions.map((def, idx) => (
        <div key={idx} className={styles.container}>
          {def.meanings.map((meaning) => (
            <div key={meaning.partOfSpeech} className={styles.wrap}>
              <div className={styles.type}>{meaning.partOfSpeech}</div>
              {meaning.definitions.map((definition, idx) => (
                <div key={definition.definition} className={styles.meaning}>
                  {meaning.definitions.length > 1 && `${idx + 1}.`}
                  {"   "}
                  {definition.definition}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

import logo from "../assets/logo_dictionary.svg";
import search from "../assets/search.svg";
import save from "../assets/add-book.svg";
import styles from "./home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [word, setWord] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord || trimmedWord.split(" ").length > 1) return;
    navigate(`/definition/${trimmedWord}`)
  };
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" className={styles.logo} />
      <h2 className={styles.heading}>Dictionary</h2>
      <p className={styles.desc}>Find meanings and save if you want!</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.searchbar}>
          <input
            type="text"
            placeholder="Enter a word "
            className={styles.word}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button className={styles.search} >
            <img src={search} alt="search" />
          </button>
        </div>
      </form>
      <button className={styles.save} onClick={() => navigate("/bookmark")}>
        <img src={save} alt="save-word" />
      </button>
    </div>
  );
}

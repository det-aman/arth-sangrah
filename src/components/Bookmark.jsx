import styles from "./bookmark.module.css";
import back from "../assets/back.svg";
import { useNavigate } from "react-router-dom";
export default function Bookmark({bookmarks}) {
    const navigate= useNavigate()
  return (
    <div className={styles.container}>
    <div className={styles.top}>
      <button className={styles.back} onClick={() => navigate(-1)}>
          <img src={back} alt="back-btn" />
        </button>
      <div className={styles.title}>Bookmarks</div>
    </div>
    
        {!! Object.keys(bookmarks).length ? Object.keys(bookmarks).map(mark=>
            <div key={Math.random} className={styles.wrap} onClick={() => navigate(`/definition/${mark.toLowerCase()}`)}>{mark}</div>
        ) : <div className={styles.wrap}>No Bookmarks!</div>}

    </div>
  );
}

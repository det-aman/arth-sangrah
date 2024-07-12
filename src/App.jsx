import Search from "./components/Search";
import Fetch from "./components/Fetch";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home.jsx";
import Bookmark from "./components/Bookmark.jsx";
import Definition from "./components/Definition.jsx";
import "./App.css";
function App() {
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || {}
  );
  console.log(bookmarks);
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);
  const addBookmark = (word, definitions) =>
    setBookmarks((oldBookmarks) => ({ ...oldBookmarks, [word]: definitions }));
  const removeBookmark = (word) =>
    setBookmarks((oldBookmarks) => {
      const temp = { ...oldBookmarks };
      delete temp[word];
      return temp;
    });
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/bookmark" element={<Bookmark bookmarks={bookmarks}/>} />
        <Route
          exact
          path="/definition/:word"
          element={
            <Definition
              bookmarks={bookmarks}
              addBookmark={addBookmark}
              removeBookmark={removeBookmark}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

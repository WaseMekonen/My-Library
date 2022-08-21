import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "./Details.css";

export default function Details({ item }) {
  const [tempNote, setTempNote] = useState("");
  const [userNotes, setUserNotes] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(userNotes));
  }, [userNotes.length]);

  function saveUserNote(tempNote, itemId) {
    let newNote = {
      id: itemId,
      content: tempNote,
    };

    const updatedNotes = [...userNotes, newNote];
    setUserNotes(updatedNotes);
  }

  const filteredNoteByBookId = userNotes.filter((note) => {
    return note.id == item.id;
  });

  const elements = filteredNoteByBookId.map((note, i) => {
    return <li key={i}>{note.content}</li>;
  });

  return (
    <div className="details-container">
      <div className="details-top">
        <div className="details-image">
          <img src={item.imgUrl} />
        </div>
        <div className="details-titles">
          <h4>{item.title}</h4>
          <h5>{item.author}</h5>
          <p>{item.description}</p>
        </div>
        <div className="user-notes">
          <div className="elements">{elements}</div>
          <div className="form-div">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveUserNote(tempNote, item.id);
              }}
            >
              <textarea
                className="user-textarea"
                cols="50"
                rows="6"
                onInput={(e) => {
                  setTempNote(e.target.value);
                }}
              ></textarea>
              <input type="submit" value="save note" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

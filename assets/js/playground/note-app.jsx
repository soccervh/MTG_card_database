import React, { useState, useEffect, useReducer } from "react";
import notesReducer from "./note-app-component/reducers/note-reducer.jsx";
import { NoteList } from "./note-app-component/NoteList.jsx";
import AddNoteForm from "./note-app-component/AddNoteForm.jsx";
import NotesContext from "./note-app-component/context/notes-context.jsx";

export const NoteApp = () => {
  // const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));

    if (notes) {
      dispatch({ type: "POPULATE_NOTES", notes });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Notes</h1>
      <NoteList />
      <AddNoteForm />
    </NotesContext.Provider>
  );
};

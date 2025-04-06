import React from "react";
import { useState } from "react";
import { showFormattedDate } from "../utils/data.js";
import NotesForm from "../component/NotesForm.jsx";
import NotesCard from "../component/NotesCard.jsx";
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import PropTypes from "prop-types";

const NotesList = ({
  notes,
  onUpdateNote,
  onDeleteNote,
  onAddNote,
  keyword,
  keywordChange,
  logout,
  isLoading,
}) => {
  const deleteNote = (id) => {
    onDeleteNote(id);
  };

  const archivedNote = (id) => {
    onUpdateNote(id);
  };

  const addNotes = ({ title, body }) => {
    const newNote = {
      title,
      body,
    };

    onAddNote(newNote);
  };

  return (
    <>
      <Header keyword={keyword} keywordChange={keywordChange} logout={logout} />
      <main>
        <NotesForm addNotes={addNotes} isLoading={isLoading} />
        <NotesCard
          notesData={notes}
          deleteNote={deleteNote}
          archivedNote={archivedNote}
        />
      </main>
      <Footer name={"Alif Naufal Zaqi"} />
    </>
  );
};

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  onUpdateNote: PropTypes.func,
  onDeleteNote: PropTypes.func,
  onAddNote: PropTypes.func,
  keywordChange: PropTypes.func,
  keyword: PropTypes.string.isRequired,
  logout: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
};

export default NotesList;

import React, { useContext } from "react";
import NotesHeader from "./NotesHeader.jsx";
import NotesBody from "./NotesBody";
import ButtonAction from "./ButtonAction.jsx";
import NonArchiveNotes from "./NonArchiveNotes.jsx";
import PropTypes from "prop-types";
import ButtonNavigation from "./ButtonNavigation.jsx";
import { Link } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext.jsx";

const NotesCard = ({ notesData, deleteNote, archivedNote }) => {
  const { isChecked } = useContext(ThemeContext);

  return (
    <section>
      <NonArchiveNotes>
        {notesData.length > 0 ? (
          <>
            <h3
              className={`text-3xl font-bold text-center ${
                isChecked ? "text-slate-200" : "text-black"
              }`}
            >
              Catatan Aktif
            </h3>
            <ul className="flex flex-wrap justify-center">
              {notesData.map((note) => (
                <li key={note.id} className="w-full sm:w-1/2 md:w-1/3 m-8">
                  <div
                    className={`card ${
                      isChecked ? "bg-slate-400" : "bg-slate-200"
                    } flex flex-col justify-between h-full shadow-xl p-4 rounded-lg`}
                  >
                    <div className="card-body">
                      <Link
                        to={`/notes/${note.id}`}
                        className="hover:underline"
                      >
                        <NotesHeader title={note.title} date={note.createdAt} />
                      </Link>
                      <NotesBody desc={note.body} />
                      <ButtonAction
                        onDelete={() => deleteNote(note.id)}
                        onArchive={() => archivedNote(note.id)}
                      >
                        Arsipkan
                      </ButtonAction>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-3xl font-bold text-slate-200 text-center">
            Data Kosong
          </p>
        )}
        <ButtonNavigation url={"/notes/archive"} content={"Catatan Arsip"} />
      </NonArchiveNotes>
    </section>
  );
};

NotesCard.propTypes = {
  notesData: PropTypes.array.isRequired,
  deleteNote: PropTypes.func,
  archivedNote: PropTypes.func,
};

export default NotesCard;

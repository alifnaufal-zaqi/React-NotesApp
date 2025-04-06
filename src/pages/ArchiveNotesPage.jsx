import React, { useContext } from "react";
import { showFormattedDate } from "../utils/data";
import ArchiveNotes from "../component/ArchiveNotes";
import { Link } from "react-router-dom";
import NotesHeader from "../component/NotesHeader";
import NotesBody from "../component/NotesBody";
import ButtonAction from "../component/ButtonAction";
import Header from "../component/Header";
import Footer from "../component/Footer";
import ButtonNavigation from "../component/ButtonNavigation";
import PropTypes from "prop-types";
import ThemeContext from "../contexts/ThemeContext";

const ArchiveNotesPage = ({
  notes,
  onActiveNotes,
  onDeleteNotes,
  keyword,
  keywordChange,
  logout,
}) => {
  const { isChecked } = useContext(ThemeContext);

  const deleteNote = (id) => {
    onDeleteNotes(id);
  };

  const activeNote = (id) => {
    onActiveNotes(id);
  };

  return (
    <>
      <Header keyword={keyword} keywordChange={keywordChange} logout={logout} />
      <section className={`p-5 ${notes.length > 0 ? "h-max" : "h-screen"}`}>
        <ArchiveNotes>
          {notes.length > 0 ? (
            <>
              <h3
                className={`text-3xl font-bold text-center ${
                  isChecked ? "text-slate-200" : "text-gray-800"
                }`}
              >
                Catatan Arsip
              </h3>
              <ul className="flex flex-wrap justify-center">
                {notes.map((note) => (
                  <li key={note.id} className="w-full sm:w-1/2 md:w-1/3 m-8">
                    <div
                      className={`card ${
                        isChecked ? "bg-slate-400" : "bg-slate-200"
                      } flex flex-col justify-between h-full shadow-xl p-4 rounded-lg`}
                    >
                      <div className="card-body w-full">
                        <Link
                          to={`/notes/${note.id}`}
                          className="hover:underline"
                        >
                          <NotesHeader
                            title={note.title}
                            date={showFormattedDate(note.createdAt)}
                          />
                        </Link>
                        <NotesBody desc={note.body} />
                        <ButtonAction
                          onDelete={() => deleteNote(note.id)}
                          onArchive={() => activeNote(note.id)}
                        >
                          Aktifkan
                        </ButtonAction>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p
              className={`text-3xl font-bold ${
                isChecked ? "text-slate-200" : "text-gray-800"
              } text-center`}
            >
              Data Kosong
            </p>
          )}
          <ButtonNavigation url={"/notes"} content={"Beranda"} />
        </ArchiveNotes>
      </section>
      <Footer name="Alif Naufal Zaqi" />
    </>
  );
};

ArchiveNotesPage.propTypes = {
  notes: PropTypes.array.isRequired,
  onActiveNotes: PropTypes.func,
  onDeleteNotes: PropTypes.func,
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func,
  logout: PropTypes.func,
};

export default ArchiveNotesPage;

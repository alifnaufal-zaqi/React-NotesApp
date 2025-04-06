import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Page404 from "./Page404";
import { getNote } from "../utils/api";
import ThemeContext from "../contexts/ThemeContext";

const NotesDetail = ({ keyword, keywordChange, logout }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState(null);
  const { isChecked } = useContext(ThemeContext);

  useEffect(() => {
    const fetchNote = async () => {
      setIsLoading(true);
      const { data } = await getNote(id);
      setIsLoading(false);

      setNote(data);
    };

    fetchNote();
  }, [id]);

  if (isLoading) {
    return (
      <span className="loading loading-spinner loading-md mx-auto my-auto"></span>
    );
  }

  if (!note) {
    return <Page404 />;
  }

  return (
    <>
      <Header keyword={keyword} keywordChange={keywordChange} logout={logout} />
      <div
        className={`${
          isChecked ? "text-white" : "text-black"
        } h-screen px-56 py-36`}
      >
        <h2 className="font-['Lexend'] text-3xl mb-10">{note.title}</h2>
        <p className="font-['Lexend'] text-xl">{note.body}</p>
        <p className="font-['Lexend'] text-xl">
          Dibuat Pada{" "}
          <span className={`${isChecked ? "text-gray-400" : "text-gray-800"}`}>
            {note.createdAt}
          </span>
        </p>
        <a href="/notes" className="btn btn-info mt-10">
          Kembali
        </a>
      </div>
      <Footer name="Alif Naufal Zaqi" />
    </>
  );
};

NotesDetail.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func,
  logout: PropTypes.func,
};

export default NotesDetail;

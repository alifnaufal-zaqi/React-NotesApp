import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import ThemeContext from "../contexts/ThemeContext";

const NotesForm = ({ addNotes, isLoading }) => {
  const [title, setTitle] = useState("");
  const [decription, setDecription] = useState("");
  const maxInputKarakter = 50;
  const { isChecked } = useContext(ThemeContext);

  const onTitleChangeHandler = (event) => {
    if (event.target.value.length <= maxInputKarakter) {
      setTitle(event.target.value);
    }
  };

  const onDecChangeHandler = (event) => {
    setDecription(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    addNotes({ title, body: decription });
    setTitle("");
    setDecription("");
  };

  return (
    <section className="container max-w-4xl mx-auto p-8 m-5 card shadow-xl bg-slate-300 w-70 max-sm:mx-auto max-sm:w-10/12">
      <h1 className="text-black text-center font-extrabold font-card text-3xl mb-3">
        Form Pembuatan Catatan
      </h1>
      <form action="" onSubmit={onSubmitForm}>
        <div className="flex flex-col p-3">
          <label htmlFor="title" className="text-black font-content">
            Judul Catatan
          </label>
          <input
            type="text"
            placeholder="Masukan Judul Catatan"
            value={title}
            onChange={onTitleChangeHandler}
            className="input input-bordered border-gray-400 placeholder-gray-500 w-full bg-slate-300 focus:border-gray-800 focus:shadow-md focus:shadow-gray-700 text-black"
          />
          <p className="text-sm text-slate-800">
            {title.length}/{maxInputKarakter}
          </p>
        </div>
        <div className="flex flex-col p-3">
          <label htmlFor="title" className="text-black font-content">
            Deskripsi Catatan
          </label>
          <textarea
            name="description"
            id="description"
            value={decription}
            onChange={onDecChangeHandler}
            className="textarea textarea-bordered border-gray-400 textarea-lg w-full bg-slate-300 focus:border-gray-800 focus:shadow-md focus:shadow-gray-700/70 text-black"
          ></textarea>
        </div>
        <div className="flex flex-col p-3">
          <button
            className={`btn ${
              isChecked ? "btn-primary" : "btn-neutral"
            } font-content`}
          >
            {!isLoading ? (
              "Submit"
            ) : (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

NotesForm.propTypes = {
  addNotes: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
};

export default NotesForm;

import PropTypes from "prop-types";
import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const NonArchiveNotes = ({ children }) => {
  const { isChecked } = useContext(ThemeContext);

  return (
    <div
      className={`flex font-card card card-body mx-auto w-9/12 mt-5 ${
        isChecked ? "bg-slate-600" : "bg-slate-300"
      } max-sm:mt-5`}
    >
      {children}
    </div>
  );
};

NonArchiveNotes.propTypes = {
  children: PropTypes.node,
};

export default NonArchiveNotes;

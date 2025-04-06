import PropTypes from "prop-types";
import React from "react";

const NotesHeader = ({ title, date }) => {
  return (
    <>
      <h3 className="font-bold font-content text-black">{title}</h3>
      <h6 className="text-gray-600">{date}</h6>
    </>
  );
};

NotesHeader.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default NotesHeader;

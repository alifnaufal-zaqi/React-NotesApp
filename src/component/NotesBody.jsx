import PropTypes from "prop-types";
import React from "react";

const NotesBody = ({ desc }) => {
  return (
    <>
      <p className="text-black font-content text-wrap max-sm:overflow-hidden text-ellipsis">
        {desc}
      </p>
    </>
  );
};

NotesBody.propTypes = {
  desc: PropTypes.string.isRequired,
};

export default NotesBody;

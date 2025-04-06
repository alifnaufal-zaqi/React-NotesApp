import PropTypes from "prop-types";
import React from "react";

const ButtonAction = ({ children, onDelete, onArchive }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 my-auto sm:justify-end sm:ml-auto w-full">
      <button
        onClick={onArchive}
        className="text-black font-content btn btn-warning hover:bg-transparent hover:border-yellow-400 hover:border-2 w-full sm:w-auto"
      >
        {children}
      </button>
      <button
        onClick={onDelete}
        className="text-black font-content btn btn-error hover:bg-transparent hover:border-red-400 hover:border-2 w-full sm:w-auto"
      >
        Hapus
      </button>
    </div>
  );
};

ButtonAction.propTypes = {
  children: PropTypes.node,
  onDelete: PropTypes.func,
  onArchive: PropTypes.func,
};

export default ButtonAction;

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const ButtonNavigation = ({ url, content }) => {
  return (
    <div className="self-center">
      <Link to={url} className="btn btn-accent">
        <p>{content}</p>
      </Link>
    </div>
  );
};

ButtonNavigation.propTypes = {
  url: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ButtonNavigation;

import PropTypes from "prop-types";
import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

const Footer = ({ name }) => {
  const { isChecked } = useContext(ThemeContext);

  return (
    <>
      <footer
        className={`bottom-0 ${
          isChecked ? "bg-gray-700" : "bg-slate-300"
        } mt-5 p-4`}
      >
        <p
          className={`text-lg text-center ${
            isChecked ? "text-white" : "text-black"
          }`}
        >
          ©Copyright {name}
        </p>
      </footer>
    </>
  );
};

Footer.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Footer;

import PropTypes from "prop-types";
import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import ThemeContext from "../contexts/ThemeContext";

const Header = ({ keyword, keywordChange, logout }) => {
  const { isChecked, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <header
        className={`flex justify-around py-5 ${
          isChecked ? "bg-gray-700" : "bg-slate-300"
        } content-center`}
      >
        <h1
          className={`text-4xl font-extrabold font-title align-middle ${
            isChecked ? "text-slate-200" : "text-black"
          }`}
        >
          NOTES APP
        </h1>
        <div className="flex gap-10">
          <form className="flex items-center gap-10">
            <input
              type="text"
              placeholder="Cari Catatan"
              value={keyword}
              onChange={(event) => keywordChange(event.target.value)}
              className={`input input-bordered rounded-full w-full max-w-xs max-sm:w-40 ${
                !isChecked
                  ? "bg-slate-200 border-2 border-black placeholder-black focus:shadow-sm focus:shadow-gray-600 focus:border-gray-600"
                  : "bg-slate-300 placeholder-black hover:bg-transparent hover:placeholder-slate-300 hover:border-slate-300 focus:text-white"
              }`}
            />
            <div className="flex gap-2">
              {isChecked ? (
                <FaMoon className="text-2xl text-white" />
              ) : (
                <FaSun className="text-2xl" />
              )}
              <input
                type="checkbox"
                className="toggle"
                value={isChecked}
                onChange={toggleTheme}
              />
            </div>
          </form>
          <button className="btn btn-primary" onClick={logout}>
            Keluar
          </button>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func,
  logout: PropTypes.func,
};

export default Header;

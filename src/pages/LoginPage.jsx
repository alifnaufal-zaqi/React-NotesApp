import React, { useContext, useEffect } from "react";
import { login } from "../utils/api";
import LoginInput from "../component/LoginInput";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";

const LoginPage = ({ loginSuccess }) => {
  const navigate = useNavigate();
  const { isChecked } = useContext(ThemeContext);

  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
      navigate("/notes");
    }
  };

  return (
    <section className="h-screen">
      <h3
        className={`${
          isChecked ? "text-white" : "text-black"
        } px-80 py-10 text-3xl`}
      >
        Login Page
      </h3>
      <LoginInput login={onLogin} />
      <p className={`px-80 ${isChecked ? "text-white" : "text-black"} mt-5`}>
        Belum Punya Akun ?{" "}
        <Link to={"/register"} className="text-blue-500">
          Register
        </Link>
      </p>
    </section>
  );
};

LoginPage.propTypes = {
  loginSuccess: PropTypes.func,
};

export default LoginPage;

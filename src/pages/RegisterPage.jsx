import React, { useContext } from "react";
import { register } from "../utils/api";
import RegisterInput from "../component/RegisterInput";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isChecked } = useContext(ThemeContext);

  const onRegister = async (user) => {
    const { error } = await register(user);

    if (!error) {
      navigate("/login");
    }
  };

  return (
    <section className="h-screen">
      <h3
        className={`${
          isChecked ? "text-white" : "text-black"
        } px-80 py-10 text-3xl`}
      >
        Register Page
      </h3>
      <RegisterInput register={onRegister} />
      <p className={`px-80 ${isChecked ? "text-white" : "text-black"} mt-5`}>
        Sudah Memiliki Akun ?{" "}
        <Link to={"/login"} className="text-blue-500">
          Login
        </Link>
      </p>
    </section>
  );
};

export default RegisterPage;

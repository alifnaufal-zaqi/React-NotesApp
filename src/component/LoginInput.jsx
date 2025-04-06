import PropTypes from "prop-types";
import React, { useState } from "react";

const LoginInput = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form className="text-white px-80" onSubmit={onSubmitHandler}>
      <div className="flex flex-col mb-8">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="p-2 rounded-md text-black"
        />
      </div>
      <div className="flex flex-col mb-8">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="p-2 rounded-md text-black"
        />
      </div>
      <button className="btn btn-info">Masuk</button>
    </form>
  );
};

LoginInput.propTypes = {
  login: PropTypes.func,
};

export default LoginInput;

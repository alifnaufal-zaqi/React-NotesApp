import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const RegisterInput = ({ register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="text-white px-80" onSubmit={onSubmitHandler}>
      <div className="flex flex-col mb-8">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="p-2 rounded-md text-black"
        />
      </div>
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
      <button className="btn btn-info">Register</button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func,
};

export default RegisterInput;

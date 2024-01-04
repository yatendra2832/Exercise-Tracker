import React from "react";
import { useState } from "react";
import axios from "axios";
const CreateUser = () => {
  const [user, setUser] = useState({
    username: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    axios
      .post("http://localhost:5000/users/add", user)
      .then(() => {
        alert("User added Successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container">
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            required
            className="form-control"
            value={user.username}
            onChange={handleInput}
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;

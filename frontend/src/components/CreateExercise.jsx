import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const CreateExercise = () => {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        // console.log(response.data[0].username);
        if (response.data.length > 0) {
          setExercise((prevExercise) => ({
            ...prevExercise,
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          }));
        }
      } catch (error) {
        console.log("Error in Fetching Data:", error.message);
      }
    };

    fetchData();
  }, []); // Dependency array is empty, meaning it runs once after the initial render

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setExercise({ ...exercise, [name]: value });
  };

  const handleUsernameChange = (e) => {
    const selectedUsername = e.target.value;
    setExercise((prevExercise) => ({
      ...prevExercise,
      username: selectedUsername,
    }));
  };

  const handleDateChange = (date) => {
    setExercise({ ...exercise, date: date });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(exercise);
    axios
      .post("http://localhost:5000/exercise/add", exercise)
      .then(() => {
        console.log(exercise);
        alert("Exercise added Successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="container">
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <select
            required
            className="form-control"
            value={exercise.username}
            onChange={handleUsernameChange}
          >
            {exercise.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            autoComplete="off"
            required
            className="form-control"
            value={exercise.description}
            onChange={handleInput}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="duration">Duration (in min)</label>
          <input
            type="number"
            required
            name="duration"
            id="duration"
            className="form-control"
            value={exercise.duration}
            onChange={handleInput}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="date">Date</label>
          <div>
            <DatePicker
              selected={exercise.date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              name="date"
              id="date"
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setExercise({ ...exercise, [name]: value });
  };

  const handleDateChange = (date) => {
    setExercise({ ...exercise, date: date });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(exercise);
  };
  return (
    <div className="container">
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <select
            required
            className="form-control"
            value={exercise.username}
            onChange={handleInput}
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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

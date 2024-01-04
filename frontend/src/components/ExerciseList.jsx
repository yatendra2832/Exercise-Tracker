import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExerciseList = () => {
  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get("http://localhost:5000/exercise");
        setExerciseList(response.data);
        // console.log(response.data); //that will return the array of exercise objects
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExercise();
  }, []);

  const deleteExercise = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/exercise/delete/${id}`
      );
      console.log(response.data);
      setExerciseList(exerciseList.filter((exercise) => exercise._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <h3>Exercise List</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList.map((exercise) => (
            <tr key={exercise._id}>
              <td>{exercise.username}</td>
              <td>{exercise.description}</td>
              <td>{exercise.duration}</td>
              <td>{exercise.date.substring(0, 10)}</td>
              <td>
                <Link
                  to={`/edit/${exercise._id}`}
                  className="btn btn-primary mx-2 my-0 py-1"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger mx-2 my-0 py-1"
                  onClick={() => deleteExercise(exercise._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../redux/reducers/userSlice";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    gender: "",
    city: "",
  });

  const [file, setFile] = useState([]);

  const formdata = new FormData();

  formdata.append("name", input.name);
  formdata.append("email", input.email);
  formdata.append("gender", input.gender);
  formdata.append("city", input.city);
  formdata.append("profile", file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/v1/users", formdata);
    dispatch(getAllUsers());
    navigate("/");
  };

  return (
    <div className="container flex items-center justify-content-center">
      <h2
        className="text-center text-white p-2 m-2"
        style={{ backgroundColor: "red" , borderRadius: "25px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",  transition: "box-shadow 0.3s ease", 
        ":hover": {
          boxShadow: "0 0 10px rgba(255, 165, 0, 0.8)"}
         }}
      >
        Add New User
      </h2>

      <form className="p-2 m-2" onSubmit={handleSubmit}>
        <div className="form-group m-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            value={input.name}
            name="name"
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="form-group m-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={input.email}
            name="email"
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </div>
        <label htmlFor="gender">Gender</label>
        <div className="form-group">
          <div className="form-check form-check-inline m-3">
            <input
              className="form-check-input"
              type="radio"
              id="gender"
              value="Male"
              name="gender"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
            <label className="form-check-label" htmlFor="gender">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="female"
              value="Female"
              name="gender"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>
        <div className="form-group">
          <label>City</label>
          <select
            className="form-select m-2"
            name="city"
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          >
            <option value="Kanpur" defaultValue>
              Kanpur
            </option>
            <option value="Gorakhpur">Gorakhpur</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Kanpur">Kanpur</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
        <div className="form-group m-3">
          <label>Profile</label>
          <input
            type="file"
            name="profile"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to={"/"}>
          <button className="btn btn-danger m-3">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default Register;

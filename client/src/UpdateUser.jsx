import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then(result => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updateUser/${id}`, { name, email, age })
      .then(result => {
        console.log(result.data);
        navigate('/Users');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{ background: 'linear-gradient(to right, #000428, #004e92)' }}>
      <div className="shadow-sm rounded p-4 bg-white" style={{ maxWidth: '500px', width: '100%' }}>
        <form onSubmit={update}>
          <h2 className="form-label text-center mb-4">Update User</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter Name" 
              className="form-control" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter Email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input 
              type="number" 
              id="age" 
              placeholder="Enter Age" 
              className="form-control" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
          </div>
          <button className="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;

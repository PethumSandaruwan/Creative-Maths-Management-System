import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createUser", { name, email, age })
      .then(result => {
        console.log(result.data);
        setName(''); // Clear the name field
        setEmail(''); // Clear the email field
        setAge(''); // Clear the age field
        navigate('/users');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{ background: 'linear-gradient(to right, #000428, #004e92)' }}>
      <div className='shadow-sm rounded p-4 bg-white' style={{ maxWidth: '500px', width: '100%' }}>
        <form onSubmit={Submit}>
          <h2 className='form-label text-center mb-4 '>Register Student</h2>
          <div className='mb-3'>
            <label htmlFor="name" className='form-label'>Name</label>
            <input 
              type="text" 
              id="name"
              placeholder='Enter Name' 
              className='form-control' 
              value={name} // Bind value to state
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="email" className='form-label'>Email</label>
            <input 
              type="email" 
              id="email"
              placeholder='Enter Email' 
              className='form-control' 
              value={email} // Bind value to state
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="age" className='form-label'>Age</label>
            <input 
              type="number" 
              id="age"
              placeholder='Enter Age' 
              className='form-control' 
              value={age} // Bind value to state
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
          </div>
          <button className='btn btn-primary w-100'>Register</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;

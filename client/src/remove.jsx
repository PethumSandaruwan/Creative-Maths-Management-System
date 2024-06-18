import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(res => {
        console.log(res);
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => console.log(err));
  }

  const handleSearch = () => {
    // Fetch data again from API with search criteria
    axios.get(`http://localhost:3001/?name=${searchName}&id=${searchId}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching filtered users:', error));
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (searchId === '' || user._id.toLowerCase().includes(searchId.toLowerCase()))
  );

  const handleNameSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleIdSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <h1 className="card-title mb-0">Student Management System</h1>
            </div>
            <div className="card-body">
            <div className="mb-3">
                <Link to="/Users" className="btn btn-success me-2">Go to Dashboard</Link>
              
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Student ID"
                    value={searchId}
                    onChange={handleIdSearchChange}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={handleNameSearchChange}
                  />
                </div>
                <div className="col">
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="text-center">
                    <tr>
                      <th>#</th>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{user._id}</td>
                        <td className="text-center">{user.name}</td>
                        <td className="text-center">{user.email}</td>
                        <td className="text-center">{user.age}</td>
                        <td className="text-center">
                          
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user._id)}
                            
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = () => {
    // Perform filtering based on search criteria
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchAge === '' || user.age.toString() === searchAge) &&
      (searchId === '' || user._id.includes(searchId)) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    // Update state with filtered users
    setUsers(filteredUsers);
  };

  const resetSearch = () => {
    // Reset search criteria and fetch all users again
    setSearchName('');
    setSearchAge('');
    setSearchId('');
    setSearchEmail('');
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
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
                    onChange={(e) => setSearchId(e.target.value)}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by age"
                    value={searchAge}
                    onChange={(e) => setSearchAge(e.target.value)}
                  />
                </div>
                <div className="col">
                  <button className="btn btn-primary me-2" onClick={handleSearch}>
                    Search
                  </button>
                  <button className="btn btn-secondary" onClick={resetSearch}>
                    Reset
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
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{user._id}</td>
                        <td className="text-center">{user.name}</td>
                        <td className="text-center">{user.email}</td>
                        <td className="text-center">{user.age}</td>
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

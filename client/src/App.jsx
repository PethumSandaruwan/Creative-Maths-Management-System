// App.jsx

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import Home from './home'; // Import the Home component
import Find from './find'
import Updates from './updates'
import Remove from './remove'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} /> {/* Route to the homepage */}
          <Route path='/users' element={<Users />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/update/:id' element={<UpdateUser />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/find' element={<Find />} />
          <Route path='/updates' element={<Updates />} />
          <Route path='/remove' element={<Remove />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

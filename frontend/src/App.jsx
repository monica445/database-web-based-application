import React from 'react';
import './App.css';
import RoleForm from './components/RoleForm';
import RoleList from './components/RoleList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>STOCK MANAGEMENT SYSTEM</h1>

      <div style={{ marginBottom: '40px' }}>
        <RoleForm />
      </div>

      <hr />

      <div style={{ marginBottom: '40px' }}>
        <RoleList />
      </div>

      <hr />

      <div style={{ marginBottom: '40px' }}>
        <UserForm />
      </div>

      <hr />

      <div>
        <UserList />
      </div>
    </div>
  );
}

export default App;

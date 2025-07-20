import React from 'react';
import './App.css';
import RoleForm from './components/RoleForm';
import RoleList from './components/RoleList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {

  async function handleBackup() {
    try {
      const res = await fetch('http://localhost:5000/api/backup', { method: 'POST' });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Backup request failed');
    }
  }

  return (
    <div style={{ position: 'relative', padding: '20px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto'  }}>
    
      <h1>STOCK MANAGEMENT SYSTEM</h1>
      <button 
        onClick={handleBackup} 
        className='backup-btn'
        style={{ position: 'absolute', top: '110px', right: '190px' }}
      >Back Up Database</button>

      <div style={{ marginBottom: '40px', marginTop: '100px' }}>
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

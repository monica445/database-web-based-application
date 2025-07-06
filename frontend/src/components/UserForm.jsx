import { useState, useEffect } from 'react';
import { createUser, getRoles } from '../services/apiService';

function UserForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleName, setRoleName] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function fetchRoles() {
      const res = await getRoles();
      setRoles(res.data);
    }
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ username, email, password, role: roleName });
      alert('User created sucessfully!');
      setUsername('');
      setEmail('');
      setPassword('');
      setRoleName('');
    } catch (err) {
      alert('Error creating user: ' + err.message)
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Create User</h3>
      <label>Username:</label><br/>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
      <label>Email:</label><br/>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
      <label>Password:</label><br/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
      <select value={roleName} onChange={(e) => setRoleName(e.target.value)} required>
        <option value="">-- Select Role --</option>
        {roles.map((role) => (
          <option key={role.id} value={role.name}>{role.name}</option>
        ))}
      </select><br />
      <button type="submit">Create User</button>
    </form>
  );
}

export default UserForm;
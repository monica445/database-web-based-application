import { useState } from 'react';
import { createRole } from '../services/apiService';

const availablePrivileges = [
  'SELECT',
  'INSERT',
  'UPDATE',
  'DELETE',
  'CREATE',
  'DROP',
  'ALTER',
  'EXECUTE'
];

function RoleForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);

  const handleCheckboxChange = (privilege) => {
    setSelectedPrivileges((prev) =>
      prev.includes(privilege)
        ? prev.filter((p) => p !== privilege)
        : [...prev, privilege]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRole({
        name,
        description,
        privileges: selectedPrivileges
      });
      alert('Role created successfully');
      setName('');
      setDescription('');
      setSelectedPrivileges([]);
    } catch (err) {
      alert('Error creating role: ' + err.message);
    }
  };


  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Create Role</h3>
      <label>Name:</label> <br/>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
      <label>Description:</label><br/>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
      <div>
        <p>Privileges:</p>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {availablePrivileges.map((privilege) => (
            <li key={privilege}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPrivileges.includes(privilege)}
                  onChange={() => handleCheckboxChange(privilege)}
                />
                {privilege}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button type="submit">Create Role</button>
    </form>
  );
}

export default RoleForm;
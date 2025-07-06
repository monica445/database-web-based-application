import { useEffect, useState } from 'react';
import { getRoles } from '../services/apiService';

function RoleList() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await getRoles();
      setRoles(response.data);
    };
    fetchRoles();
  }, []);

  return (
    <div className="container roles-list">
      <h3>Roles</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Privileges</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.description || 'N/A'}</td>
              <td>{role.privileges?.join(', ') || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoleList;
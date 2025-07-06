import { query } from '../db/database.js';
import { createUserAndAssignRole } from './utils.js';

export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body; 
  try {
    const result = await createUserAndAssignRole(username, email, password, role); //role = role name
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await query(`
      SELECT u.id, u.username, u.email, u.role_id, r.name AS role_name
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
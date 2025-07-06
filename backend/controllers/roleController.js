import { query } from '../db/database.js';
import { createRoleWithPrivileges } from './utils.js';

export const createRole = async (req, res) => {
   const { name, description, privileges } = req.body;
  try {
    const result = await createRoleWithPrivileges(name, description, privileges);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const result = await query(
      `SELECT 
      r.id, 
      r.name, 
      r.description, 
      ARRAY_AGG(rp.privilege) AS privileges
    FROM roles r
    LEFT JOIN role_privileges rp ON r.id = rp.role_id
    GROUP BY r.id, r.name, r.description`)

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
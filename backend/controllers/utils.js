import { pool } from '../db/database.js';

export async function createRoleWithPrivileges(name, description, privileges) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insert into app-level roles table
    const roleResult = await client.query(
      'INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING id',
      [name, description]
    );
    const roleId = roleResult.rows[0].id;

    // Insert privileges into role_privileges
    for (const privilege of privileges) {
      await client.query(
        'INSERT INTO role_privileges (role_id, privilege) VALUES ($1, $2)',
        [roleId, privilege]
      );
    }

    // Create PostgreSQL role if not exists
    await client.query(`DO $$
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${name}') THEN
          CREATE ROLE "${name}";
        END IF;
      END
    $$;`);

    // Grant table-level privileges
    const tablePrivs = privileges.filter(p => ['SELECT', 'INSERT', 'UPDATE', 'DELETE'].includes(p));
    if (tablePrivs.length) {
      await client.query(`GRANT ${tablePrivs.join(', ')} ON ALL TABLES IN SCHEMA public TO "${name}"`);
    }

    // Grant CREATE on schema
    if (privileges.includes('CREATE')) {
      await client.query(`GRANT CREATE ON SCHEMA public TO "${name}"`);
    }

    // Grant EXECUTE on functions
    if (privileges.includes('EXECUTE')) {
      await client.query(`GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO "${name}"`);
    }

    // Grant USAGE on sequences
    await client.query(`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO "${name}"`);

    await client.query('COMMIT');
    return { success: true, roleId };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}



export async function createUserAndAssignRole(username, email, password, roleName) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get role_id from role name
    const roleRes = await client.query(
      'SELECT id FROM roles WHERE name = $1',
      [roleName]
    );
    if (roleRes.rowCount === 0) {
      throw new Error(`Role "${roleName}" not found`);
    }
    const roleId = roleRes.rows[0].id;

    // Create PostgreSQL user
    const safePassword = password.replace(/'/g, "''");
    await client.query(`CREATE USER "${username}" WITH PASSWORD '${safePassword}'`);

    // Grant PostgreSQL role to user
    await client.query(`GRANT "${roleName}" TO "${username}"`);

    // Insert into users table
    await client.query(
      `INSERT INTO users (username, email, password, role_id) VALUES ($1, $2, $3, $4)`,
      [username, email, password, roleId]
    );

    await client.query('COMMIT');
    console.log(`User "${username}" created, assigned role "${roleName}", and saved in users table`);
    return { success: true };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating user:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

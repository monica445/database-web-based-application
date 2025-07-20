import { exec } from 'child_process';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function runPythonBackup(req, res) {
  const pythonScript = path.join(__dirname, '..', 'scripts', 'backup.py');

  exec(`python "${pythonScript}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Backup error:', error.message);
      console.error('stderr:', stderr);
      return res.status(500).json({ success: false, message: 'Backup failed.' });
    }
    console.log('Backup stdout:', stdout);
    res.json({ success: true, message: 'Backup completed successfully.' });
  });
}



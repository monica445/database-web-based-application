import express from 'express';
import { runPythonBackup } from '../controllers/backupController.js';

const router = express.Router();

router.post('/backup', runPythonBackup);

export default router;

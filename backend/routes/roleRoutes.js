import express from 'express';
import { getAllRoles, createRole } from '../controllers/roleController.js';

const router = express.Router();

router.post('/roles', createRole);
router.get('/roles', getAllRoles);

export default router;
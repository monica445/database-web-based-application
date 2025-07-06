import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);

export default router;
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json()); //used to JSON data
app.use(cors()); //this allow client from anywhere access server

import roleRoutes from './routes/roleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import backupRoutes from './routes/backupRoute.js';

app.use('/api', roleRoutes);
app.use('/api', userRoutes);
app.use('/api', backupRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
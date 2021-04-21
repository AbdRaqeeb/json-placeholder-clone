import express from 'express';
import cors from 'cors';
import { errorHandler } from './server/middleware/error.js'
import Models from './server/database/models/index.js';
import 'dotenv/config.js';

import postRouter from './server/routes/posts.js';
import commentRouter from './server/routes/comments.js';

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

Models
  .sequelize
  .sync()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Unable to sync database', err));

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
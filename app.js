import 'dotenv/config';
import express from 'express';
import interactionHandler from './interactionHandler.js';

// Create an express app
const app = express();

interactionHandler(app);

app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
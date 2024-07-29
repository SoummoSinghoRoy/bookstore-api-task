import express, { Application } from 'express';

const app: Application = express();
const PORT: number = 2080;

import setMiddlewares from './middleware/middleware';
setMiddlewares(app);

import setRoute from './api/routes/route';
setRoute(app);

app.listen(PORT, (): void => {
  console.log(`Server listen on port: ${PORT}`);
})





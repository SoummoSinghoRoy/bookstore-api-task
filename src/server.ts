import express, { Application } from 'express';

const app: Application = express();
const PORT: number = 2080;

app.listen(PORT, (): void => {
  console.log(`Server listen on port: ${PORT}`);
})





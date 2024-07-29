import { Router, Request, Response, Application } from "express";
import userRoute from './user.route';
import authorRoute from './author.route';

interface IRoute {
  path: string;
  handler: Router | ((res: Response, req?: Request, ) => void);
}

const routes: IRoute[] = [
  {
    path: '/api/authors',
    handler: authorRoute
  },
  {
    path: '/api/user',
    handler: userRoute
  },
  {
    path: '/',
    handler: (res: Response) => {
      res.status(200).json({
        msg: `Server running properly`
      })
    }
  }
];

export default (app: Application): void => {
  routes.forEach(route => {
    if (route.path == '/') {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  })
} 
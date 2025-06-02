import express from 'express';
 
 
const router = express.Router();

const apiRoutes = [
  {
    path: '/auth',
    route: 
  },
 
 
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;

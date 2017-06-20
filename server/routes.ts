import * as express from 'express';

import ShoeCtrl from './controllers/shoe';
import UserCtrl from './controllers/user';
import Shoe from './models/shoe';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const shoeCtrl = new ShoeCtrl();
  const userCtrl = new UserCtrl();

  // Shoes
  router.route('/shoes').get(shoeCtrl.getAll);
  router.route('/shoes/count').get(shoeCtrl.count);
  router.route('/shoe').post(shoeCtrl.insert);
  router.route('/shoe/:id').get(shoeCtrl.get);
  router.route('/shoe/:id').put(shoeCtrl.update);
  router.route('/shoe/:id').delete(shoeCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our applishoeion with the prefix /api
  app.use('/api', router);

}

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validations';

const router = express.Router();

router.get(
  '/',
  validateRequest(UserValidation.listUserSchema),
  UserController.listUsers
);
router.post(
  '/',
  validateRequest(UserValidation.createUserSchema),
  UserController.createUser
);
router.get(
  '/:id',
  validateRequest(UserValidation.userIdParamsSchema),
  UserController.getUserById
);
router.put(
  '/:id',
  validateRequest(UserValidation.userIdParamsSchema),
  validateRequest(UserValidation.updateUserSchema),
  UserController.updateUserById
);
router.delete(
  '/:id',
  validateRequest(UserValidation.userIdParamsSchema),
  UserController.deleteUserById
);

export const userRoutes = router;

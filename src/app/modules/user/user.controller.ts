import type { Request, Response } from 'express';
import httpStatus from '../../../const/httpStatus';
import catchAsync from '../../../lib/catchAsync';
import pick from '../../../lib/pick';
import sendResponse from '../../../lib/sendResponse';
import { userFilterableFields } from './user.constant';
import type {
  IUserCreatePayload,
  IUserUpdatePayload,
} from './user.interface';
import { UserServices } from './user.service';

const listUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const filters = pick(query, userFilterableFields);

  const result = await UserServices.listUsers(filters, query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserById(req.params['id'] as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    data: result,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(
    req.body as IUserCreatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUserById(
    req.params['id'] as string,
    req.body as IUserUpdatePayload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.deleteUserById(req.params['id'] as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

export const UserController = {
  listUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

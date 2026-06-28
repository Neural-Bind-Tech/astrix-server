import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { ApplicationController } from './application.controller';
import { ApplicationValidation } from './application.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(ApplicationValidation.listApplicationSchema),
  ApplicationController.listApplications
);
router.post(
  '/',
  validateRequest(ApplicationValidation.createApplicationSchema),
  ApplicationController.createApplication
);
router.post(
  '/bulk',
  validateRequest(ApplicationValidation.bulkCreateApplicationSchema),
  ApplicationController.bulkCreateApplications
);
router.put(
  '/bulk',
  validateRequest(ApplicationValidation.bulkUpdateApplicationSchema),
  ApplicationController.bulkUpdateApplications
);
router.patch(
  '/update-many',
  validateRequest(ApplicationValidation.updateManyApplicationSchema),
  ApplicationController.updateManyApplications
);
router.delete(
  '/',
  validateRequest(ApplicationValidation.deleteManyApplicationSchema),
  ApplicationController.deleteManyApplications
);
router.get(
  '/:id',
  validateRequest(ApplicationValidation.applicationIdParamsSchema),
  ApplicationController.getApplicationById
);
router.put(
  '/:id',
  validateRequest(ApplicationValidation.applicationIdParamsSchema),
  validateRequest(ApplicationValidation.updateApplicationSchema),
  ApplicationController.updateApplicationById
);
router.delete(
  '/:id',
  validateRequest(ApplicationValidation.applicationIdParamsSchema),
  ApplicationController.deleteApplicationById
);
router.put(
  '/:id/restore',
  validateRequest(ApplicationValidation.applicationIdParamsSchema),
  ApplicationController.restoreApplicationById
);

export const applicationRoutes = router;

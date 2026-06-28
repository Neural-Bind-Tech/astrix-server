import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EventRegistrationController } from './eventregistration.controller';
import { EventRegistrationValidation } from './eventregistration.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(EventRegistrationValidation.listEventRegistrationSchema),
  EventRegistrationController.listEventRegistrations
);
router.post(
  '/',
  validateRequest(EventRegistrationValidation.createEventRegistrationSchema),
  EventRegistrationController.createEventRegistration
);
router.post(
  '/bulk',
  validateRequest(
    EventRegistrationValidation.bulkCreateEventRegistrationSchema
  ),
  EventRegistrationController.bulkCreateEventRegistrations
);
router.put(
  '/bulk',
  validateRequest(
    EventRegistrationValidation.bulkUpdateEventRegistrationSchema
  ),
  EventRegistrationController.bulkUpdateEventRegistrations
);
router.patch(
  '/update-many',
  validateRequest(
    EventRegistrationValidation.updateManyEventRegistrationSchema
  ),
  EventRegistrationController.updateManyEventRegistrations
);
router.delete(
  '/',
  validateRequest(
    EventRegistrationValidation.deleteManyEventRegistrationSchema
  ),
  EventRegistrationController.deleteManyEventRegistrations
);
router.get(
  '/:id',
  validateRequest(EventRegistrationValidation.eventRegistrationIdParamsSchema),
  EventRegistrationController.getEventRegistrationById
);
router.put(
  '/:id',
  validateRequest(EventRegistrationValidation.eventRegistrationIdParamsSchema),
  validateRequest(EventRegistrationValidation.updateEventRegistrationSchema),
  EventRegistrationController.updateEventRegistrationById
);
router.delete(
  '/:id',
  validateRequest(EventRegistrationValidation.eventRegistrationIdParamsSchema),
  EventRegistrationController.deleteEventRegistrationById
);
router.put(
  '/:id/restore',
  validateRequest(EventRegistrationValidation.eventRegistrationIdParamsSchema),
  EventRegistrationController.restoreEventRegistrationById
);

export const eventRegistrationRoutes = router;

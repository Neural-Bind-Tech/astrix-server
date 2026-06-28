import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { EventController } from './event.controller';
import { EventValidation } from './event.validation';

const router = express.Router();

router.get(
  '/',
  validateRequest(EventValidation.listEventSchema),
  EventController.listEvents
);
router.post(
  '/',
  validateRequest(EventValidation.createEventSchema),
  EventController.createEvent
);
router.post(
  '/bulk',
  validateRequest(EventValidation.bulkCreateEventSchema),
  EventController.bulkCreateEvents
);
router.put(
  '/bulk',
  validateRequest(EventValidation.bulkUpdateEventSchema),
  EventController.bulkUpdateEvents
);
router.patch(
  '/update-many',
  validateRequest(EventValidation.updateManyEventSchema),
  EventController.updateManyEvents
);
router.delete(
  '/',
  validateRequest(EventValidation.deleteManyEventSchema),
  EventController.deleteManyEvents
);
router.get(
  '/:id',
  validateRequest(EventValidation.eventIdParamsSchema),
  EventController.getEventById
);
router.put(
  '/:id',
  validateRequest(EventValidation.eventIdParamsSchema),
  validateRequest(EventValidation.updateEventSchema),
  EventController.updateEventById
);
router.delete(
  '/:id',
  validateRequest(EventValidation.eventIdParamsSchema),
  EventController.deleteEventById
);
router.put(
  '/:id/restore',
  validateRequest(EventValidation.eventIdParamsSchema),
  EventController.restoreEventById
);

export const eventRoutes = router;

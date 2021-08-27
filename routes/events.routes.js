import express from 'express'
const router = express.Router()
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller.js'
import * as auth from '../middlewares/auth.middleware.js'

router.route('/').post(auth.protect, auth.admin, createEvent)
router
  .route('/:id')
  .delete(auth.protect, auth.admin, deleteEvent)
  .put(auth.protect, auth.admin, updateEvent)

export default router
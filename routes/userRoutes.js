import { Router } from 'express';
import {
    saveNotificationToken,
    sendNotification
} from '../controllers/userController.js'

const router = Router()

router.post('/save-token', saveNotificationToken)
router.post('send-notification', sendNotification)

export default router;
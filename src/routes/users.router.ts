import { Request, Response, Router } from 'express'
import usersController from '@modules/master/users/users.controller'
import verifyTokenMember from '@middlewares/verifyTokenMember'

const router = Router()

router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.get('/', verifyTokenMember, usersController.getProfile)
router.put('/', verifyTokenMember, usersController.updateProfile)

export default router

import { Router } from 'express'
import mainRouter from './main.router'
import usersRouter from './users.router'

// Init router and path
const router = Router()

// Add sub-routes
router.use('/', mainRouter)
router.use('/users', usersRouter)

// Export the base-router
export default router

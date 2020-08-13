import { Request, Response, Router } from 'express'
import { OK } from 'http-status-codes'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  return res.status(OK).json('Hello')
})

export default router

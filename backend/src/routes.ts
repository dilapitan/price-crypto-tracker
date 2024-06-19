import { Request, Response, Router } from 'express'
import { getPrice } from './controllers/PriceController'

const router = Router()

router.get('/test', (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: 'API is working' })
  } catch (error: any) {
    res.status(500).send({ message: error.message })
  }
})

router.get('/price/:cryptocurrency', getPrice)

export default router

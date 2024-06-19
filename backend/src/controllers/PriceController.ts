import { Request, Response } from 'express'
import { getCryptocurrenyPrice } from '../services/PriceService'

const getPrice = (req: Request, res: Response): void => {
  try {
    const { cryptocurrency } = req.params

    // Optional parameter for the number of minutes to include in the response (default 60).
    const minutes = parseInt(req.query.minutes as string) || 60

    const price = getCryptocurrenyPrice(cryptocurrency, minutes)
    res.status(200).send({
      data: price,
    })
  } catch (error: any) {
    res.status(500).send({ message: error.message })
  }
}

export { getPrice }

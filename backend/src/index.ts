import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import routes from './routes'
import startPriceFetching from './scheduler'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.use('/api', routes)

// Array of cryptocurrencies to monitor
// The Coingecko IDs for BTC, ETH and DOGE are bitcoin, ethereum and dogecoin.
const cryptocurrencies: string[] = ['bitcoin', 'ethereum', 'dogecoin']

// Start the price fetching scheduler for each cryptocurrency in the array
startPriceFetching(cryptocurrencies)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

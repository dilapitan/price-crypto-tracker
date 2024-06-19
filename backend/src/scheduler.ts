import cron from 'node-cron'
import { fetchPrice } from './services/PriceService'

const startPriceFetching = (cryptocurrencies: string[]) => {
  // Schedule the fetchPrice function to run every 60 seconds for the given cryptocurrency
  cryptocurrencies.forEach((crypto) => {
    cron.schedule('* * * * *', () => {
      fetchPrice(crypto)
    })
  })
}

export default startPriceFetching

import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

interface PriceData {
  timestamp: number
  price: number
}

// Storing the price history in-memory.
const prices: { [key: string]: PriceData[] } = {}

const fetchPrice = async (id: string) => {
  try {
    // Reference: https://docs.coingecko.com/reference/simple-price on using Demo API key
    const response = await axios.get(
      `${process.env.COINGECKO_MAIN_ENDPOINT}/simple/price`,
      {
        params: {
          ids: id,
          vs_currencies: 'usd', // Using USD
          x_cg_api_key: process.env.COINGECKO_API_KEY,
        },
      },
    )

    const price = response.data[id].usd
    const timestamp = Date.now()

    if (!prices[id]) {
      prices[id] = []
    }

    prices[id].push({ timestamp, price })

    // Keep only the last 60 minutes of data
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    prices[id] = prices[id].filter((data) => data.timestamp >= oneHourAgo)
    // console.log('prices:', prices)
  } catch (error: any) {
    console.error(`Error fetching price ${id}:`, error.message)
  }
}

const getCryptocurrenyPrice = (id: string, minutes: number = 60): any => {
  const now = Date.now()
  const requestedTime = now - minutes * 60 * 1000

  const selectedPrice: any = prices[id]

  const latestPrice: number =
    selectedPrice === undefined
      ? 0
      : selectedPrice[selectedPrice.length - 1].price

  const sum: number =
    prices[id]?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price
    }, 0) || 0
  const averagePrice: number =
    selectedPrice === undefined ? 0 : sum / selectedPrice.length

  // Return prices within the requested time frame
  const historyData = (prices[id] || []).filter(
    (data) => data.timestamp >= requestedTime,
  )

  const data: any = {
    latest: latestPrice,
    average: averagePrice,
    history: historyData,
    count: historyData.length,
  }

  return data
}

export { fetchPrice, getCryptocurrenyPrice }

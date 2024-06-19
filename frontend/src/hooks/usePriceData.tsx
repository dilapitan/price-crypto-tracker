import { useState, useEffect } from 'react'
import axios from 'axios'

const usePriceData = (symbol: string, minutes: number = 60) => {
  console.log('symbol:', symbol)
  console.log('minutes:', minutes)

  const [priceData, setPriceData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/price/${symbol}?minutes=${minutes}`,
        )
        console.log('response:', response)
        setPriceData(response.data)
      } catch (error: any) {
        console.error('Error fetching price data:', error.message)
        setPriceData(null) // Optionally handle error state
      }
    }

    fetchData()

    // Setup interval to fetch data every 60 seconds
    const interval = setInterval(fetchData, 60000)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [symbol, minutes])

  return priceData
}

export default usePriceData

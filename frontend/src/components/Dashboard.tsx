import { ChangeEvent, useState, useEffect } from 'react'
import usePriceData from '../hooks/usePriceData'

export default function Dashboard() {
  const [symbol, setSymbol] = useState<string>('')
  const [minutes, setMinutes] = useState<number>(60)
  const priceData = usePriceData(symbol, minutes)
  const [fetchComplete, setFetchComplete] = useState(false)

  useEffect(() => {
    setFetchComplete(true)

    setTimeout(() => setFetchComplete(false), 1000)
  }, [priceData])

  const handleChangeSymbol = (e: ChangeEvent<HTMLSelectElement>) => {
    setSymbol(e.target.value)
  }

  const handleChangeMinutes = (e: ChangeEvent<HTMLInputElement>) => {
    setMinutes(parseInt(e.target.value))
  }

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp)

    return date.toLocaleString() // Adjust options as needed for locale, timezone, etc.
  }

  return (
    <div className="text-center">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-center">
        Crypto Pricing Tracker
      </h1>

      <div className="max-w-xs mx-auto mt-10 text-left">
        <label
          htmlFor="cryptocurrencies"
          className="block mb-2 text-xs sm:text-sm font-medium text-gray-900"
        >
          Select the Cryptocurrency you want to display:
        </label>
        <select
          onChange={handleChangeSymbol}
          id="cryptocurrencies"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option selected value="">
            Select one
          </option>
          <option value="bitcoin">bitcoin</option>
          <option value="ethereum">ethereum</option>
          <option value="dogecoin">dogecoin</option>
        </select>
      </div>

      <div className="max-w-xs mx-auto mt-5 text-left">
        <label
          htmlFor="number-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select the Minutes
        </label>
        <input
          onChange={handleChangeMinutes}
          value={minutes}
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder=""
          required
        />
      </div>

      <h2 className="text-md mt-10">
        Currently displaying prices in <span className="font-bold">USD</span>{' '}
        for <span className="font-bold">{symbol}</span>:
      </h2>

      {symbol && (
        <div className="mt-10 flex justify-center">
          <div className={fetchComplete ? 'blink p-5' : 'p-5'}>
            {priceData ? (
              <div className="text-left">
                <p>
                  <span className="font-bold mr-2">Latest Price:</span>$
                  {priceData.data.latest.toLocaleString()}
                </p>
                <p>
                  <span className="font-bold mr-2">Average Price:</span>$
                  {priceData.data.average.toLocaleString()}
                </p>
                <p>
                  <span className="font-bold">History (oldest to newest):</span>
                </p>
                <div className="max-h-40 overflow-scroll">
                  <ul>
                    {priceData.data.history.map((price: any, index: number) => {
                      return (
                        <li key={index}>
                          Price: ${price.price.toLocaleString()}, Date:{' '}
                          {formatDate(price.timestamp)}
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <p>
                  <span className="font-bold">Count:</span>{' '}
                  {priceData.data.count.toLocaleString()}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

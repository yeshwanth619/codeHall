import axios from 'axios';

// Function to get data from api
export const getCryptoData = async (selectedCurrency,timeRange) => {
  try {
    const url=`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${selectedCurrency}&days=${timeRange}&interval=daily`
   
    const response = await axios.get(url)
    return response.data;
  } catch (error) {
    throw error; // Handle any errors that occur during the request
  }
};
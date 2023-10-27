import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCryptoData } from '../Api/CryptoApi';
import Chart from '../Functions/Chart';
import Table from '../Functions/Table';
import { useTable, useSortBy } from 'react-table';
import { currencyOptions, days,header, apiError, priceTable, priceChart, loading, time,currency, loadingConstant } from '../Constants/DashboardConstants';
import { loop } from '../Functions/ReUseFunctions';
import './Dashboard.css';

function Dashboard() {
  // State variables
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [interval, setInterval] = useState('daily');
  const [selectedCurrency, setSelectedCurrency] = useState('usd'); 
  const[apiError,setApiError]=useState(false)

  // Fetch data from API when timeRange or selectedCurrency changes
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCryptoData(selectedCurrency, timeRange);
      
        // Format API data
        const data = response.prices.map((entry) => ({
          time: new Date(entry[0]).toLocaleDateString(),
          price: entry[1],
        }));

        // Update state with formatted data
        setCryptoData(data);
        setLoading(false);
        setApiError(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiError(true)
        setLoading(false);
      }
    }

    fetchData();
  }, [timeRange, selectedCurrency]);

  return (
    <div className='DashboardMain'>
      {/* Header */}
      <div className='header'>{header}</div>

      <div className='dashboard-container'>
        {/* Selectors */}
        <div className="select-container">
          <div className="select-wrapper">
            <label className='timeRangeLabel'>{time}</label>
            <select
              id="dropDownSelect"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              {loop(days)}
            </select>
          </div>
          <div className="select-wrapper">
            <label className='currencyLabel'>{currency}</label>
            <select
              id="dropDownSelect"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {loop(currencyOptions)}
            </select>
          </div>
        </div>

        {loading ? (
          // Loading indicator
          <p>{loadingConstant}</p>
        ):!apiError? (
          // Data presentation
          <div className="container text-center">
            <div className="row">
              {/* Price Chart */}
              <div className="col col-lg-6 col-xl-6 col-md-12 col-xs-12 col-sm-12">
                <div className='chartLabel'>{priceChart}</div>
                <Chart cryptoData={cryptoData}/>
              </div>
              {/* Price Table */}
              <div className="col col-lg-6 col-xl-6 col-md-12 col-xs-12 col-sm-12">
                <h2 className='chartLabel'>{priceTable}</h2>
                <Table cryptoData={cryptoData}/>
              </div>
            </div>
          </div>
        ):
    <div className='error'>
       {apiError}
    </div>
    
    }
      </div>
    </div>
  );
}

export default Dashboard;

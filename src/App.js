// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Coins from './components/Coins';
import Navbar from './components/Navbar';
import Coin from './routes/Coin';
import CoinItem from './components/CoinItem';
import './App.css';

function App() {

  const [coins, setCoins] = useState([]);

  //https://www.coingecko.com/en/api/documentation

  const url = process.env.REACT_APP_LIST_OF_COINS_URL;

  useEffect(() => {
    const getCoins = async () => {

      try {
        const { data } = await axios.get(url);
        setCoins(data);
      } catch(err) {
        console.log(err)
      }
    }

    getCoins();
  }, [url]);

  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Coins coins={coins}/>}/>
          <Route path='/coin/' element={<Coin />}>
            <Route path=':coinId' element={<CoinItem />}/>
          </Route  >
        </Routes>
      </Router>
    </>
  );
}

export default App;

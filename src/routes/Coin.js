// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import "./coin.css";

const Coin = () => {

    let { coinId } = useParams();
    const url = process.env.REACT_APP_COIN_URL + coinId;
    
    const [coin, setCoin] = useState({});

    useEffect(() => {
        const getCoin = async () => {
            try {
                const coin = await axios.get(url);
                setCoin(coin.data);

            } catch(err) {
                console.log(err);
            }
        }
        getCoin();
    }, [coinId, url]);

    console.log(coin);


    return (
        <>
            <div className='coin-container'>
                <div className='content'>
                    <h1>{coin.name}</h1>
                </div>
                <div className='content'>
                    <div className='rank'>
                        <span className='rank-btn'>
                            Rank # {coin.market_cap_rank}
                        </span>
                    </div>
                    <div className='info'>
                        <div className='coin-heading'>
                        {
                            coin.image ? <img src={coin.image.small} alt={coin.id} /> : null
                        }
                            <p>{coin.name}</p>
                            <p>{coin.symbol}</p>
                        </div>
                        <div className='coin-price'>
                        {
                            coin.market_data?.current_price ? <h1>PLN {coin.market_data.current_price.pln.toLocaleString()}</h1> : null
                        }
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <table>
                        <thead>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>14d</th>
                                <th>30d</th>
                                <th>1yr</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                {
                                    coin.market_data?.price_change_percentage_1h_in_currency ? <p>{coin.market_data.price_change_percentage_1h_in_currency.pln.toFixed(2)}</p> : null
                                }
                                </td>
                                <td>
                                {
                                    coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_24h_in_currency.pln.toFixed(2)}</p> : null
                                }
                                </td>
                                <td>
                                {
                                    coin.market_data?.price_change_percentage_7d_in_currency ? <p>{coin.market_data.price_change_percentage_7d_in_currency.pln.toFixed(2)}</p> : null
                                }
                                </td>
                                <td>
                                {
                                    coin.market_data?.price_change_percentage_14d_in_currency ? <p>{coin.market_data.price_change_percentage_14d_in_currency.pln.toFixed(2)}</p> : null
                                }
                                </td>
                                <td>
                                {
                                    coin.market_data?.price_change_percentage_30d_in_currency ? <p>{coin.market_data.price_change_percentage_30d_in_currency.pln.toFixed(2)}</p> : null
                                }
                                </td>
                                <td>
                                {
                                    coin.market_data?.price_change_percentage_1y_in_currency ? <p>{coin.market_data.price_change_percentage_1y_in_currency.pln.toFixed(2)}</p> : null
                                }
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='content'>
                    <div className='stats'>
                        <div className='left'>
                            <div className='row'>
                                <h4>24 Hour Low</h4>
                                {coin?.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
                            </div>
                            <div className='row'>
                                <h4>24 Hour High</h4>
                                {coin?.market_data?.high_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}                            </div>

                        </div>
                        <div className='right'>
                            <div className='row'>
                                <h4>Market Cap</h4>
                                {coin?.market_data?.market_cap ? <p>${coin.market_data.market_cap.usd.toLocaleString()}</p> : null}
                            </div>
                            <div className='row'>
                                <h4>Circulating Supply</h4>
                                {coin?.market_data ? <p>{coin.market_data.circulating_supply}</p> : null}
                            </div>

                        </div>
                    </div>
                </div>

                <div className='content'>
                    <div className='about'>
                        <h3>About</h3>
                        <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(coin?.description ? coin.description.en : ''),
                        }}>
                        </p>
                    </div>
                </div>
        </div>
    </>
    );
};

export default Coin;

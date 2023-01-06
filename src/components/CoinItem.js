import React from 'react'

const CoinItem = ({ coin }) => {

    return (
        <div className='coin-row'>
            <p>{coin.market_cap_rank}</p>
            <div className='img-symbol'>
                <img src={coin.image} alt={coin.symbol}/>
                <p>{coin.symbol}</p>
            </div>
            <p>{coin.current_price} $</p>
            <p>{coin.price_change_percentage_24h} %</p>
            <p className='hide-mobile'>{coin.total_volume} $</p>
            <p className='hide-mobile'>{coin.market_cap} $</p>
        </div>
    )
}

export default CoinItem
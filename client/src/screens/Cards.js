import React from 'react'
import CardItem from '../components/CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className='cards'>
            <h1>Check out these epic destinations!</h1>
            <div className='cards__container'>
                <ul className='cards__items'>
                    <CardItem
                        src="images/waterfall.jpg"
                        text="Explore the hidden waterfall deep inside the Amazon Jungle"
                        label="Adventure"
                        path='/services' />
                    <CardItem
                        src="images/waterfall.jpg"
                        text="Meh"
                        label="Luxury"
                        path='/services' />
                        <CardItem
                        src="images/waterfall.jpg"
                        text="Explore the hidden waterfall deep inside the Amazon Jungle"
                        label="Adventure"
                        path='/services' />
                        <CardItem
                        src="images/waterfall.jpg"
                        text="Explore the hidden waterfall deep inside the Amazon Jungle"
                        label="Adventure"
                        path='/services' />
                </ul>
            </div>
        </div>
    )
}

export default Cards
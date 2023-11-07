import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import './LandingScreen.css'
import { Button } from '../components/Button'
import Cards from './Cards'
import Footer from './Footer'

function LandingScreen() {
    return (
        <><div className='hero-container'>
            <video src='batanes.mp4' autoPlay loop muted />
            <h1>Adventure awaits</h1>
            <p>Let's make your dream vacation come true...</p>
            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>GET STARTED</Button>
                <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'><i className='far fa-play-circle'></i> Watch Trailer </Button>
            </div>
        </div>
            <div>
                <Cards />
            </div>
            <div>
                <Footer/>
            </div></>
    )
}

export default LandingScreen
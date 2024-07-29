import React from 'react'
import { Link } from 'react-router-dom'
import HeaderImg from '../../assets/header-img.png';
import Navbar from '../Navbar/Navbar';

const LandingPage = () => {
  return (
     <div>
     <header>
     <Navbar/>
       <section className="hero-section">
         <div className="hero-text">
           <div>
             <h1>Craft, Share, Connect: <i>Your Stories, Amplified</i></h1>
             <p>
               Unleash Your Creativity, Share Your Stories, Connect with Readers Worldwide
             </p>
           </div>
           <Link to="/login">
             <button className="hero-btn">
               Create Your Blog
             </button>
           </Link>
         </div>
         <div className="hero-img">
           <img src={HeaderImg} alt="Hero" />
         </div>
       </section>
     </header>
   </div>
  )
}

export default LandingPage
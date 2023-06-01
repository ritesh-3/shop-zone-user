import React from 'react'
import Header from '../components/Header/Header'; 
import CheckoutSteps from '../components/Checkout/CheckoutSteps'; 
import Checkout from '../components/Checkout/Checkout'; 
import Footer from '../components/Home/Footer'; 

const CheckoutPage = () => {
  return (
    <div>
        <Header />
        <div className='mt-5'>
        <CheckoutSteps active={1} />
        <Checkout />
        </div>
        {/* <Footer /> */}
    </div>
  )
}

export default CheckoutPage
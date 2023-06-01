import React from 'react'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Header from '../components/Header/Header'
import Payment from "../components/Payment/Payment"
import Footer from '../components/Home/Footer'

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header />
       <div className='mt-5'>
       <CheckoutSteps active={2} />
       <Payment />
       </div>
       {/* <Footer /> */}
    </div>
  )
}

export default PaymentPage
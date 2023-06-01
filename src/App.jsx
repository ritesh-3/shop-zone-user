import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import useDarkMode from '../src/custom-hooks/darkMode'
import useAppReload from './custom-hooks/AppReload'
import ProductsPage from './pages/ProductPage'
import EventsPage from './pages/EventsPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import FAQPage from './pages/FAQpage'
import CheckoutPage from './pages/CheckoutPage'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import PaymentPage from './pages/PaymentPage'
import axios from 'axios'
import { server } from './ServerConfigs'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ActivationPage from './pages/ActivationPage'
import ProfilePage from './pages/ProfilePage'
import MyProfle from './components/Profile/MyProfile'
import ChangePassword from './components/Profile/ChangePassword'
import Address from './components/Profile/Address'
import MyOrders from './components/Profile/MyOrders'
import Myrefunds from './components/Profile/MyRefunds'
import UserOrderDetails from './pages/OrderDetailsPage'
import TrackOrderPage from './pages/TrackOrderPage'
import ProtectedRoute from './components/ProtectedRoute'
import AlredyLoggedInProtectRoute from './components/AlredyLoggedInProtectRoute'
import NotFound from './pages/NotFound'
import OrderSuccessPage from './pages/OrderSuccessPage'

function App() {
  const [count, setCount] = useState(0)
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useAppReload();

  useEffect(() => {
    getStripeApikey();
  }, [])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<AlredyLoggedInProtectRoute> <LoginPage /></AlredyLoggedInProtectRoute>} />
          <Route path='/signup' element={<AlredyLoggedInProtectRoute> <SignupPage /> </AlredyLoggedInProtectRoute> } />
          <Route path="/activation/:activation_token" element={<ActivationPage />}
          />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/events' element={< EventsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} >
            <Route path="" element={<ProtectedRoute> <MyProfle /> </ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute>  <MyOrders /></ProtectedRoute>} />
            <Route path="refunds" element={<Myrefunds />} />
            <Route path="track-order" element={<Myrefunds />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="address" element={<Address />} />
            {/* Add more routes for other profile sections */}
          </Route>
          <Route path="/user/order/:id" element={<ProtectedRoute> <UserOrderDetails /></ProtectedRoute>} />
          <Route path="/user/track/order/:id" element={<ProtectedRoute> <TrackOrderPage /></ProtectedRoute>} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route path='*' element={<NotFound />} />
          {/* <Route path="/payment" element={<PaymentPage />} /> */}
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </div>
  )
}

export default App

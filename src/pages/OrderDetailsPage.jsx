import React from 'react'
import UserOrderDetails from '../components/Order/UserOrderDetails'
import Header from '../components/Header/Header'
import styles from '../components/Styles/styles'

const OrderDetailsPage = () => {
    return (
        <div className='App'>
            <Header />
            <div className={styles.innerPading}>
                <UserOrderDetails />
            </div>
        </div>
    )
}

export default OrderDetailsPage

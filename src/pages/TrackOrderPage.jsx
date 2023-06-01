import React from 'react'
import Header from '../components/Header/Header'
import styles from '../components/Styles/styles'
import TrackOrder from '../components/TrackOrder/TrackOrder'

const TrackOrderPage = () => {
    return (
        <div className='App'>
            <Header />
            <div className={styles.innerPading}>
                <TrackOrder />
            </div>
        </div>
    )
}

export default TrackOrderPage

import React from 'react'
import useDarkMode from '../custom-hooks/darkMode';
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header/Header';
import Hero from '../components/Home/Hero';
import styles from '../components/Styles/styles';
import HomeList from '../components/Home/HomeList';
import { categoryData } from '../components/Data/data';
import FeaturedProduct from '../components/Home/FeaturedProducts';
import Events from '../components/EventCard/Events';
import Footer from '../components/Home/Footer';

const HomePage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });


  const [darkMode, toggleDarkMode] = useDarkMode();
  return (
    <div className='App'>
      <Header />
      <div className={styles.innerPading}>
        <Hero />
        <HomeList title="Category" data={categoryData} />
        <FeaturedProduct />
        <Events />

      </div>
      <Footer />
    </div>

  )
}

export default HomePage
HomePage
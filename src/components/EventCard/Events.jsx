import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../Styles/styles';
import EventCard from './EventCard';

const Events = () => {
  const { events, isLoading } = useSelector((state) => state.events);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className={styles.homeTitle}>Popular Events</h2>
      <div className="w-full grid">
        {events.map((event) => (
          <EventCard key={event._id} data={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;

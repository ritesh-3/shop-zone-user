import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/EventCard/EventCard"; 
import Header from "../components/Header/Header"; 
import Loader from "../components/Loader";

const EventsPage = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header active={2} />
          <EventCard active={true} data={events && events[0]} />
        </div>
      )}
    </>
  );
};

export default EventsPage;

import { useState, useCallback } from 'react';
import axios from 'axios';

const useFetchEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/events');
      setEvents(response.data.data.events); 
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { events, loading, error, fetchEvents };
};

export default useFetchEvent;

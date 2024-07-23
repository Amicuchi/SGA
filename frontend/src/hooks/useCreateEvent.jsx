import { useState } from 'react';
import axios from 'axios';

const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerEvent = async (eventData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/events', eventData);
      return response.data;
    } catch (err) {
      console.error('Error creating event:', err); // Adiciona logging de erro
      setError(err.response ? err.response.data : 'Erro ao criar evento');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerEvent };
};

export default useCreateEvent;

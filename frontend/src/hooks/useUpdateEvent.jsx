import { useState } from 'react';
import axios from 'axios';

const useUpdateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateEvent = async (idEvent, eventData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/events/${idEvent}`, eventData);
      return response.data;
    } catch (err) {
      console.error('Error updating event:', err); // Adiciona logging de erro
      setError(err.response ? err.response.data : 'Erro ao atualizar evento');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateEvent };
};

export default useUpdateEvent;

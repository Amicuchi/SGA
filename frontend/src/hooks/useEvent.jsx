import { useState, useCallback } from 'react';
import axios from 'axios';

const useEvent = () => {
  const [event, setEvent] = useState(null);          // Estado para armazenar os dados do usuário
  const [loading, setLoading] = useState(false);     // Estado para carregar os dados
  const [error, setError] = useState(null);          // Estado para armazenar erros

  // Função para buscar dados do evento
  const fetchEvent = useCallback(async (idEvent) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/auth/events/${idEvent}`);
      setEvent(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro ao buscar evento');
    } finally {
      setLoading(false);
    }
  }, []);

  return { event, loading, error, fetchEvent };
};

export default useEvent;

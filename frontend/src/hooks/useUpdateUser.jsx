import { useState } from 'react';
import axios from 'axios';

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (id, userData) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/auth/users/${id}`, userData);
    } catch (err) {
      setError('Erro ao atualizar o usuário');
      throw err; // Retorna o erro para tratamento posterior, se necessário.
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;

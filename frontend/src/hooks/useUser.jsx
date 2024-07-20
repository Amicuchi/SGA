import { useState, useCallback } from 'react';
import axios from 'axios';

const useUser = () => {
    const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(false); // Estado para carregar os dados
    const [error, setError] = useState(null); // Estado para armazenar erros

    // Função para buscar dados do usuário
    const fetchUser = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/auth/users/${id}`);
            setUser(response.data.data.user);
            setError(null);
        } catch (err) {
            setError('Erro ao buscar os dados do usuário');
        } finally {
            setLoading(false);
        }
    }, []);

    return { user, loading, error, fetchUser };
};

export default useUser;

import { useState, useCallback } from 'react';
import axios from 'axios';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/auth/users');
      setUsers(response.data.data.users); 
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, loading, error, fetchUsers };
};

export default useFetchUsers;

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { message } from 'antd';

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const loginUser = async (values) => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        const data = await res.json();
  
        if (res.status === 200) {
          message.success(data.message);
          login(data.token, data.user);
          navigate('/dashboard');
        } else if (res.status === 404) {
          setError(data.message);
        } else {
          message.error(data.message || 'Login failed');
        }
      } catch (error) {
        message.error(error.message);
        console.error('An error occurred during login');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, error, loginUser };
  };
  
  export default useLogin;
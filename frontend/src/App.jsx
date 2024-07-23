import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/App.css';
import useAuth from './hooks/useAuth';

import Login from './pages/Login';            // Página de Login
import Dashboard from './pages/Dashboard';    // Dashboard

// Importação das páginas da aplicação
import Register from './components/Register'; // Cadastro e Atualização de usuários
import UserList from './components/UserList'; // Listagem de Usuários cadastrados
import Bills from './components/Bills';       // Página de Cadastro de Contas
import Events from './components/Events';     // Página de Cadastro de Eventos

function App() {
  const { isAuthenticated } = useAuth

  return (
    <Router>
      <div className="background-container"></div>
      <div className="content">
      <Routes>
        <Route path='/' element={ !isAuthenticated ? <Login /> : <Navigate to='/dashboard' /> } />
        <Route path='/login' element={ !isAuthenticated ? <Login /> : <Navigate to='/dashboard' /> } />
        <Route path="/dashboard" element={ !isAuthenticated ? <Dashboard /> : <Navigate to="/login" /> }>
            <Route path="register" element={<Register />} />
            <Route path="edit/:id" element={<Register />} />
            <Route path="userList" element={<UserList />} />
            <Route path="bills" element={<Bills />} />
            <Route path="events" element={<Events />} />
        </Route>
      </Routes>
      </div>
    </Router>
  )
}

export default App
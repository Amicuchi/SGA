import useAuth from '../hooks/useAuth';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout, Menu } from "antd";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const {userData, isAuthenticated, logout} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona para a página de login se o usuário não estiver autenticado
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Adiciona uma verificação para garantir que userData não é nulo
  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  }

  return (
    <Layout style={{ height:"900px"}} className='ContainerMain'>

      {/* Barra de menu lateral esquerda */}
      <Sider width={200} style={{ background: "#fff", padding: "2rem 0.5rem 1rem", margin:"1rem", width: "200px", height:"850px"}} className='BarraLateral'>
        <Menu mode="inline" style={{ maxHeight: "800px", borderRight: 0 }} className='MenuBotoes'>
          <Menu.Item key="1" >
            <Link to="/dashboard/register">Cadastro de Usuários</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/dashboard/userList">Lista de Usuários</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/dashboard/bills">Contas</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/dashboard/events">Eventos</Link>
          </Menu.Item>
          <Menu.Item 
            key="5" 
            onClick={handleLogout} 
            style={{ cursor: 'pointer', background: 'red', color: 'white' }}
          >
            Sair
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ padding: "0 1rem", margin:"1rem", width: "800px", height:"850px"}} className='ContainerDireita'>
        <Header style={{ background: "#fff", padding: 0, textAlign: 'center' }}>
          <h1>Sistema Gerenciador de Academias</h1>
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 500,
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;



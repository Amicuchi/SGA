import { Table, Button, Spin, Alert, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import useFetchUsers from '../hooks/useFetchUsers';

const UserList = () => {
  const navigate = useNavigate();
  const { users, loading, error, fetchUsers } = useFetchUsers();

  useEffect(() => {
    fetchUsers(); // Buscar usuários ao montar o componente
  }, [fetchUsers]);

  const columns = [
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, record) => (
        <span className="actions-buttons">
            <Button 
                type="primary" 
                onClick={() => handleEdit(record)} 
                icon={<EditOutlined />} 
            />
            <Button 
                type="danger" 
                onClick={() => handleDelete(record)} 
                icon={<DeleteOutlined />} 
                style={{ background:"#d6470e"}} 
            />
        </span>
      ),
    },
  ];

  const handleEdit = (record) => {
    navigate(`/dashboard/edit/${record._id}`);
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:3000/api/auth/users/${record._id}`);
      console.log('Usuário deletado com sucesso');
      message.success('Usuário deletado com sucesso');
      fetchUsers(); // Atualizar a lista de usuários após exclusão
    } catch (error) {
      console.log('Erro ao deletar o usuário', error);
      message.error('Erro ao deletar o usuário');
    }
  };

  if (loading) return <Spin />;
  if (error) return <Alert message="Erro ao carregar os usuários" type="error" />;

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="_id"
    />
  );
};

export default UserList;

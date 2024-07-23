import { Table, Button, Spin, Alert, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import useFetchEvent from '../hooks/useFetchEvent';

const EventList = () => {
  const navigate = useNavigate();
  const { events, loading, error, fetchEvents } = useFetchEvent();

  useEffect(() => {
    fetchEvents(); // Buscar eventos ao montar o componente
  }, [fetchEvents]);

  const columns = [
    {
        title: 'Tipo',
        dataIndex: 'eventType',
        key: 'eventType',
    },
    {
        title: 'Data',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Nome',
        dataIndex: 'nomeEvent',
        key: 'nomeEvent',
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
    navigate(`/dashboard/edit-event/${record._id}`);
  };

  const handleDelete = async (record) => {
    try {
      // await axios.delete(`/api/events/${record._id}`);
      await axios.delete(`http://localhost:3000/api/events/${record._id}`);
      console.log('Evento deletado com sucesso');
      message.success('Evento deletado com sucesso');
      fetchEvents(); // Atualizar a lista de eventos após exclusão
    } catch (error) {
      console.log('Erro ao deletar o evento', error);
      message.error('Erro ao deletar o evento');
    }
  };

  if (loading) return <Spin />;
  if (error) return <Alert message="Erro ao carregar os eventos" type="error" />;

  return (
    <Table
      dataSource={events}
      columns={columns}
      rowKey="_id"
    />
  );
};

export default EventList;

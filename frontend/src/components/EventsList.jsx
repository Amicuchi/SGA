import { Table, Button, Spin, Alert, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import useFetchEvents from '../hooks/useFetchEvents'; // Ajuste para o seu hook de eventos

const EventList = () => {
  const navigate = useNavigate();
  const { events, loading, error, fetchEvents } = useFetchEvents();

  useEffect(() => {
    fetchEvents(); // Buscar eventos ao montar o componente
  }, [fetchEvents]);

  const columns = [
    {
      title: 'Data',
      dataIndex: 'date', // Ajuste para a propriedade correta do evento
      key: 'date',
    },
    {
      title: 'Local',
      dataIndex: 'location', // Ajuste para a propriedade correta do evento
      key: 'location',
    },
    {
      title: 'Descrição',
      dataIndex: 'description', // Ajuste para a propriedade correta do evento
      key: 'description',
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
    navigate(`/dashboard/edit-event/${record._id}`); // Ajuste a URL conforme necessário
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/${record._id}`); // Ajuste a URL conforme necessário
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

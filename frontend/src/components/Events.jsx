import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams para acessar parâmetros da URL
import { Alert, Button, Col, DatePicker, Form, Input, message, Row, Select, Spin, Typography } from 'antd';
import useCreateEvent from '../hooks/useCreateEvent'; // Hook para manipulação de cadastro e edição de usuários
import useEvent from '../hooks/useEvent'; // Hook para buscar dados do evento a ser editado
import useUpdateEvent from '../hooks/useUpdateEvent';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';


const { TextArea } = Input;
const { Option } = Select;

const Events = () => {

  const { idEvent } = useParams(); // Obtém o ID do evento da URL, se disponível (usando o hook useParams do react-router-dom)
  const { loading, error, registerEvent } = useCreateEvent(); // Funções para criar e atualizar evento
  const { event, loading: eventLoading, fetchEvent } = useEvent(); // Usado para buscar e editar o evento
  const [form] = Form.useForm(); // Form instance => Formulário do Ant Design
  const navigate = useNavigate(); // Navegação para redirecionar após a operação
  const { updateEvent } = useUpdateEvent();

  // Lista de tipos de evento
  const eventTypes = [
    'Aulão', 
    'Campeonato',
    'Graduação',
    'Seminário', 
    'Viagem',
    'Workshop'
  ]; 

  // Busca dados do evento se estamos editando (baseado no ID)
  useEffect(() => {
    if (idEvent) {
        fetchEvent(idEvent); // Busca o evento se um ID estiver presente
    }
}, [idEvent, fetchEvent]);

// Preenche o formulário com dados do evento, se existir
useEffect(() => {
  if (event) {
    form.setFieldsValue({
      ...event,
      dataEvento: event.dataEvento ? dayjs(event.dataEvento) : null,
      idEvento: event.idEvento || uuidv4() // Gerar ID alfanumérico automaticamente se não existir
    });
  } else {
    form.setFieldsValue({
      idEvento: uuidv4() // Gerar ID alfanumérico automaticamente para novos eventos
    });
  }
}, [event, form]);

// Manipula o envio do formulário para criar ou atualizar o evento
const handleRegisterEvent = async (values) => {
    try {
      if (idEvent) {
        await updateEvent(idEvent, values); // Atualiza o evento existente
        message.success('Evento atualizado com sucesso');
      } else {
        await registerEvent(values); // Cria um novo evento
        message.success('Evento criado com sucesso');
      }
      navigate('/dashboard/eventList');
    } catch (err) {
      message.error('Erro ao salvar o evento');
    }
};

// Manipula o botão Limpar
const handleClear = () => {
    form.resetFields();   // Limpa o formulário
    form.setFieldsValue({ idEvento: uuidv4() });  // Gerar novo ID alfanumérico ao limpar
};

if (eventLoading) return <Spin />; // Mostra o spinner de carregamento se estiver buscando o usuário

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
            <Typography.Title level={2} strong className='title'>
                {idEvent ? 'Editar Evento' : 'Cadastro de Evento'}
            </Typography.Title>

            <Form 
                form={form}
                id="event-form"
                layout='vertical' 
                onFinish={handleRegisterEvent} 
                autoComplete='off' 
                style={{ 
                    padding: '1.5rem', 
                    background: '#fff', 
                    boxShadow: '0 0 5px #ccc', 
                    borderRadius: '5px',
                }}
            >
              <Row gutter={16}>
                  <Col span={8}>
                      <Form.Item
                        label='Usuário Responsável'
                        name='responsavel'
                        rules={[
                          { required: true, message: 'Insira o Usuário Responsável' }
                        ]}
                      >
                        <Input size="large" placeholder='Usuário Responsável' />
                      </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="idEvent"
                      label="Id do Evento"
                      rules={[{ required: true, message: 'Insira a identificação do Evento' }]}
                    >
                      <Input size='large' placeholder="Id do Evento" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label='Tipo do Evento'
                      name='eventType'
                      rules={[
                        { required: true, message: 'Insira o Tipo do Evento' }
                      ]}
                    > 
                      {/* <Input size="large" placeholder='Tipo do Evento' />   */}
                      <Select
                        size="large"
                        placeholder='Selecione ou insira o Tipo do Evento'
                        allowClear
                        dropdownRender={menu => (
                          <>
                            {menu}
                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                              <Input style={{ flex: 'auto' }} placeholder="Adicionar novo tipo" onPressEnter={(e) => {
                                const value = e.target.value;
                                if (value && !eventTypes.includes(value)) {
                                  eventTypes.push(value);
                                  form.setFieldsValue({ tipoEvento: value });
                                }
                              }} />
                            </div>
                          </>
                        )}
                      >
                        {eventTypes.map(type => (
                          <Option key={type} value={type}>
                            {type}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label='Nome'
                  name='nomeEvent'
                  rules={[
                      { required: true, message: 'Insira o Nome do Evento' },
                  ]}
                >
                  <Input size="large" placeholder='Nome do Evento' />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label='Data'
                      name='dataEvento'
                      rules={[
                        {
                          required: true, message: 'Insira o Nome do Evento',
                          validator: (_, value) =>
                            value && !isNaN(Date.parse(value))
                              ? Promise.resolve()
                              : Promise.reject(new Error('Insira uma data válida'))
                        }
                      ]}
                    >
                      <DatePicker format="DD-MM-YYYY" size="large" placeholder='Data' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label='Horário de Início'
                      name='horarioInicio'
                    >
                      <Input size="large" placeholder='Horário de Início' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Horário de Fim"
                      name="horarioFim"
                    >
                      <Input placeholder="Horário de Fim" size='large'/>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item
                  name="descricao"
                  label="Descrição"
                >
                  <TextArea placeholder="Descrição" size='large' rows={3} />
                </Form.Item>

                <Form.Item
                  name="maisInformacoes"
                  label="Mais informações"
                >
                  <TextArea placeholder="Mais informações" size='large' rows={3} />
                </Form.Item>

                {error && <Alert 
                    description={error} 
                    type='error' 
                    showIcon 
                    closable
                    className='alert'
                />}

                <Form.Item>
                    <Button
                        type={`${loading ? '' : 'primary'}`}
                        htmlType='submit'
                        size='large'
                        className='btn'
                    >
                        {loading ? <Spin /> : 'Salvar'}
                    </Button>

                    <Button 
                        htmlType="button" 
                        size='large'
                        className='btn'
                        onClick={handleClear}
                        style={{ marginLeft: "1.5rem" }}
                    >
                        Limpar
                    </Button>
                </Form.Item>
            </Form>
        </div>
  )
}

export default Events

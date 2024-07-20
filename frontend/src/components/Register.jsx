import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams para acessar parâmetros da URL
import { Alert, Button, Col, Form, Input, message, Row, Spin, Typography } from 'antd';
import useSignup from '../hooks/useSignup'; // Hook para manipulação de cadastro e edição de usuários
import useUser from '../hooks/useUser'; // Hook para buscar dados do usuário a ser editado
import useUpdateUser from '../hooks/useUpdateUser';

const Register = () => {
    const { id } = useParams(); // Obtém o ID do usuário da URL, se disponível (usando o hook useParams do react-router-dom)
    const { loading, error, registerUser } = useSignup(); // Funções para criar e atualizar usuários
    const { user, loading: userLoading, fetchUser } = useUser(); // Usado para buscar e editar o usuário
    const [form] = Form.useForm(); // Form instance => Formulário do Ant Design
    const navigate = useNavigate(); // Navegação para redirecionar após a operação
    const { updateUser } = useUpdateUser();

    // Busca dados do usuário se estamos editando (baseado no ID)
    useEffect(() => {
        if (id) {
            fetchUser(id); // Busca o usuário se um ID estiver presente
        }
    }, [id, fetchUser]);

    // Preenche o formulário com dados do usuário, se existir
    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);

    // Manipula o envio do formulário para criar ou atualizar o usuário
    const handleRegister = async (values) => {
        try {
          if (id) {
            await updateUser(id, values); // Atualiza o usuário existente
            message.success('Usuário atualizado com sucesso');
          } else {
            await registerUser(values); // Cria um novo usuário
            message.success('Usuário criado com sucesso');
          }
          navigate('/dashboard/userList');
        } catch (err) {
          message.error('Erro ao salvar o usuário');
        }
    };

    // Manipula o botão Limpar
    const handleClear = () => {
        form.resetFields();  // Limpa o formulário
    };

    if (userLoading) return <Spin />; // Mostra o spinner de carregamento se estiver buscando o usuário

    return (
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
            <Typography.Title level={2} strong className='title'>
                {id ? 'Editar Usuário' : 'Cadastro de Usuário'}
            </Typography.Title>

            <Form 
                form={form}
                id="register-form"
                layout='vertical' 
                onFinish={handleRegister} 
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
                            label='Tipo de Usuário'
                            name='role'
                            rules={[
                                { required: true, message: 'Insira o tipo de usuário' }
                            ]}
                        >
                            <Input size="large" placeholder='Tipo de Usuário' />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            name="cpf"
                            label="CPF"
                            rules={[{ required: true, message: 'Insira o CPF' }]}
                        >
                            <Input placeholder="CPF" size='large'/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label='Nome completo'
                    name='name'
                    rules={[
                        { required: true, message: 'Insira seu nome completo' }
                    ]}
                >
                    <Input size="large" placeholder='Nome completo' />  
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            label='E-mail'
                            name='email'
                            rules={[
                                { required: true, message: 'Insira seu email' },
                                { type: 'email', message: 'Insira um email válido' }
                            ]}
                        >
                            <Input size="large" placeholder='E-mail' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label='Senha'
                            name='password'
                            rules={[
                                { required: true, message: 'Insira sua senha' }
                            ]}
                        >
                            <Input.Password size="large" placeholder='Senha' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label='Confirmação de senha'
                            name='passwordConfirm'
                            rules={[
                                { required: true, message: 'Insira sua senha novamente' }
                            ]}
                        >
                            <Input.Password size="large" placeholder='Confirmação de senha' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="telefone"
                            label="Telefone"
                            rules={[{ required: true, message: 'Insira o telefone' }]}
                        >
                            <Input placeholder="Telefone" size='large'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="cep"
                            label="CEP"
                        >
                            <Input placeholder="CEP" size='large'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="logradouro"
                            label="Logradouro"
                        >
                            <Input placeholder="Logradouro" size='large'/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="numero"
                            label="Número"
                        >
                            <Input placeholder="Número" size='large'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="complemento"
                            label="Complemento"
                        >
                            <Input placeholder="Complemento" size='large'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="bairro"
                            label="Bairro"
                        >
                            <Input placeholder="Bairro" size='large'/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item
                            name="cidade"
                            label="Cidade"
                        >
                            <Input placeholder="Cidade" size='large'/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="uf"
                            label="UF"
                        >
                            <Input placeholder="UF" size='large'/>
                        </Form.Item>
                    </Col>
                </Row>

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
    );
}

export default Register;


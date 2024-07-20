import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd';
import loginImage from '../assets/loginImage.png';
import useLogin from '../hooks/useLogin';
import "../styles/Login.css";

const Login = () => {

  const { loading, error, loginUser } = useLogin();

  const handlerLogin = async (values) => {
    await loginUser(values);
  }

  return (
    <Card className='form-container'>
      <Flex gap="large" align='center'>

        {/* Image */}
        <Flex flex={1}>
          <img src={loginImage} className="auth-image" />
        </Flex>

        {/* Form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className='title'>
            Entre
          </Typography.Title>
          <Typography.Text type='secondary' strong className='slogan'>
            Libere um mundo de opções!
          </Typography.Text>

          <Form 
            layout='vertical' 
            onFinish={handlerLogin} 
            autoComplete='off' 
          >
            <Form.Item
              label='E-mail'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Insira seu email',
                },
                {
                  type: 'email',
                  message: 'Insira um email válido!',
                },
              ]}
            >
              <Input size="large" placeholder='E-mail' />
            </Form.Item>

            <Form.Item
              label='Senha'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Insira sua senha',
                },
              ]}
            >
              <Input.Password size="large" placeholder='Senha' />
            </Form.Item>

            {error && <Alert 
              description={error} 
              type='error' 
              showIcon 
              closable
              className='alert'
              />
            }

            <Form.Item>
              <Button
                type={`${loading ? '' : 'primary'}`}
                htmlType='submit'
                size='large'
                className='btn'
              >
                {loading ? <Spin /> : 'Entrar'}
              </Button>
            </Form.Item>

          </Form>
        </Flex>
      </Flex>
    </Card>
  )
}

export default Login
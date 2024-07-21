const Events = () => {
  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
            <Typography.Title level={2} strong className='title'>
                {id ? 'Editar Evento' : 'Cadastro de Evento'}
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
                            name='role'
                            rules={[
                                { required: true, message: 'Insira o Usuário Responsável' }
                            ]}
                        >
                            <Input size="large" placeholder='Usuário Responsável' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="IdEvent"
                            label="Id do Evento"
                            rules={[{ required: true, message: 'Insira a identificação do Evento' }]}
                        >
                            <Input size='large' placeholder="Id do Evento" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label='Tipo do Evento'
                        name='EventType'
                        rules={[
                            { required: true, message: 'Insira o Tipo do Evento' }
                        ]}
                      > 
                        <Input size="large" placeholder='Tipo do Evento' />  
                      </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                  label='Nome'
                  name='Nome'
                  rules={[
                      { required: true, message: 'Insira o Nome do Evento' },
                      { type: 'email', message: 'Insira um email válido' }
                  ]}
                >
                  <Input size="large" placeholder='E-mail' />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label='Data'
                      name='dataEvento'
                      rules={[
                        { required: true, message: 'Insira a data' }
                      ]}
                    >
                      <Input size="large" placeholder='Data' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label='Horário de Início'
                      name='horarioInicio'
                      rules={[
                          { required: true, message: 'Insira o Horário de Início' }
                      ]}
                    >
                      <Input.Password size="large" placeholder='Confirmação de senha' />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Horário de Fim"
                      name="horarioFim"
                      rules={[{ required: true, message: 'Insira o Horário de Fim' }]}
                    >
                      <Input placeholder="Horário de Fim" size='large'/>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item
                  name="descricao"
                  label="Descrição"
                >
                  <Input placeholder="Descrição" size='large'/>
                </Form.Item>

                <Form.Item
                  name="maisInformacoes"
                  label="Mais informações"
                >
                  <Input placeholder="Mais informações" size='large'/>
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

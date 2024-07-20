import { Typography } from 'antd';
import '../styles/Welcome.css';

const Welcome = () => {
  return (
    <div className="home-page">
      <Typography.Title level={2}>Bem-vindo ao Dashboard!</Typography.Title>
      <div className="image-welcome">
        <img src="../assets/welcome.png" alt="Tela Inicial" />
      </div>
    </div>
  );
};

export default Welcome;

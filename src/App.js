import React from 'react';
import {
  AppstoreOutlined,
  UserSwitchOutlined,
  DotChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Menu, Layout, theme } from 'antd';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player';
import './App.css';

import FAQ  from './pages/FAQ/FAQ';
import Operator from './pages/Operator/Operator';
import Client from './pages/Client/Client';
import Support from './pages/Support/Support';


const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Приложение', 'sub1', <AppstoreOutlined />, [
    getItem('Обращения', '1'),
    getItem('Баннеры', '2'),
    getItem('FAQ', '3'),
    getItem('Услуги операторов', '12'),
    getItem('Заявки на вывод средств', '13'),
  ]),

  getItem('Пользователи', 'sub2', <UserSwitchOutlined />, [
    getItem( 
      <Link to="/operator">
        Операторы
      </Link>,
      '4'),
    getItem( 
      <Link to="/client">
        Клиенты
      </Link>,
      '5'),
    getItem( 
      <Link to="/manager">
        Менеджеры
      </Link>,
      '6'),
  ]),

  getItem('Аналитика', 'sub3', <DotChartOutlined />, [
    getItem('Псих.разгрузка', '7'),
    getItem('Общение', '8'),
    getItem('Couch', '9'),
    getItem('ASMR', '10'),
  ]),

  getItem(
    <Link to="/support">
      Support
    </Link>, '14', <LogoutOutlined />),

  getItem('Выход', '11', <LogoutOutlined />),
  
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sider
          style={{
            background: '#fff',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
           <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_v47ikixh.json"
            style={{ height: '150px', width: '150px' }}
          ></Player>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={items} />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200, marginTop:30, padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 600,
                background: colorBgContainer,
              }}
            >
              <Routes>
                <Route exact path='/' element={ <Operator/> }/>
                <Route path='/client' element={ <Client/> }/>
                <Route path='/operator' element={ <Operator/> }/>
                <Route path='/support' element={ <Support/> }/>
              </Routes>
            </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
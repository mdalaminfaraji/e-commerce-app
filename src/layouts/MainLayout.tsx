import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';
import SearchBar from '../components/SearchBar';
import '../styles/MainLayout.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <Layout className="layout">
      <Header className="main-header">
        <div className="header-content-wrapper">
          <div className="logo-container">
            <ShoppingOutlined style={{ fontSize: '24px', marginRight: '16px', color: '#1890ff' }} />
            <Title level={3} style={{ margin: 0 }}>
              <Link to="/" className="main-logo">
                E-Commerce Store
              </Link>
            </Title>
          </div>

          <div className="menu-container">
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              style={{ borderBottom: 'none', background: 'transparent' }}
              items={[
                {
                  key: '/',
                  label: <Link to="/">Products</Link>,
                },
                {
                  key: '/categories',
                  label: <Link to="/categories">Categories</Link>,
                },
              ]}
            />
            
            <SearchBar />
          </div>
        </div>
      </Header>
      <Content className="main-content">
        <Outlet />
      </Content>
      <Footer className="main-footer">
        E-Commerce App ©{new Date().getFullYear()} Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default MainLayout;

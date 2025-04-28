import React from 'react';
import { Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';

const { Title } = Typography;

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        {/* Logo section - fixed width */}
        <div className="navbar-logo">
          <ShoppingOutlined style={{ fontSize: '24px', marginRight: '16px', color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0 }}>
            <Link to="/" className="main-logo">
              E-Commerce Store
            </Link>
          </Title>
        </div>

        {/* Navigation links - grow but with controlled width */}
        <div className="navbar-links">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{ background: 'transparent', border: 'none' }}
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
        </div>

        {/* Search bar - fixed width */}
        <div className="navbar-search">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

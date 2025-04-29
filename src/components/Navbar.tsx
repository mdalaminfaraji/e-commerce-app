import React from 'react';
import { Menu, Typography, Image } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const { Title } = Typography;

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Image src="/logo.png" width={32} height={32} />
          <Title level={3} style={{ margin: 0 }}>
            <Link to="/" className="main-logo">
              E-Commerce Store
            </Link>
          </Title>
        </div>
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
        <div className="navbar-search">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

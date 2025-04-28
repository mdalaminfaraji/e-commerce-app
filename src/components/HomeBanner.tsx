import React from "react";
import { Row, Col, Typography, Button, Space } from "antd";
import { ShoppingOutlined, TagOutlined, GiftOutlined, RocketOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/HomeBanner.css";

const { Title, Paragraph } = Typography;

const HomeBanner: React.FC = () => {
  return (
    <div className="home-banner">
      <div className="banner-overlay"></div>
      <Row className="banner-content" gutter={[24, 24]} align="middle">
        <Col xs={24} md={14} lg={12}>
          <div className="banner-text">
            <Title level={1}>
              Discover Premium Products for Every Need
            </Title>
            <Paragraph className="banner-description">
              Explore our extensive collection of high-quality items at competitive prices.
              From electronics to fashion, we have everything you're looking for.
            </Paragraph>
            <Space size="middle">
              <Link to="/categories">
                <Button type="primary" size="large" icon={<TagOutlined />}>
                  Browse Categories
                </Button>
              </Link>
              <Link to="/">
                <Button size="large" icon={<ShoppingOutlined />}>
                  View All Products
                </Button>
              </Link>
            </Space>
          </div>
        </Col>
        <Col xs={24} md={10} lg={12} className="banner-image-container">
          <div className="banner-image-content">
            <div className="banner-circle"></div>
            <div className="banner-product-image">
              <div className="animated-icon">
                <RocketOutlined className="icon-primary" />
              </div>
              <div className="animated-icon icon-secondary">
                <ThunderboltOutlined />
              </div>
              <div className="animated-icon icon-tertiary">
                <GiftOutlined />
              </div>
            </div>
            <div className="banner-badge">
              <span className="badge-text">New Collection</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeBanner;

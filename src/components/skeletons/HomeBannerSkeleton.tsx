import React from 'react';
import { Row, Col, Skeleton, Space } from 'antd';
import '../../styles/HomeBanner.css';
import '../../styles/Skeletons.css';

const HomeBannerSkeleton: React.FC = () => {
  return (
    <div className="home-banner skeleton-banner">
      <div className="banner-overlay"></div>
      <Row className="banner-content" gutter={[24, 24]} align="middle">
        <Col xs={24} md={14} lg={12}>
          <div className="banner-text">
            <Skeleton.Input
              active
              style={{ width: '80%', height: 60, marginBottom: 24 }}
              className="skeleton-title"
            />
            <Skeleton
              active
              paragraph={{ rows: 2, width: ['90%', '80%'] }}
              title={false}
              className="skeleton-description"
            />
            <Space size="middle" style={{ marginTop: 32 }}>
              <Skeleton.Button active style={{ width: 180, height: 40 }} />
              <Skeleton.Button active style={{ width: 180, height: 40 }} />
            </Space>
          </div>
        </Col>
        <Col xs={24} md={10} lg={12} className="banner-image-container">
          <div className="banner-image-content">
            <div className="banner-circle skeleton-circle"></div>
            <div className="skeleton-product-placeholder">
              <Skeleton.Image active style={{ width: 280, height: 280 }} />
            </div>
            <div className="banner-badge skeleton-badge">
              <Skeleton.Input active style={{ width: 70, height: 70, borderRadius: '50%' }} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeBannerSkeleton;

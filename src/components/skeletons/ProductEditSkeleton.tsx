import React from 'react';
import { Skeleton, Card, Row, Col, Space, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const ProductEditSkeleton: React.FC = () => {
  return (
    <div className="product-edit-container">
      <div className="edit-breadcrumb">
        <Skeleton.Input style={{ width: 300 }} active size="small" />
      </div>
      
      <Card className="edit-card">
        <div className="edit-header">
          <Space align="center">
            <EditOutlined />
            <Skeleton.Input style={{ width: 180 }} active size="default" />
          </Space>
          <Skeleton.Input style={{ width: 250, marginTop: 8 }} active size="small" />
        </div>
        
        <Divider />
        
        <div className="edit-form-skeleton">
          <Row gutter={[24, 16]}>
            {/* Basic Info */}
            <Col xs={24}>
              <Skeleton.Input style={{ width: 120, marginBottom: 8 }} active size="small" />
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
                <Col xs={24} md={12}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
              </Row>
            </Col>
            
            {/* Details */}
            <Col xs={24}>
              <Skeleton.Input style={{ width: 120, marginTop: 16, marginBottom: 8 }} active size="small" />
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
                <Col xs={24} md={8}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
                <Col xs={24} md={8}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
              </Row>
            </Col>
            
            {/* Price & Inventory */}
            <Col xs={24}>
              <Skeleton.Input style={{ width: 160, marginTop: 16, marginBottom: 8 }} active size="small" />
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
                <Col xs={24} md={8}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
                <Col xs={24} md={8}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
              </Row>
            </Col>
            
            {/* Dimensions */}
            <Col xs={24}>
              <Skeleton.Input style={{ width: 140, marginTop: 16, marginBottom: 8 }} active size="small" />
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
                <Col xs={24} md={8}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
                <Col xs={24} md={8}>
                  <Skeleton.Input style={{ width: '100%', height: 40, marginBottom: 16 }} active />
                </Col>
              </Row>
            </Col>
            
            {/* Description */}
            <Col xs={24}>
              <Skeleton.Input style={{ width: 140, marginTop: 16, marginBottom: 8 }} active size="small" />
              <Skeleton.Input style={{ width: '100%', height: 120, marginBottom: 16 }} active />
            </Col>
            
            {/* Tags */}
            <Col xs={24}>
              <Skeleton.Input style={{ width: 70, marginTop: 16, marginBottom: 8 }} active size="small" />
              <div className="skeleton-tags">
                {Array(5).fill(null).map((_, index) => (
                  <Skeleton.Button key={index} active style={{ width: 70, marginRight: 8, marginBottom: 8 }} />
                ))}
              </div>
            </Col>
            
            {/* Submit buttons */}
            <Col xs={24} style={{ marginTop: 24, textAlign: 'right' }}>
              <Skeleton.Button active style={{ width: 100, marginRight: 16 }} />
              <Skeleton.Button active style={{ width: 100 }} />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default ProductEditSkeleton;

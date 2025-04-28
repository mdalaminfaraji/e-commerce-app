import React from 'react';
import { Skeleton, Card, Row, Col, Space, Divider } from 'antd';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="product-detail-container">
      <div className="product-detail-breadcrumb">
        <Skeleton.Input style={{ width: 250 }} active size="small" />
      </div>
      
      <Card className="product-detail-card">
        <Row gutter={[32, 24]}>
          {/* Product Images Section */}
          <Col xs={24} md={12}>
            <div className="product-image-section">
              <Skeleton.Image active style={{ width: '100%', height: 400 }} />
              <div className="product-thumbnails">
                {Array(4).fill(null).map((_, index) => (
                  <Skeleton.Image active key={index} style={{ width: 80, height: 80 }} />
                ))}
              </div>
            </div>
          </Col>
          
          {/* Product Info Section */}
          <Col xs={24} md={12}>
            <div className="product-info-section">
              <Skeleton.Input style={{ width: '70%', height: 32 }} active size="large" />
              <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
                <Skeleton.Input style={{ width: '40%' }} active size="small" />
                <Skeleton.Input style={{ width: '30%' }} active size="small" />
                <Skeleton.Input style={{ width: '25%' }} active size="small" />
              </Space>
              
              <Divider />
              
              <Skeleton.Input style={{ width: '90%' }} active />
              <Skeleton.Input style={{ width: '90%' }} active />
              <Skeleton.Input style={{ width: '60%' }} active />
              
              <Divider />
              
              <div className="product-actions-skeleton">
                <Skeleton.Button active style={{ width: 120 }} size="large" />
                <Skeleton.Button active style={{ width: 120 }} size="large" />
              </div>
              
              <Divider />
              
              <div className="product-metadata-skeleton">
                <Space direction="vertical" style={{ width: '100%' }}>
                  {Array(5).fill(null).map((_, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Skeleton.Input style={{ width: '30%' }} active size="small" />
                      <Skeleton.Input style={{ width: '60%' }} active size="small" />
                    </div>
                  ))}
                </Space>
              </div>
            </div>
          </Col>
        </Row>
        
        <Divider />
        
        {/* Product Description Section */}
        <div className="product-description-skeleton">
          <Skeleton.Input style={{ width: '30%', marginBottom: 16 }} active size="default" />
          <Skeleton paragraph={{ rows: 4 }} active />
        </div>
        
        {/* Product Reviews Section */}
        <Divider />
        <div className="product-reviews-skeleton">
          <Skeleton.Input style={{ width: '30%', marginBottom: 16 }} active size="default" />
          
          {Array(3).fill(null).map((_, index) => (
            <Card key={index} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton.Input style={{ width: '30%' }} active size="small" />
                <Skeleton.Input style={{ width: '20%' }} active size="small" />
              </div>
              <Skeleton paragraph={{ rows: 2 }} active />
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailSkeleton;

import React from 'react';
import { Layout, Skeleton, Row, Col, Card } from 'antd';
import '../../styles/Skeletons.css';

const { Sider, Content } = Layout;

const CategoriesSkeleton: React.FC = () => {
  return (
    <Layout className="categories-layout" style={{ marginTop: 0 }}>
      <Sider 
        className="categories-sider skeleton-sider" 
        width={250} 
        theme="light"
        style={{ top: '64px', zIndex: 99 }}
      >
        <div className="categories-sidebar-header">
          <Skeleton.Input active style={{ width: 200, height: 24 }} />
        </div>
        
        <div className="category-skeleton-container">
          {[...Array(10)].map((_, index) => (
            <Skeleton 
              key={index} 
              active 
              paragraph={{ rows: 0 }} 
              className="category-item-skeleton"
            />
          ))}
        </div>
      </Sider>
      
      <Content className="categories-content">
        <div className="category-header">
          <Skeleton.Input active style={{ width: 300, height: 32, marginBottom: 16 }} />
          <Skeleton.Input active style={{ width: 200, height: 18 }} />
        </div>
        
        <Row gutter={[24, 24]}>
          {[...Array(12)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card className="product-card skeleton-card">
                <Skeleton.Image active style={{ width: "100%", height: 200 }} />
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default CategoriesSkeleton;

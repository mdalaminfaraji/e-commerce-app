import React from 'react';
import { Skeleton, Card, Space } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

const ProductListSkeleton: React.FC = () => {
  // Create an array of 10 items to represent products in a loading state
  const skeletonItems = Array(10).fill(null);

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <Space>
          <ShoppingOutlined />
          <Skeleton.Input style={{ width: 150 }} active size="small" />
        </Space>
        <Skeleton.Input style={{ width: 300, marginTop: 8 }} active size="small" />
      </div>

      <Card className="product-list-card">
        <div className="skeleton-table">
          <div className="skeleton-table-header">
            <div className="skeleton-row">
              <Skeleton.Input style={{ width: 150 }} active size="small" />
              <Skeleton.Input style={{ width: 100 }} active size="small" />
              <Skeleton.Input style={{ width: 80 }} active size="small" />
              <Skeleton.Input style={{ width: 100 }} active size="small" />
              <Skeleton.Input style={{ width: 120 }} active size="small" />
            </div>
          </div>
          
          <div className="skeleton-table-body">
            {skeletonItems.map((_, index) => (
              <div className="skeleton-row" key={index}>
                <div className="skeleton-cell-product">
                  <Skeleton.Image active style={{ width: 60, height: 60 }} />
                  <div className="skeleton-product-info">
                    <Skeleton.Input style={{ width: 180 }} active size="small" />
                    <Skeleton.Input style={{ width: 100 }} active size="small" />
                  </div>
                </div>
                <Skeleton.Input style={{ width: 100 }} active size="small" />
                <Skeleton.Input style={{ width: 80 }} active size="small" />
                <Skeleton.Input style={{ width: 100 }} active size="small" />
                <div className="skeleton-actions">
                  <Skeleton.Button active size="small" />
                  <Skeleton.Button active size="small" />
                </div>
              </div>
            ))}
          </div>

          <div className="skeleton-pagination">
            <Skeleton.Input style={{ width: 300 }} active size="small" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductListSkeleton;

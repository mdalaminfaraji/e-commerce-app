import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layout, 
  Menu, 
  Card, 
  Typography, 
  Row, 
  Col, 
  Rate, 
  Skeleton, 
  Tag, 
  Button, 
  Empty
} from 'antd';
import { ShoppingOutlined, TagOutlined } from '@ant-design/icons';
import { useGetCategoriesQuery, useGetProductsByCategoryQuery } from '../features/products/services/productsApi';
import { Product } from '../types/product.types';
import CategoriesSkeleton from '../components/skeletons/CategoriesSkeleton';
import '../styles/Categories.css';
import '../styles/Skeletons.css';

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

const Categories: React.FC = () => {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  useEffect(() => {
    // Set the first category as default when categories are loaded
    if (categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].slug);
    }
  }, [categories, selectedCategory]);
  
  const { 
    data: categoryProducts, 
    isLoading: isLoadingProducts 
  } = useGetProductsByCategoryQuery(selectedCategory, { 
    skip: !selectedCategory 
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Create menu items for the category sidebar
  const menuItems = categories?.map((category) => ({
    key: category.slug,
    icon: <TagOutlined />,
    label: category.name,
  }));

  // Show skeleton loader when categories or initial category products are loading
  if (isLoadingCategories || (isLoadingProducts && !categoryProducts)) {
    return <CategoriesSkeleton />;
  }

  return (
    <Layout className="categories-layout">
      <Sider 
        className="categories-sider" 
        width={250} 
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="categories-sidebar-header">
          <Title level={4}>
            <ShoppingOutlined /> Categories
          </Title>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[selectedCategory]}
          items={menuItems}
          onClick={({ key }) => handleCategoryChange(key)}
          className="categories-menu"
        />
      </Sider>
      
      <Content className="categories-content">
        {selectedCategory && (
          <div className="category-header">
            <Title level={3}>
              {categories?.find(cat => cat.slug === selectedCategory)?.name} Products
            </Title>
            <Text type="secondary">
              Showing {categoryProducts?.products.length || 0} products in this category
            </Text>
          </div>
        )}
        
        {isLoadingProducts ? (
          <Row gutter={[24, 24]}>
            {[...Array(8)].map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card className="product-card" loading>
                  <Skeleton.Image active style={{ width: "100%", height: 200 }} />
                  <Skeleton active paragraph={{ rows: 2 }} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <>
            {categoryProducts && categoryProducts.products.length > 0 ? (
              <Row gutter={[24, 24]}>
                {categoryProducts.products.map((product: Product) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                    <Card
                      className="product-card"
                      cover={
                        <div className="product-image-container">
                          <img
                            alt={product.title}
                            src={product.thumbnail}
                            className="product-image"
                          />
                          {product.discountPercentage > 0 && (
                            <Tag color="red" className="discount-tag">
                              {Math.round(product.discountPercentage)}% OFF
                            </Tag>
                          )}
                        </div>
                      }
                      actions={[
                        <Link to={`/product/${product.id}`}>
                          <Button type="primary" block>View Details</Button>
                        </Link>
                      ]}
                    >
                      <Meta
                        title={product.title}
                        description={
                          <>
                            <Paragraph className="product-brand">
                              <Text type="secondary">{product.brand}</Text>
                            </Paragraph>
                            <div className="product-price">
                              <Text strong>${product.price}</Text>
                              {product.discountPercentage > 0 && (
                                <Text delete type="secondary" className="original-price">
                                  ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                                </Text>
                              )}
                            </div>
                            <Rate disabled defaultValue={product.rating} allowHalf />
                          </>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty
                description="No products found in this category"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </>
        )}
      </Content>
    </Layout>
  );
};

export default Categories;

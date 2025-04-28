import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  Image,
  Descriptions,
  Rate,
  Tag,
  Button,
  Row,
  Col,
  Divider,
  Avatar,
  Space,
  Alert,
  Statistic,
} from "antd";
import { Comment } from "@ant-design/compatible";
import {
  EditOutlined,
  TagOutlined,
  ClockCircleOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { useGetProductQuery } from "../features/products/services/productsApi";
import ProductDetailSkeleton from '../components/skeletons/ProductDetailSkeleton';
import "../styles/ProductDetail.css";
import "../styles/Skeletons.css";

const { Title, Text, Paragraph } = Typography;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data: product, isLoading, error } = useGetProductQuery(productId);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <Alert
        message="Error"
        description="Failed to load product details. Please try again later."
        type="error"
        showIcon
      />
    );
  }

  // Calculate original price based on current price and discount percentage
  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  return (
    <div className="product-detail-container">
      <div className="product-detail-breadcrumb">
        <Link to="/">Products</Link> / {product.title}
      </div>

      <Row gutter={[24, 24]} className="product-detail-content">
        <Col xs={24} md={10}>
          <Card className="product-image-card">
            <Image
              src={product.images[0]}
              alt={product.title}
              className="product-main-image"
            />

            {product.images.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    width={80}
                    className="product-thumbnail-image"
                  />
                ))}
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} md={14}>
          <Card className="product-info-card">
            <div className="product-header">
              <Tag color="blue">{product.category}</Tag>
              <Title level={2}>{product.title}</Title>
              <div className="product-brand">
                <Text>Brand: </Text>
                <Text strong>{product.brand}</Text>
              </div>
            </div>

            <div className="product-rating">
              <Rate allowHalf disabled value={product.rating} />
              <Text className="rating-value">{product.rating}</Text>
            </div>

            <div className="product-price">
              <div className="price-wrapper">
                <Title level={2} className="current-price">
                  ${product.price.toFixed(2)}
                </Title>
                {product.discountPercentage > 0 && (
                  <>
                    <Text delete className="original-price">
                      ${originalPrice.toFixed(2)}
                    </Text>
                    <Tag color="red" className="discount-tag">
                      {product.discountPercentage}% OFF
                    </Tag>
                  </>
                )}
              </div>

              <div className="stock-info">
                <Tag
                  color={
                    product.stock > 10
                      ? "green"
                      : product.stock > 0
                      ? "orange"
                      : "red"
                  }
                >
                  {product.availabilityStatus ||
                    (product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock")}
                </Tag>
              </div>
            </div>

            <Divider />

            <div className="product-description">
              <Title level={4}>Description</Title>
              <Paragraph>{product.description}</Paragraph>
            </div>

            <Space size="large" className="product-meta">
              <Statistic
                title="SKU"
                value={product.sku}
                valueStyle={{ fontSize: "14px" }}
              />
              {product.weight && (
                <Statistic
                  title="Weight"
                  value={product.weight}
                  suffix="kg"
                  valueStyle={{ fontSize: "14px" }}
                />
              )}
              {product.minimumOrderQuantity && (
                <Statistic
                  title="Min Order"
                  value={product.minimumOrderQuantity}
                  valueStyle={{ fontSize: "14px" }}
                />
              )}
            </Space>

            <Divider />

            <div className="product-specifications">
              <Title level={4}>Specifications</Title>
              <Descriptions
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
              >
                {product.dimensions && (
                  <Descriptions.Item label="Dimensions">
                    {`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
                  </Descriptions.Item>
                )}
                {product.warrantyInformation && (
                  <Descriptions.Item label="Warranty">
                    {product.warrantyInformation}
                  </Descriptions.Item>
                )}
                {product.shippingInformation && (
                  <Descriptions.Item label="Shipping">
                    {product.shippingInformation}
                  </Descriptions.Item>
                )}
                {product.returnPolicy && (
                  <Descriptions.Item label="Return Policy">
                    {product.returnPolicy}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>

            <Divider />

            <div className="product-tags">
              <TagOutlined /> Tags:
              {product.tags.map((tag) => (
                <Tag key={tag} className="tag-item">
                  {tag}
                </Tag>
              ))}
            </div>

            <div className="product-actions">
              <Link to={`/product/edit/${product.id}`}>
                <Button type="primary" icon={<EditOutlined />} size="large">
                  Edit Product
                </Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      <Card className="product-reviews-card">
        <Title level={3}>
          <CommentOutlined /> Customer Reviews
        </Title>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="reviews-list">
            {product.reviews.map((review, index) => (
              <Comment
                key={index}
                author={review.reviewerName}
                avatar={<Avatar>{review.reviewerName[0]}</Avatar>}
                content={
                  <>
                    <Rate disabled defaultValue={review.rating} />
                    <p>{review.comment}</p>
                  </>
                }
                datetime={
                  <span>
                    <ClockCircleOutlined />{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                }
                className="review-item"
              />
            ))}
          </div>
        ) : (
          <div className="no-reviews">
            <Text type="secondary">No reviews yet</Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;

import React, { useState } from "react";
import {
  Table,
  Button,
  Card,
  Rate,
  Tag,
  Typography,
  Image,
  Space,
  Alert,
} from "antd";
import { Link } from "react-router-dom";
import { ShoppingOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useGetProductsQuery } from "../features/products/services/productsApi";
import { Product } from "../types/product.types";
import ProductListSkeleton from "../components/skeletons/ProductListSkeleton";
import HomeBannerSkeleton from "../components/skeletons/HomeBannerSkeleton";
import HomeBanner from "../components/HomeBanner";
import "../styles/ProductList.css";
import "../styles/Skeletons.css";
import "../styles/HomeBanner.css";

const { Title, Text } = Typography;

const ProductList: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, error, isLoading } = useGetProductsQuery({
    limit: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  if (isLoading) {
    return (
      <div className="product-list-container">
        <HomeBannerSkeleton />
        <ProductListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load products. Please try again later."
        type="error"
        showIcon
      />
    );
  }

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_: Product, record: Product) => (
        <div className="product-cell">
          <Image
            src={record.thumbnail}
            alt={record.title}
            width={60}
            height={60}
            className="product-thumbnail"
          />
          <div className="product-info">
            <Link to={`/product/${record.id}`} className="product-title">
              {record.title}
            </Link>
            <Text type="secondary">{record.brand}</Text>
            <div className="product-tags">
              {record.tags.map((tag) => (
                <Tag key={tag} color="blue">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag color="green">{category}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number, record: Product) => (
        <div className="price-column">
          <Text strong>${price.toFixed(2)}</Text>
          {record.discountPercentage > 0 && (
            <Text type="secondary" className="discount-price">
              {record.discountPercentage}% off
            </Text>
          )}
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="rating-column">
          <Rate disabled defaultValue={rating} allowHalf />
          <Text className="rating-text">{rating}</Text>
        </div>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number, record: Product) => (
        <Tag color={stock > 10 ? "green" : stock > 0 ? "orange" : "red"}>
          {record.availabilityStatus ||
            (stock > 0 ? `In Stock (${stock})` : "Out of Stock")}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: Product, record: Product) => (
        <Space size="middle">
          <Link to={`/product/${record.id}`}>
            <Button type="primary" icon={<EyeOutlined />} className="view-btn">
              View
            </Button>
          </Link>
          <Link to={`/product/edit/${record.id}`}>
            <Button type="default" icon={<EditOutlined />} className="edit-btn">
              Edit
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="product-list-container">
      <HomeBanner />
      <div className="product-list-header">
        <Title level={2}>
          <ShoppingOutlined /> Products
        </Title>
        <Text type="secondary">Browse our selection of products</Text>
      </div>

      <Card className="product-list-card">
        <Table
          dataSource={data?.products}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: pageSize,
            current: currentPage,
            total: data?.total || 0,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
          className="products-table"
        />
      </Card>
    </div>
  );
};

export default ProductList;

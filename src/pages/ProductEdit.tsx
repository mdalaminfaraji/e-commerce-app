import React, { useEffect, useState } from 'react';
import ProductEditSkeleton from '../components/skeletons/ProductEditSkeleton';
import '../styles/Skeletons.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Select,
  Rate,
  Space,
  Divider,
  Typography,
  Row,
  Col,
  Alert,
  DatePicker,
  message,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  SaveOutlined,
  RollbackOutlined,
  EditOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { 
  useGetProductQuery, 
  useUpdateProductMutation,
  useGetCategoriesQuery 
} from '../features/products/services/productsApi';
import type { Product } from '../types/product.types';
import '../styles/ProductEdit.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const { data: product, isLoading: isLoadingProduct, error: productError } = useGetProductQuery(productId);
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  
  const [tags, setTags] = useState<string[]>([]);
  const [inputTagValue, setInputTagValue] = useState('');

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        // Format dimensions
        width: product.dimensions?.width,
        height: product.dimensions?.height,
        depth: product.dimensions?.depth,
        // Format reviews
        reviews: product.reviews || [],
      });
      setTags(product.tags || []);
    }
  }, [product, form]);

  const isLoading = isLoadingProduct || isLoadingCategories;

  if (isLoading) {
    return <ProductEditSkeleton />;
  }

  if (productError || !product) {
    return (
      <Alert
        message="Error"
        description="Failed to load product data. Please try again later."
        type="error"
        showIcon
      />
    );
  }

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTagValue(e.target.value);
  };

  const handleTagInputConfirm = () => {
    if (inputTagValue && !tags.includes(inputTagValue)) {
      setTags([...tags, inputTagValue]);
    }
    setInputTagValue('');
  };

  const handleRemoveTag = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };
  
  const onFinish = async (values: Partial<Product> & { width: number; height: number; depth: number }) => {
    try {
      // Create a type that explicitly allows width, height, depth to be deleted
      type ProductWithDimensions = Partial<Product> & {
        id: number;  // Make id required
        width?: number;
        height?: number;
        depth?: number;
        dimensions: {
          width: number;
          height: number;
          depth: number;
        };
      };

      // Format the data to match the API structure
      const updatedProduct: ProductWithDimensions = {
        id: productId,
        ...values,
        tags: tags,
        dimensions: {
          width: values.width,
          height: values.height,
          depth: values.depth,
        },
      };
      
      // Remove the separated dimension fields to avoid duplication
      delete updatedProduct.width;
      delete updatedProduct.height;
      delete updatedProduct.depth;
      
      // Log the final output as required
      console.log('Submitting updated product:', updatedProduct);
      
      // Submit the update request
      await updateProduct(updatedProduct).unwrap();
      
      message.success('Product updated successfully');
      navigate(`/product/${productId}`);
    } catch (error) {
      console.error('Failed to update product:', error);
      message.error('Failed to update product');
    }
  };

  return (
    <div className="product-edit-container">
      <div className="edit-breadcrumb">
        <Link to="/">Products</Link> / <Link to={`/product/${productId}`}>{product.title}</Link> / Edit
      </div>
      
      <Card className="edit-card">
        <Title level={2}>
          <EditOutlined /> Edit Product
        </Title>
        <Text type="secondary">Update product information</Text>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="edit-form"
          initialValues={{
            ...product,
            width: product.dimensions?.width,
            height: product.dimensions?.height,
            depth: product.dimensions?.depth,
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label="Product Name"
                rules={[{ required: true, message: 'Please enter product name' }]}
              >
                <Input placeholder="Product Name" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="brand"
                label="Brand"
                rules={[{ required: true, message: 'Please enter brand name' }]}
              >
                <Input placeholder="Brand" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select category" loading={isLoadingCategories}>
                  {categories?.map((category: string) => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={6}>
              <Form.Item
                name="price"
                label="Price ($)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber 
                  min={0} 
                  precision={2} 
                  step={0.01} 
                  style={{ width: '100%' }} 
                  placeholder="0.00" 
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={6}>
              <Form.Item
                name="discountPercentage"
                label="Discount (%)"
                rules={[{ required: true, message: 'Please enter discount percentage' }]}
              >
                <InputNumber 
                  min={0} 
                  max={100} 
                  precision={2} 
                  style={{ width: '100%' }} 
                  placeholder="0.00" 
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter product description' }]}
          >
            <TextArea rows={4} placeholder="Product Description" />
          </Form.Item>
          
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item
                name="stock"
                label="Stock"
                rules={[{ required: true, message: 'Please enter stock quantity' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[{ required: true, message: 'Please enter rating' }]}
              >
                <Rate allowHalf style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item
                name="sku"
                label="SKU"
                rules={[{ required: true, message: 'Please enter SKU' }]}
              >
                <Input placeholder="SKU" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Dimensions</Divider>
          
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item
                name="width"
                label="Width (cm)"
                rules={[{ required: true, message: 'Please enter width' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="0.00" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item
                name="height"
                label="Height (cm)"
                rules={[{ required: true, message: 'Please enter height' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="0.00" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item
                name="depth"
                label="Depth (cm)"
                rules={[{ required: true, message: 'Please enter depth' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="0.00" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item
                name="weight"
                label="Weight (kg)"
                rules={[{ required: true, message: 'Please enter weight' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="0.00" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item
                name="minimumOrderQuantity"
                label="Minimum Order Quantity"
                rules={[{ required: true, message: 'Please enter minimum order quantity' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} placeholder="1" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item
                name="availabilityStatus"
                label="Availability Status"
                rules={[{ required: true, message: 'Please enter availability status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="In Stock">In Stock</Option>
                  <Option value="Low Stock">Low Stock</Option>
                  <Option value="Out of Stock">Out of Stock</Option>
                  <Option value="Discontinued">Discontinued</Option>
                  <Option value="Coming Soon">Coming Soon</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="warrantyInformation"
                label="Warranty Information"
                rules={[{ required: true, message: 'Please enter warranty information' }]}
              >
                <Input placeholder="Warranty Information" />
              </Form.Item>
            </Col>
            
            <Col xs={24} md={12}>
              <Form.Item
                name="shippingInformation"
                label="Shipping Information"
                rules={[{ required: true, message: 'Please enter shipping information' }]}
              >
                <Input placeholder="Shipping Information" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24}>
              <Form.Item
                name="returnPolicy"
                label="Return Policy"
                rules={[{ required: true, message: 'Please enter return policy' }]}
              >
                <Input placeholder="Return Policy" />
              </Form.Item>
            </Col>
          </Row>
          
          <Divider orientation="left">Tags</Divider>
          
          <div className="tag-input">
            <div className="tag-list">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleRemoveTag(tag)}
                  style={{ marginBottom: '8px' }}
                >
                  {tag}
                </Tag>
              ))}
            </div>
            <Input
              type="text"
              placeholder="Add a tag and press Enter"
              value={inputTagValue}
              onChange={handleTagInputChange}
              onPressEnter={handleTagInputConfirm}
              onBlur={handleTagInputConfirm}
              style={{ width: '100%' }}
            />
          </div>
          
          <Divider orientation="left">Reviews</Divider>
          
          <Form.List name="reviews">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} className="review-card">
                    <div className="review-card-header">
                      <Title level={5}>Review #{name + 1}</Title>
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <Row gutter={24}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'reviewerName']}
                          label="Reviewer Name"
                          rules={[{ required: true, message: 'Please enter reviewer name' }]}
                        >
                          <Input placeholder="Reviewer Name" />
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} md={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'reviewerEmail']}
                          label="Reviewer Email"
                          rules={[
                            { required: true, message: 'Please enter reviewer email' },
                            { type: 'email', message: 'Please enter a valid email' }
                          ]}
                        >
                          <Input placeholder="Reviewer Email" />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Row gutter={24}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'rating']}
                          label="Rating"
                          rules={[{ required: true, message: 'Please select rating' }]}
                        >
                          <Rate allowHalf />
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} md={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'date']}
                          label="Date"
                          rules={[{ required: true, message: 'Please select date' }]}
                          getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
                        >
                          <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Form.Item
                      {...restField}
                      name={[name, 'comment']}
                      label="Comment"
                      rules={[{ required: true, message: 'Please enter comment' }]}
                    >
                      <TextArea rows={3} placeholder="Review Comment" />
                    </Form.Item>
                  </Card>
                ))}
                
                <Form.Item>
                  <Button 
                    type="dashed" 
                    onClick={() => add({ 
                      rating: 5,
                      comment: '',
                      date: new Date().toISOString(),
                      reviewerName: '',
                      reviewerEmail: ''
                    })} 
                    block 
                    icon={<PlusOutlined />}
                  >
                    Add Review
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          
          <Form.Item className="form-actions">
            <Space>
              <Button type="default" icon={<RollbackOutlined />} onClick={() => navigate(`/product/${productId}`)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isUpdating} icon={<SaveOutlined />}>
                Save Changes
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductEdit;

import React, { useState, useRef, useEffect } from 'react';
import { Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../features/products/services/productsApi';
import { Product } from '../types/product.types';
import '../styles/MainLayout.css';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useGetProductsQuery({ limit: 100 });

  useEffect(() => {
    if (data) {
      console.log('Products loaded:', data.products.length);
    }
    if (error) {
      console.error('Error loading products:', error);
    }
  }, [data, error]);

  const filteredProducts = data?.products
    ? data.products.filter(
        product =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.brand?.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const handleSelectProduct = (id: number) => {
    setDropdownOpen(false);
    setSearch('');
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const SearchResultItem = ({ product }: { product: Product }) => (
    <div className="dropdown-item" onMouseDown={() => handleSelectProduct(product.id)}>
      <img src={product.thumbnail} alt={product.title} />
      <div className="dropdown-item-info">
        <span className="dropdown-item-title">{product.title}</span>
        <span className="dropdown-item-brand">{product.brand}</span>
      </div>
      <span className="dropdown-item-price">${product.price.toFixed(2)}</span>
    </div>
  );

  return (
    <div ref={searchRef} className={`search-container ${className || ''}`}>
      <Input
        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
        placeholder="Search products, brands or categories..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          if (e.target.value) {
            setDropdownOpen(true);
          } else {
            setDropdownOpen(false);
          }
        }}
        onFocus={() => search && setDropdownOpen(true)}
        allowClear
        size="large"
        className="search-input"
      />

      {dropdownOpen && search && (
        <div className="main-header-search-dropdown">
          {isLoading ? (
            <div className="dropdown-loading">
              <Spin size="small" />
              <span>Searching products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="dropdown-empty">
              <SearchOutlined />
              <p>No products found for "{search}"</p>
              <span>Try a different search term</span>
            </div>
          ) : (
            <>
              <div className="dropdown-header">Found {filteredProducts.length} product(s)</div>
              <div className="dropdown-results">
                {filteredProducts.slice(0, 6).map(product => (
                  <SearchResultItem key={product.id} product={product} />
                ))}
                {filteredProducts.length > 6 && (
                  <div
                    className="dropdown-footer"
                    onClick={() => {
                      navigate(`/?search=${encodeURIComponent(search)}`);
                      setDropdownOpen(false);
                    }}
                  >
                    View all {filteredProducts.length} results
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

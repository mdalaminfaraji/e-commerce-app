import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './app/store';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductEdit from './pages/ProductEdit';

// Styles
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<ProductList />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="product/edit/:id" element={<ProductEdit />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;

import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/MainLayout.css";
import "../styles/Navbar.css";

const { Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className="main-layout">
      <Navbar />
      <Content className="main-content">
        <Outlet />
      </Content>
      <Footer className="main-footer">
        E-Commerce App ©{new Date().getFullYear()} All rights reserved By Md
        Alamin Faraji
      </Footer>
    </Layout>
  );
};

export default MainLayout;

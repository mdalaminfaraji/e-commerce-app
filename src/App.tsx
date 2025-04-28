import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./store/store";
import { appRoutes } from "./routes/routes";
import { renderRoutes } from "./routes/routes";
import "./App.css";
const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 6,
          },
        }}
      >
        <Router>
          <Routes>{renderRoutes(appRoutes)}</Routes>
        </Router>
      </ConfigProvider>
    </Provider>
  );
};

export default App;

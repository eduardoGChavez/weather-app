import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Layout from "./components/Layout";
import "./styles/index.sass";
import "./styles/index.css";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
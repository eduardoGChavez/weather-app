import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    // <Home />
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/weather" element={<p>Weather</p>} />
          <Route path="*" element={<p >No existe página</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
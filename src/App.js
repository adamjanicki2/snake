import React from "react";
import Home from "./Home";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

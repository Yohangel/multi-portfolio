import React from "react";
import Navbar from "./common/navbar/Navbar";
import BgImage from "./common/bg-image/BgImage";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div class="container-fluid">
      <Router>
        <Navbar />
      </Router>
      <BgImage> test </BgImage>
    </div>
  );
}

export default App;

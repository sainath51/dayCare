import {Home} from "./Home"
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Sessions from "./Sessions";
import Header from "./Header";
import News from "./News";
function App() {
  
  return (
    <>
      <Router>
        <Header />
        <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

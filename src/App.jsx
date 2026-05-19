import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import CV from "./pages/CV";
import Project from "./pages/Project";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/project/:slug" element={<Project />} />
      </Routes>
    </>
  );
}

export default App;
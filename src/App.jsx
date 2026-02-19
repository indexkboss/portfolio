import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
// import Experience from "./pages/Experience";
// import Education from "./pages/Education";
// import Skills from "./pages/Skills";
// import Certifications from "./pages/Certifications";
// import Projects from "./pages/Projects";  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/Projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/certifications" element={<Certifications />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

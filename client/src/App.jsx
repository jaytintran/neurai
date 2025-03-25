import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Home from "@/components/pages/Home";
import SignIn from "@/components/pages/SignIn";
import Register from "@/components/pages/Register";
import ImageRecognition from "@/components/ui/ImageRecognition/ImageRecognition";
import ParticleBackground from "./components/ui/ParticlesBackground";
import ParticleBackgroundSimple from "./components/ui/ParticlesBackgroundSimple";

import { AuthProvider } from "@/context/AuthContext";

function App() {
  const [background, setBackground] = useState(true);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-cyber-dark text-white">
          {background ? <ParticleBackground /> : <ParticleBackgroundSimple />}
          <div className="relative z-10">
            <Navbar setBackground={setBackground} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recognition" element={<ImageRecognition />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

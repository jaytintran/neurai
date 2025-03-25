import { Link } from "react-router-dom";
import { FaRobot, FaBrain, FaFingerprint } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Rank from "@/components/ui/Rank";

function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        {user ? (
          <Rank />
        ) : (
          <>
            <h1 className="text-5xl font-bold mb-8 neon-text">
              NEXT-GEN FACE RECOGNITION
            </h1>
            <p className="text-xl text-gray-400 mb-12">
              Unlock the future of facial recognition with our cutting-edge AI
              technology
            </p>
          </>
        )}

        <Link
          to={user ? `/recognition` : `/signin`}
          className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-shadow"
        >
          {user ? "Scan Now" : "Get Started"}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="p-6 bg-cyber-light rounded-lg border border-neon-blue/30 hover:shadow-neon transition-shadow">
          <FaRobot className="w-12 h-12 text-neon-blue mb-4" />
          <h3 className="text-xl font-bold mb-2 neon-text">ADVANCED AI</h3>
          <p className="text-gray-400">
            State-of-the-art facial recognition powered by neural networks
          </p>
        </div>
        <div className="p-6 bg-cyber-light rounded-lg border border-neon-pink/30 hover:shadow-neon-pink transition-shadow">
          <FaBrain className="w-12 h-12 text-neon-pink mb-4" />
          <h3 className="text-xl font-bold mb-2 neon-text">SMART DETECTION</h3>
          <p className="text-gray-400">
            Precise face detection and analysis in real-time
          </p>
        </div>
        <div className="p-6 bg-cyber-light rounded-lg border border-neon-purple/30 hover:shadow-neon transition-shadow">
          <FaFingerprint className="w-12 h-12 text-neon-purple mb-4" />
          <h3 className="text-xl font-bold mb-2 neon-text">SECURE ACCESS</h3>
          <p className="text-gray-400">
            Enterprise-grade security for your facial recognition needs
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

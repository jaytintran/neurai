import { useAuth } from "@/context/AuthContext";

function Rank() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="text-center mb-8">
      <div className="text-lg text-gray-400 mb-2">
        {user.name}, your current entry count is...
      </div>
      <div className="text-5xl font-bold neon-text">#{user.entries}</div>
      <div className="mt-2 text-neon-purple">
        Keep scanning to improve your rank!
      </div>
    </div>
  );
}

export default Rank;

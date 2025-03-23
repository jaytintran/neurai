function Rank() {
  // This would normally be fetched from the backend
  const entries = 5;
  const name = "John"; // Example name, would come from auth

  return (
    <div className="text-center mb-8">
      <div className="text-lg text-gray-400 mb-2">
        {name}, your current entry count is...
      </div>
      <div className="text-5xl font-bold neon-text">#{entries}</div>
      <div className="mt-2 text-neon-purple">
        Keep scanning to improve your rank!
      </div>
    </div>
  );
}

export default Rank;

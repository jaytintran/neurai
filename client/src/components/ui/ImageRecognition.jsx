import { useState } from "react";
import { FaUpload, FaLink } from "react-icons/fa";
import Rank from "./Rank";

function ImageRecognition() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const isAuthenticated = true; // This would come from your auth context/state

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    // Handle URL submission here
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {isAuthenticated && <Rank />}
      <h2 className="text-3xl font-bold mb-8 text-center neon-text">
        FACE RECOGNITION SCANNER
      </h2>

      <div className="bg-cyber-light p-6 rounded-lg border border-neon-blue/30">
        <div className="mb-8">
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL..."
                className="flex-1 px-4 py-2 rounded-md bg-cyber-dark border border-neon-blue/30 focus:border-neon-blue focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-neon-blue text-cyber-dark hover:shadow-neon transition-shadow flex items-center gap-2"
              >
                <FaLink /> Analyze
              </button>
            </div>
          </form>
        </div>

        <div className="border-t border-neon-blue/30 pt-8">
          <div className="flex items-center justify-center">
            <label className="cursor-pointer group">
              <div className="w-full p-8 border-2 border-dashed border-neon-pink/30 rounded-lg hover:border-neon-pink transition-colors">
                <div className="flex flex-col items-center">
                  <FaUpload className="w-12 h-12 text-neon-pink mb-4" />
                  <p className="text-center text-gray-400">
                    Drop your image here, or{" "}
                    <span className="text-neon-pink">browse</span>
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </label>
          </div>
        </div>

        {uploadedImage && (
          <div className="mt-8">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="max-w-full h-auto rounded-lg border border-neon-blue/30"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageRecognition;

import { useRef, useState, useCallback } from "react";
import { FaLink } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Rank from "@/components/ui/Rank";
import ImageUploader from "./ImageUploader";
import BoundingBoxes from "./BoundingBoxes";

// Constants
const API_URL = "http://localhost:5000/detect";

// Utility function for face detection API call
const detectFaces = async (imageUrl, token) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ imageUrl }),
    });
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    return data.outputs?.[0]?.data?.regions || [];
  } catch (error) {
    console.error("Face detection error:", error);
    return [];
  }
};

const detectFacesFromFile = async (imageData, token) => {
  try {
    const response = await fetch("http://localhost:5000/detect-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ imageData }),
    });
    const data = await response.json();
    return data.outputs?.[0]?.data?.regions || [];
  } catch (error) {
    console.error("Error detecting faces from file:", error);
    return [];
  }
};

function ImageRecognition() {
  const { user, updateEntries } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [faces, setFaces] = useState([]);
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDetectFaces = useCallback(async () => {
    if (!imageUrl || !user) return;
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const detectedFaces = await detectFaces(imageUrl, token);
    if (detectedFaces.length > 0) {
      await updateEntries();
    }
    setFaces(detectedFaces);
    setIsLoading(false);
  }, [imageUrl, user, updateEntries]);

  const handleDetectFacesFromFile = useCallback(async () => {
    if (!uploadedImage || !user) return;
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const detectedFaces = await detectFacesFromFile(uploadedImage, token);
    if (detectedFaces.length > 0) {
      await updateEntries();
    }
    setFaces(detectedFaces);
    setIsLoading(false);
  }, [uploadedImage, user, updateEntries]);

  const handleUrlSubmit = (e) => {
    setSubmitted(true);
    e.preventDefault();
    if (imageUrl) {
      handleDetectFaces();
    }
  };

  const onImageUpload = (imageData) => {
    setUploadedImage(imageData);
  };

  const handleImageUpload = (e) => {
    setSubmitted(true);
    e.preventDefault();
    handleDetectFacesFromFile();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {user && <Rank />}
      <h2 className="text-3xl font-bold mb-8 text-center neon-text">
        FACE RECOGNITION SCANNER
      </h2>

      <div className="bg-cyber-light p-6 rounded-lg border border-neon-blue/30">
        <div className="mb-8">
          <form
            onSubmit={imageUrl ? handleUrlSubmit : handleImageUpload}
            className="space-y-4"
          >
            <div className="flex gap-4 justify-center">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL..."
                className={`${
                  uploadedImage ? "hidden" : ""
                } flex-1 px-4 py-2 rounded-md bg-cyber-dark border border-neon-blue/30 focus:border-neon-blue focus:outline-none`}
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-neon-blue text-cyber-dark hover:shadow-neon transition-shadow flex items-center gap-2"
              >
                <FaLink /> {isLoading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          </form>
        </div>

        {!uploadedImage && !imageUrl && (
          <div className="border-t border-neon-blue/30 pt-8">
            <ImageUploader onImageUpload={onImageUpload} />
          </div>
        )}

        <div className="relative mt-4 max-w-3xl mx-auto">
          {uploadedImage && (
            <img
              ref={imageRef}
              src={uploadedImage}
              alt="Uploaded"
              className="max-w-full h-auto rounded-lg border border-neon-blue/30"
            />
          )}
          {submitted && imageUrl && (
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Uploaded"
              className="block mx-auto max-w-full h-auto"
            />
          )}

          <BoundingBoxes faces={faces} imageRef={imageRef} />
        </div>
      </div>
    </div>
  );
}

export default ImageRecognition;

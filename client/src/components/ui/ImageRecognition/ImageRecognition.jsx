import { useRef, useState, useCallback } from "react";
import { FaLink } from "react-icons/fa";
import Rank from "../Rank";

import ImageUploader from "./ImageUploader";
import BoundingBoxes from "./BoundingBoxes";

// Constants
const API_URL = "http://localhost:5000/detect";

// Utility function for face detection API call
const detectFaces = async (imageUrl) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

const detectFacesFromFile = async (imageData) => {
  try {
    const response = await fetch("http://localhost:5000/detect-file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageData }),
    });
    const data = await response.json();
    return data.outputs?.[0]?.data?.regions || [];
  } catch (error) {
    console.error("Error detecting faces from file:", error);
    return []; // Fallback to empty array
  }
};

function ImageRecognition() {
  const isAuthenticated = true; // This would come from your auth context/state

  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [submitted, setSubmitted] = useState(false); // Track form submission

  const [faces, setFaces] = useState([]);
  const imageRef = useRef(null); // Declare imgRef

  const [isLoading, setIsLoading] = useState(false);

  const handleDetectFaces = useCallback(async () => {
    if (!imageUrl) return;
    setIsLoading(true);
    const detectedFaces = await detectFaces(imageUrl);
    setFaces(detectedFaces);
    setIsLoading(false);
  }, [imageUrl]);

  const handleDetectFacesFromFile = useCallback(async () => {
    if (!uploadedImage) return;
    setIsLoading(true);
    const detectedFaces = await detectFacesFromFile(uploadedImage);
    setFaces(detectedFaces);
    setIsLoading(false);
  }, [uploadedImage]);

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
    handleDetectFacesFromFile(); // Call after state is set
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {isAuthenticated && <Rank />}
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

        {/* Display upload box if no image is uploaded and no URL is provided */}
        {!uploadedImage && !imageUrl && (
          <div className="border-t border-neon-blue/30 pt-8">
            <ImageUploader onImageUpload={onImageUpload} />
          </div>
        )}

        {/* Image and Bounding Boxes for URL */}
        <div className="relative mt-4">
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

          {/* Bounding Boxes */}
          <BoundingBoxes faces={faces} imageRef={imageRef} />
        </div>
      </div>
    </div>
  );
}

export default ImageRecognition;

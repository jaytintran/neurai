/* eslint-disable react/prop-types */
import { FaUpload } from "react-icons/fa";

const ImageUploader = ({ onImageUpload }) => {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result); // Just set the image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
          onChange={handleUpload}
        />
      </div>
    </label>
  );
};

export default ImageUploader;

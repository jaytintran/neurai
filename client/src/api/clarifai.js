export const detectFaces = async (imageUrl) => {
  try {
    const response = await fetch("http://localhost:5000/api/clarifai/detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await response.json();
    return data.faces; // Returns detected faces
  } catch (error) {
    console.error("Error detecting faces:", error);
    return [];
  }
};

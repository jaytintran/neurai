/* eslint-disable react/prop-types */
const BoundingBoxes = ({ faces, imageRef }) => {
  if (!imageRef.current || faces.length === 0) return null;

  const { width, height } = imageRef.current;
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {faces.map((face, index) => {
        const { top_row, left_col, bottom_row, right_col } =
          face.region_info.bounding_box;
        return (
          <div
            key={index}
            className="absolute border-2 border-red-500"
            style={{
              top: `${top_row * height}px`,
              left: `${left_col * width}px`,
              width: `${(right_col - left_col) * width}px`,
              height: `${(bottom_row - top_row) * height}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default BoundingBoxes;

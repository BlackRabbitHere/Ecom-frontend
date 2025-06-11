import React from "react";

const Skeleton = () => {
  const boxes = Array.from({ length: 6 }); // Adjust number of boxes if needed

  return (
    <div role="status" className="animate-pulse space-y-4 w-full flex flex-col items-center">
      {boxes.map((_, index) => (
        <div
          key={index}
          className="w-full max-w-md h-24 bg-gray-300 dark:bg-gray-700 rounded-lg"
        />
      ))}
    </div>
  );
};

export default Skeleton;

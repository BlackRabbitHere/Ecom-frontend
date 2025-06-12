import React from "react";

const Skeleton = () => {
  const boxes = Array.from({ length: 6 }); // You can adjust the number

  return (
    <div
      role="status"
      className="animate-pulse space-y-4 w-full flex flex-col items-center px-4"
    >
      {boxes.map((_, index) => (
        <div
          key={index}
          className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] h-24 bg-gray-300 dark:bg-gray-700 rounded-lg"
        />
      ))}
    </div>
  );
};

export default Skeleton;

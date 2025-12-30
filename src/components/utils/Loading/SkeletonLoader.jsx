const SkeletonLoader = () => {
  return (
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md">
      <div className="h-32 bg-gray-300 rounded-t-md"></div>
      <div className="mt-4 h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>{" "}
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>{" "}
    </div>
  );
};

export default SkeletonLoader;

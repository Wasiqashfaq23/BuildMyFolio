const Spinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`${sizes[size]} border-slate-200 border-t-blue-600 rounded-full animate-spinner ${className}`}
    />
  );
};

export default Spinner;

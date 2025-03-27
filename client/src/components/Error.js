const Error = ({ error }) => {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 max-w-md mx-auto">
      {error}
    </div>
  );
};

export default Error;

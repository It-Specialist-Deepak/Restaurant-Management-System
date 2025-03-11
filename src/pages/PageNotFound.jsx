import { useNavigate } from "react-router-dom";


export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Something is not right...</h1>
      <p className="text-gray-600 mt-3 max-w-md">
        The page you are trying to open does not exist. You may have mistyped the address, or
        the page has been moved. If you think this is an error, contact support.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 border border-gray-600 text-gray-800 rounded hover:bg-gray-100 transition"
      >
        Get back to home page
      </button>
    </div>
  );
}

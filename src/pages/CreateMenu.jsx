import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenu } from "../store/createMenuSlice";
import { useNavigate } from "react-router-dom";

function CreateMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, successMessage, error } = useSelector((state) => state.menu);

  const [formData, setFormData] = useState({
    name: "",
    category: "Fast Food",
    price: "",
    description: "",
    availability: true,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false); // State to control success notification visibility
  const categories = [
    "Fast Food",
    "Beverages",
    "Desserts",
    "Main Course",
    "Appetizers",
    "Salads",
  ];

  // Show success notification for 2 seconds when successMessage changes
  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/exploremenu"); // Navigate after the notification hides
      }, 2000);
      return () => clearTimeout(timer); // Cleanup timeout on unmount or re-render
    }
  }, [successMessage, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("availability", formData.availability);
    data.append("image", formData.image);

    dispatch(createMenu(data));
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg')",
      }}
    >
      <div className="bg-gray-900/70 backdrop-blur-lg text-gray-200 p-6 sm:p-8 lg:p-10 border border-gray-700/50 rounded-2xl shadow-xl w-full max-w-lg mx-auto transition-all duration-500 animate-fade-in">
        <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          Admin Panel
        </h2>
        <h3 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold text-blue-300 mb-6 sm:mb-8">
          Create a New Menu Item
        </h3>

        {/* Success Notification */}
        {showSuccess && successMessage && (
          <div className="bg-green-500/40 text-green-200 text-center font-medium mb-6 py-3 px-4 rounded-lg shadow-md animate-slide-in-down">
            {successMessage}
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="bg-red-500/30 text-red-300 text-center font-medium mb-6 py-2 px-4 rounded-md animate-slide-in-up">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/40 border border-gray-600/50 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-gray-100 transition-all duration-300 hover:bg-gray-700/40"
            />
          </div>

          {/* Category Select */}
          <div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/40 border border-gray-600/50 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-gray-100 transition-all duration-300 hover:bg-gray-700/40"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-gray-900/80">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Input */}
          <div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full bg-gray-800/40 border border-gray-600/50 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-gray-100 transition-all duration-300 hover:bg-gray-700/40"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full bg-gray-800/40 border border-gray-600/50 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-gray-100 transition-all duration-300 hover:bg-gray-700/40"
            />
          </div>

          {/* Availability Checkbox */}
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-400 rounded border-gray-600/50"
            />
            <span className="text-gray-100">Available</span>
          </label>

          {/* File Input */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/80 file:text-white hover:file:bg-blue-600/80 transition-all duration-300"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mx-auto mt-4 border border-gray-600/50 shadow-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Creating...
              </span>
            ) : (
              "Create Menu"
            )}
          </button>
        </form>
      </div>

      {/* Inline Animations */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes slide-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes slide-in-down {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default CreateMenu;
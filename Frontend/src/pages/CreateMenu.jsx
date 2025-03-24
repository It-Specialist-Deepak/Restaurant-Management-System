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
  const [showSuccess, setShowSuccess] = useState(false);
  
  const categories = [
    "Fast Food",
    "Beverages",
    "Desserts",
    "Main Course",
    "Appetizers",
    "Salads",
  ];

  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate("/exploremenu");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
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
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    dispatch(createMenu(data));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8 mt-12" style={{
        backgroundImage: "url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg')",
      }}>
      <div className="bg-gray-900/70 backdrop-blur-lg text-gray-200 p-6 sm:p-8 lg:p-10 border border-gray-700/50 rounded-2xl shadow-xl w-full max-w-lg mx-auto">
        <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">Admin Panel</h2>
        <h3 className="text-center text-2xl font-semibold text-blue-300 mb-6">Create a New Menu Item</h3>

        {showSuccess && successMessage && (
          <div className="bg-green-500/40 text-green-200 text-center font-medium mb-6 py-3 px-4 rounded-lg shadow-md animate-slide-in-down">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-500/30 text-red-300 text-center font-medium mb-6 py-2 px-4 rounded-md animate-slide-in-up">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-800 border px-4 py-3 rounded-lg text-gray-100" />
          <select name="category" value={formData.category} onChange={handleChange} required className="w-full bg-gray-800 border px-4 py-3 rounded-lg text-gray-100">
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-900">
                {cat}
              </option>
            ))}
          </select>
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="w-full bg-gray-800 border px-4 py-3 rounded-lg text-gray-100" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="4" className="w-full bg-gray-800 border px-4 py-3 rounded-lg text-gray-100" />
          <label className="flex items-center space-x-3">
            <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} className="w-5 h-5 rounded border-gray-600" />
            <span className="text-gray-100">Available</span>
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full text-gray-300 file:py-2 file:px-4 file:rounded-lg file:bg-blue-500 file:text-white hover:file:bg-blue-600" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto mt-4 border border-gray-600" />}
          <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 font-bold rounded-lg shadow-md" disabled={status === "loading"}>
            {status === "loading" ? "Creating..." : "Create Menu"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateMenu;

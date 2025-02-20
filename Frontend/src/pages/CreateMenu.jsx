import { useState } from "react";
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
  const categories = ["Fast Food", "Beverages", "Desserts", "Main Course", "Appetizers", "Salads"];

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

    dispatch(createMenu(data)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        alert("Menu item created successfully!");
        navigate("/exploremenu");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg')" }}>
      <div className="bg-gray-900 text-gray-200 px-6 py-6 border border-gray-800 rounded-xl shadow-md w-96 bg-opacity-60 backdrop-blur-lg">
        <h2 className="text-center text-2xl font-bold text-green-400 mb-3">Admin Panel</h2>
        <h3 className="text-center text-xl font-semibold text-blue-400 mb-5">Create a New Menu Item</h3>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-white" />

          <select name="category" value={formData.category} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-white">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-white" />

          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-white"></textarea>

          <label className="flex items-center space-x-2">
            <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} className="w-4 h-4" />
            <span>Available</span>
          </label>

          <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full text-gray-300 cursor-pointer" />

          {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-md mx-auto mt-2 border border-gray-600" />}

          <button type="submit" className="bg-green-600 hover:bg-green-700 w-full text-white py-2 font-bold rounded-md">
            {status === "loading" ? "Creating..." : "Create Menu"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateMenu;

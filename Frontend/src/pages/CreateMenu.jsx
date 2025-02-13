import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateMenu() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
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

    try {
      const response = await axios.post("http://localhost:5000/api/v1/createmenu", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      navigate("/exploremenu");
    } catch (error) {
      console.error("Error creating menu:", error);
      alert("Failed to create menu. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg')",
      }}
    >
      <div className="bg-gray-900 text-gray-200 px-6 py-6 border border-gray-800 rounded-xl shadow-md w-96 bg-opacity-60 backdrop-blur-lg">
        <h2 className="text-center text-2xl font-bold text-green-400 mb-3">
          Welcome Back, Admin
        </h2>
        <h3 className="text-center text-xl font-semibold text-blue-400 mb-5">
          Create a New Menu Item
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-white placeholder-gray-400"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-white placeholder-gray-400"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-white placeholder-gray-400"
          ></textarea>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Available</span>
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full text-gray-300 cursor-pointer"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 rounded-md mx-auto mt-2 border border-gray-600"
            />
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 w-full text-white py-2 font-bold rounded-md"
          >
            Create Menu
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateMenu;

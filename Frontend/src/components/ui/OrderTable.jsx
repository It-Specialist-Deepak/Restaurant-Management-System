import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa"; // Importing Eye Icon

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No token provided");
        setLoading(false);
        return;
      }

      try {
        console.log(import.meta.env.VITE_BASE_URL)
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/all-orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.orders);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setUpdating(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/activeStatus`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Extract updated order from response
      const updatedOrder = response.data.order;

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id
            ? { ...order, status: updatedOrder.status }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const renderImage = (image) => {
    if (!image) return "https://via.placeholder.com/150?text=No+Image";
    if (typeof image === "string") return `http://localhost:5000${image}`;
    if (image.data) {
      const base64String = btoa(
        new Uint8Array(image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/jpeg;base64,${base64String}`;
    }
    return "https://via.placeholder.com/150?text=No+Image";
  };

  return (
    <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
      Orders List
    </h2>
  
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
        <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
          <tr>
            <th className="border p-3 text-sm font-semibold text-gray-700">Order ID</th>
            <th className="border p-3 text-sm font-semibold text-gray-700">User</th>
            <th className="border p-3 text-sm font-semibold text-gray-700">Email</th>
            <th className="border p-3 text-sm font-semibold text-gray-700">Items</th>
            <th className="border p-3 text-sm font-semibold text-gray-700">Total</th>
            <th className="border p-3 text-sm font-semibold text-gray-700">Status</th>
            <th className="border p-3 text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="text-center border-t hover:bg-gray-50 transition"
            >
              <td className="border p-3 text-sm text-gray-600">{order._id}</td>
              <td className="border p-3 text-sm font-medium text-gray-700">
                {order.userId?.fullname}
              </td>
              <td className="border p-3 text-sm text-gray-600">
                {order.userId?.email}
              </td>
              <td className="border p-3 text-left text-sm text-gray-600">
                {order.items.map((item) => (
                  <div key={item._id} className="truncate">
                    {item.productId?.name}{" "}
                    <span className="text-gray-500">(x{item.quantity})</span>
                  </div>
                ))}
              </td>
              <td className="border p-3 font-semibold text-green-600">
                ${order.totalAmount?.toFixed(2)}
              </td>
              <td className="border p-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                  disabled={updating}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="border p-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  <FaEye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    {/* Order Details Modal */}
    {selectedOrder && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            Order Details
          </h2>
  
          <div className="border-b pb-3 space-y-1 text-sm text-gray-700">
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString() ||
                selectedOrder.createdAt}
            </p>
            <p>
              <strong>User:</strong> {selectedOrder.userId?.fullname}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.userId?.email}
            </p>
            <p>
              <strong>Total Amount:</strong>{" "}
              <span className="text-green-600 font-semibold">
                ${selectedOrder.totalAmount?.toFixed(2)}
              </span>
            </p>
            <span
              className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium mt-2 ${
                selectedOrder.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : selectedOrder.status === "Accepted"
                  ? "bg-green-100 text-green-700"
                  : selectedOrder.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : selectedOrder.status === "Completed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {selectedOrder.status}
            </span>
          </div>
  
          <h3 className="font-semibold text-lg mt-4 mb-3 text-gray-800">
            Ordered Items
          </h3>
          <div className="max-h-60 overflow-y-auto space-y-3">
            {selectedOrder.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border p-3 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={renderImage(item.productId.image)}
                  alt={item.productId?.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {item.productId?.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Price: ${item.productId?.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
  
          <button
            onClick={() => setSelectedOrder(null)}
            className="mt-5 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
    );
};

export default OrdersTable;

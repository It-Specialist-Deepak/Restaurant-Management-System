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
        const response = await axios.get(
          "http://localhost:5000/api/v1/all-orders",
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
        "http://localhost:5000/api/v1/activeStatus",
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
      <h2 className="text-2xl font-semibold text-center mb-4">Orders List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Items</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center border-t">
                <td className="border p-2">{order._id}</td>
                <td className="border p-2">{order.userId?.fullname}</td>
                <td className="border p-2">{order.userId?.email}</td>
                <td className="border p-2">
                  {order.items.map((item) => (
                    <div key={item._id} className="text-left">
                      {item.productId?.name} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td className="border p-2">${order.totalAmount?.toFixed(2)}</td>
                <td className="border p-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="px-2 py-1 border rounded"
                    disabled={updating}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-500 hover:text-blue-700"
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
              Order Details
            </h2>

            <div className="border-b pb-3">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString() || selectedOrder.createdAt }
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
                className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm mt-2 ${
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

            <h3 className="font-semibold text-lg mt-4 mb-2">Ordered Items</h3>
            <div className="max-h-60 overflow-y-auto space-y-4">
              {selectedOrder.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border p-3 rounded-lg shadow-sm"
                >
                  <img
                    src={renderImage(item.productId.image)}
                    alt={item.productId?.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{item.productId?.name}</p>
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
              className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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

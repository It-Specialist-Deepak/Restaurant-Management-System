import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback } from "../store/feedbackSlice"; // Removed fetchFeedback import

function PostFeedback() {
  const dispatch = useDispatch();
  const { submitLoading, submitError } = useSelector((state) => state.feedback || {});

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitFeedback(formData)).then((result) => {
      // Only clear form on success
      if (result.type === "feedback/submitFeedback/fulfilled") {
        setFormData({ name: "", email: "", message: "" });
      }
    });
    // Removed fetchFeedback dispatch as it's not needed here
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-32 mb-4">
      <h2 className="text-3xl font-bold text-center mb-6">Submit Feedback</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 border rounded mb-3"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full p-3 border rounded mb-3"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Feedback"
          className="w-full p-3 border rounded mb-3"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          disabled={submitLoading}
        >
          {submitLoading ? "Submitting..." : "Submit Feedback"}
        </button>
        {submitError && <p className="text-red-500 text-center mt-2">{submitError}</p>}
      </form>
    </div>
  );
}

export default PostFeedback;
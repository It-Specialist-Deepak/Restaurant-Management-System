import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "../store/feedbackSlice"; // Corrected import

function GetFeedback() {
  const dispatch = useDispatch();
  const { feedbacks, loading, error } = useSelector((state) => state.feedback || {});

  useEffect(() => {
    dispatch(fetchFeedback()); // Fetch feedback on mount
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Customer Feedback
      </h2>
      {loading ? (
        <p className="text-center text-lg text-gray-600 animate-pulse">
          Loading feedback...
        </p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <ul className="space-y-6">
          {feedbacks.map((feedback, index) => (
            <li
              key={index}
              className="p-6 border rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <p className="text-xl font-semibold text-gray-900">
                {feedback.name} {/* Changed from feedback.user to feedback.name */}
              </p>
              <p className="mt-2 text-gray-700 italic">{feedback.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetFeedback;
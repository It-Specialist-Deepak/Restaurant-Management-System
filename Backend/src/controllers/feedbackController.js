const feedback = require("../models/FeedbackModel");

module.exports.createFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newfeedback = new feedback({
      name,
      email,
      message,
    });

    await newfeedback.save();
    res.status(201).json({ message: "Feedback form submitted successfully!" });
  } catch (error) {
    console.error("Error saving feedback form:", error);
    res.status(500).json({ error: "Failed to submit feedback form" });
  }
};
module.exports.getFeedback = async (req, res) => {
    try {
      const feedbacks = await feedback.find();
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ error: "Failed to fetch feedback" });
    }
}
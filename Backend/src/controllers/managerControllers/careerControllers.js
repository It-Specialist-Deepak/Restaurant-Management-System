const Vacancy = require("../../models/careerModel");

module.exports.createVacancy = async (req, res) => {
  try {
    const {
      title,
      description,
      experience,
      jobtype,
      location,
      salary,
      requirements,
    } = req.body;
    const newVacancy = new Vacancy({
      title,
      description,
      experience,
      jobtype,
      location,
      salary,
      requirements,
    });
    await newVacancy.save();
    res
      .status(201)
      .json({ message: "Vacancy created successfully", success: true });
  } catch (error) {
    console.error(error.message); 
  }
};
module.exports.getAllVacancy = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.status(200).json(vacancies);
  } catch (error) {
    console.error(error.message); 
  }
};
module.exports.deleteVacancy = async (req, res) => {
  try {
    const { vacancyId } = req.body;
    const vacancy = await Vacancy.findByIdAndDelete(vacancyId);

    if (!vacancy) {
      return res
        .status(404)
        .json({ message: "Vacancy not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Vacancy deleted successfully", success: true });
  } catch (error) {
    console.error(error.message); 
    res
      .status(500)
      .json({
        message: "Server error, please try again later",
        success: false,
      });
  }
};

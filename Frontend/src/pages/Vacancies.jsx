import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVacancies,
  createVacancy,
  deleteVacancy,
  selectAllVacancies,
  selectVacancyStatus,
  selectVacancyError,
  selectCreateStatus,
  selectDeleteStatus,
  selectLastDeletedId,
  clearCreateStatus,
  clearDeleteStatus,
} from "../store/vacanciesSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Vacancies = () => {
  const dispatch = useDispatch();
  const vacancies = useSelector(selectAllVacancies);
  const fetchStatus = useSelector(selectVacancyStatus);
  const fetchError = useSelector(selectVacancyError);
  const createStatus = useSelector(selectCreateStatus);
  const deleteStatus = useSelector(selectDeleteStatus);
  const lastDeletedId = useSelector(selectLastDeletedId);

  const [vacancyData, setVacancyData] = useState({
    title: "",
    experience: "",
    jobtype: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
  });
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // Fetch vacancies on initial render
  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchVacancies());
    }
  }, [fetchStatus, dispatch]);

  // Clear create status after 3 seconds
  useEffect(() => {
    if (createStatus === "succeeded" || createStatus === "failed") {
      const timer = setTimeout(() => dispatch(clearCreateStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [createStatus, dispatch]);

  // Clear delete status after 3 seconds
  useEffect(() => {
    if (deleteStatus === "succeeded" || deleteStatus === "failed") {
      const timer = setTimeout(() => {
        dispatch(clearDeleteStatus());
        setDeleteError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteStatus, dispatch]);

  const handleChange = (e) => {
    setVacancyData({ ...vacancyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(createVacancy(vacancyData)).then((result) => {
  if (result.meta.requestStatus === "fulfilled") {
    console.log("Created vacancy:", result.payload); // ✅ Console log here
    setVacancyData({ title: "",
      experience: "",
      jobtype: "",
      description: "",
      location: "",
      salary: "",
      requirements: "",});
  } else {
    console.error("Create vacancy failed:", result.payload );
  }
});

  };

  const handleDelete = (vacancyId) => {
    setDeletingId(vacancyId);
    setDeleteError(null);
    dispatch(deleteVacancy(vacancyId)).then((result) => {
      if (result.meta.requestStatus === "rejected") {
        setDeleteError(result.payload);
      }
      setDeletingId(null);
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Vacancy Dashboard
          </h2>
          <p className="text-gray-600 mt-2 text-lg">Manage Job Openings Seamlessly</p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Vacancy Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
              <FaPlus className="text-indigo-600" /> Add New Vacancy
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                  value={vacancyData.title}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="experience"
                  placeholder="Experience (years)"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                  value={vacancyData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="jobtype"
                  placeholder="Job Type"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                  value={vacancyData.jobtype}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                  value={vacancyData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="salary"
                placeholder="Salary Range (e.g., $50k-$70k)"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
                value={vacancyData.salary}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Job Description"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 h-24"
                value={vacancyData.description}
                onChange={handleChange}
                required
              />
              <textarea
                name="requirements"
                placeholder="Requirements"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400 h-24"
                value={vacancyData.requirements}
                onChange={handleChange}
                required
              />
              <motion.button
                type="submit"
                className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 ${
                  createStatus === "loading"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                whileHover={{ scale: createStatus === "loading" ? 1 : 1.05 }}
                whileTap={{ scale: createStatus === "loading" ? 1 : 0.95 }}
                disabled={createStatus === "loading"}
              >
                {createStatus === "loading" ? (
                  <>
                    <FaSpinner className="animate-spin" /> Creating...
                  </>
                ) : (
                  <>
                    <FaPlus /> Post Vacancy
                  </>
                )}
              </motion.button>
            </form>
            <AnimatePresence>
              {createStatus === "succeeded" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-green-600 mt-4 text-center flex items-center justify-center gap-2"
                >
                  <FaCheckCircle /> Vacancy posted successfully!
                </motion.p>
              )}
           {createStatus === "failed" && fetchError && (
  <motion.p> ... {fetchError} </motion.p>
)}

            </AnimatePresence>
          </motion.div>

          {/* Vacancies List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
              <FaCheckCircle className="text-indigo-600" /> Current Vacancies
            </h3>
            {fetchStatus === "loading" && (
              <p className="text-gray-600 text-center flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" /> Loading vacancies...
              </p>
            )}
            {fetchStatus === "failed" && (
              <p className="text-red-600 text-center flex items-center justify-center gap-2">
                <FaExclamationCircle /> Error: {fetchError}
              </p>
            )}
            {fetchStatus === "succeeded" && vacancies.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-gray-700">Title</th>
                      <th className="p-4 text-sm font-semibold text-gray-700 hidden sm:table-cell">
                        Experience
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-700 hidden md:table-cell">
                        Type
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-700 hidden lg:table-cell">
                        Location
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {vacancies.map((vacancy) => (
                        <motion.tr
                          key={vacancy._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 text-gray-900">{vacancy.title}</td>
                          <td className="p-4 text-gray-900 hidden sm:table-cell">
                            {vacancy.experience} yrs
                          </td>
                          <td className="p-4 text-gray-900 hidden md:table-cell">
                            {vacancy.jobtype}
                          </td>
                          <td className="p-4 text-gray-900 hidden lg:table-cell">
                            {vacancy.location}
                          </td>
                          <td className="p-4">
                            <motion.button
                              onClick={() => handleDelete(vacancy._id)}
                              className={`px-3 py-1 rounded-lg text-white text-sm font-medium flex items-center gap-2 ${
                                deleteStatus === "loading" && deletingId === vacancy._id
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-red-600 hover:bg-red-700"
                              }`}
                              whileHover={{
                                scale:
                                  deleteStatus === "loading" && deletingId === vacancy._id
                                    ? 1
                                    : 1.05,
                              }}
                              whileTap={{
                                scale:
                                  deleteStatus === "loading" && deletingId === vacancy._id
                                    ? 1
                                    : 0.95,
                              }}
                              disabled={deleteStatus === "loading" && deletingId === vacancy._id}
                            >
                              {deleteStatus === "loading" && deletingId === vacancy._id ? (
                                <>
                                  <FaSpinner className="animate-spin" /> Deleting...
                                </>
                              ) : (
                                <>
                                  <FaTrash /> Delete
                                </>
                              )}
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                <AnimatePresence>
                  {deleteStatus === "succeeded" && lastDeletedId && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-600 mt-4 text-center flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle /> Vacancy (ID: {lastDeletedId}) deleted successfully!
                    </motion.p>
                  )}
                  {deleteStatus === "failed" && deleteError && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 mt-4 text-center flex items-center justify-center gap-2"
                    >
                      <FaExclamationCircle /> {deleteError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ) : fetchStatus === "succeeded" && vacancies.length === 0 ? (
              <p className="text-gray-600 text-center py-4">No vacancies available yet.</p>
            ) : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Vacancies;
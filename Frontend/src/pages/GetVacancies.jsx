import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVacancies, selectAllVacancies, selectVacancyStatus, selectVacancyError } from "../store/vacanciesSlice";
import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, CalendarCheck } from "lucide-react";

const GetVacancies = () => {
  const dispatch = useDispatch();
  const vacancies = useSelector(selectAllVacancies);
  const status = useSelector(selectVacancyStatus);
  const error = useSelector(selectVacancyError);

  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <motion.h2
        className="text-3xl font-bold mb-6 text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Vacancies
      </motion.h2>

      {status === "loading" && <p className="text-blue-600">Loading vacancies...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="w-full max-w-3xl bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-lg">
        {vacancies.length > 0 ? (
          <motion.ul
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {vacancies.map((vacancy) => (
              <motion.li
                key={vacancy.id}
                className="p-5 border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Briefcase size={20} /> {vacancy.title}
                </h3>
                <p className="flex items-center gap-2 text-gray-700"><CalendarCheck size={18} /> <strong>Experience:</strong> {vacancy.experience} years</p>
                <p className="flex items-center gap-2 text-gray-700"><MapPin size={18} /> <strong>Location:</strong> {vacancy.location}</p>
                <p className="flex items-center gap-2 text-gray-700"><DollarSign size={18} /> <strong>Salary:</strong> {vacancy.salary}</p>
                <p className="text-gray-600 mt-2"><strong>Requirements:</strong> {vacancy.requirements}</p>
                <p className="text-gray-600 mt-1"><strong>Description:</strong> {vacancy.description}</p>
                
                <motion.button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p className="text-gray-600">No vacancies available.</p>
        )}
      </div>
    </div>
  );
};

export default GetVacancies;
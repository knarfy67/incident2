import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Car from "../assets/img/cars/civic.png";
import Add from "../assets/animation/Add.json";
import axios from "axios";
import Lottie from "lottie-react";
import { AuthContext } from "../context/AuthContext";
import ModalCreate from "../components/ModalCreate";
import ModalEdit from "../components/ModalEdit";
import ModalCarDetails from "../components/ModalCarDetails";

const VolunteersComponent = () => {
  const { carList, showModal, setShowModal, handleDelete, fetchCars, carRent } =
    useContext(AuthContext);

  const [editModal, setEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);

  const handleEdit = (car) => {
    setSelectedCar(car);
    setEditModal(true);
  };

  const handleDetails = (car) => {
    console.log(carRent);
    setSelectedCar(car);
    setDetailsModal(true);
  };

  const handleUpdate = () => {
    fetchCars();
    setEditModal(false);
  };

  const bounceTransition = {
    type: "spring",
    stiffness: 80,
    damping: 15,
    bounce: 0.1,
  };

  return (
    <motion.div
      layout
      className="overflow-hidden overflow-y-auto hide-scrollbar"
    >
      <motion.div
        layout
        className=" flex flex-col md:grid md:grid-cols-4 gap-3 m-4 hide-scrollbar"
      >
        {/* Left Side - Car Boxes */}
        <motion.div
          layout
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={bounceTransition}
          className="col-span-3 rounded-md h-[85vh] overflow-y-auto hide-scrollbar mt-2"
        >
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 overflow-hidden">
            <motion.div
              layout
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ ...bounceTransition, delay: 0.1 }}
              className="p-4 rounded-xl shadow-md bg-white dark:bg-slate-900 transition-all duration-300 cursor-pointer"
            >
              <div
                className="flex flex-col items-center justify-center h-full w-full"
                onClick={() => setShowModal(true)}
              >
                <p className="text-center font-medium dark:text-white text-gray-700">
                  Add new Car
                </p>
                <Lottie
                  className="h-1/2 w-1/2"
                  animationData={Add}
                  loop={false}
                  autoPlay={true}
                />
              </div>
            </motion.div>
            {carList.map((car, index) => (
              <motion.div
                key={index}
                layout
                className="p-4 rounded-xl shadow-md bg-white dark:bg-slate-900 transition-all duration-100 cursor-pointer"
              >
                <motion.div
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{
                    ...bounceTransition,
                    delay: 0.1 * index,
                    duration: 0.1,
                  }}
                  className=""
                  onClick={() => handleDetails(car)}
                >
                  <img
                    src={car.picture}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-40 object-contain mb-2 rounded-md"
                  />
                  <p className="text-gray-700 dark:text-white font-bold text-xl">
                    {car.model}
                  </p>
                  <p className="text-gray-700 dark:text-white font-bold text-xl">
                    {car.type.name}
                  </p>
                  <p
                    className={`text-white text-center rounded-sm dark:text-white font-bold text-sm w-1/3 ${
                      car.status === "available" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {car.status}
                  </p>
                  <p className="text-gray-700 dark:text-white font-medium text-md">
                    ₱{car.price} <span className="text-xs">per day</span>
                  </p>
                </motion.div>
                <motion.div layout className="flex gap-2 mt-2">
                  <div
                    className="bg-green-600 hover:bg-green-500 p-2 rounded-md w-full"
                    onClick={() => handleEdit(car)}
                  >
                    <p className="text-white text-center text-xs">Edit</p>
                  </div>
                  <div
                    className="border-2 border-red-400 hover:bg-red-500 p-2 rounded-md w-full"
                    onClick={() => handleDelete(car.id)}
                  >
                    <p className="dark:text-white text-slate-800 text-center hover:text-white text-xs">
                      Delete
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Info Panel */}
        <motion.div
          layout
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ ...bounceTransition, delay: 0.1 }}
          className="dark:bg-slate-900 bg-white col-span-1 rounded-md h-[85vh] p-4 mt-2 shadow-md flex justify-center"
        >
          <p className="sticky text-center font-medium text-gray-700 dark:text-white">
            Frequent Car Rented
          </p>
        </motion.div>
      </motion.div>
      {showModal && <ModalCreate />}
      {editModal && (
        <ModalEdit
          car={selectedCar}
          onClose={() => setEditModal(false)}
          onUpdated={handleUpdate}
        />
      )}
      {detailsModal && (
        <ModalCarDetails
          car={selectedCar}
          onClose={() => setDetailsModal(false)}
        />
      )}
      <motion.div className="m-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Rental History
        </h2>
        <ul className="space-y-3 max-h-80 overflow-y-auto pr-2 hide-scrollbar">
          {carRent.map((rent, index) => (
            <li
              key={index}
              className="p-3 rounded-md shadow bg-white dark:bg-slate-800 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`http://localhost:8000/storage/${rent.car_picture}`}
                  alt={rent.car}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p>{rent.user}</p>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    <p>
                      start: {new Date(rent.start_date).toLocaleDateString()}
                    </p>
                    <p>end: {new Date(rent.end_date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="text-green-600 dark:text-green-400 font-semibold mt-2 sm:mt-0">
                ₱{parseFloat(rent.total_price).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default VolunteersComponent;

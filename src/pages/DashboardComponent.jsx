import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AuthContext } from "../context/AuthContext";
import { IoIosPeople } from "react-icons/io";
import Car from "../assets/img/cars/civic.png";
import { useMediaQuery } from "react-responsive";
import { FaCar } from "react-icons/fa";
import ModalDetails from "../components/ModalDetails";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardComponent = ({ open }) => {
  const { darkMode, showModal, setShowModal, carList, customer, sum } =
    useContext(AuthContext);
  const { available } = carList;
  const availableCars = carList.filter((car) => car.status === "available");
  const availableCount = availableCars.length;
  const rentedCars = carList.filter((car) => car.status === "rented");
  const rentedCount = rentedCars.length;
  const isMdScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // Prepare sales data from context
  const formattedSales = (sum?.data || []).map((item) => ({
    date: item.date,
    total: item.total_price,
  }));

  const salesData = {
    labels: formattedSales.map((item) => item.date), // X-axis: dates
    datasets: [
      {
        label: "Total Sales (₱)",
        data: formattedSales.map((item) => item.total), // Y-axis: total sales
        backgroundColor: "rgba(0, 200, 83, 0.7)", // Vibrant emerald green
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: darkMode ? "white" : "black",
        },
      },
      title: {
        display: true,
        text: "Sales by Date",
        color: darkMode ? "white" : "black",
      },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? "white" : "black" },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.05)",
        },
      },
      y: {
        ticks: { color: darkMode ? "white" : "black" },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  return (
    <motion.div layout className="overflow-hidden">
      <motion.div
        layout
        className="grid sm:grid-cols-1 md:grid-cols-3 gap-3 m-4"
      >
        <motion.div
          layout
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 10,
            delay: 0.2,
          }}
          className="dark:bg-slate-900 bg-white rounded-sm p-2 w-full "
        >
          <div className="flex items-center justify-between px-2">
            <p className="font-normal text-sm text-gray-800 dark:text-gray-200">
              Accounts Created
            </p>
            <IoIosPeople size={30} color={darkMode ? "#FFFFFF" : "#334155"} />
          </div>
          <div className="flex px-2 justify-between">
            <p className="font-medium text-xl text-gray-800 dark:text-gray-200">
              {customer?.data?.length || 0}
            </p>
          </div>
        </motion.div>
        <motion.div
          layout
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 10,
            delay: 0.3,
          }}
          className="dark:bg-slate-900 p-2 bg-white"
        >
          <div className="flex items-center justify-between px-2">
            <p className="font-normal text-sm text-gray-800 dark:text-gray-200">
              Cars Rented
            </p>
            <FaCar size={30} color={darkMode ? "#FFFFFF" : "#334155"} />
          </div>
          <div className="flex px-2 justify-between ">
            <p className="font-medium text-xl text-gray-800 dark:text-gray-200">
              {rentedCount}
            </p>
          </div>
        </motion.div>
        <motion.div
          layout
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 10,
            delay: 0.4,
          }}
          className="dark:bg-slate-900 p-2 bg-white"
        >
          <div className="flex items-center justify-between px-2">
            <p className="font-normal text-sm text-gray-800 dark:text-gray-200">
              Cars Available
            </p>
            <FaCar size={30} color={darkMode ? "#FFFFFF" : "#334155"} />
          </div>
          <div className="flex px-2 justify-between">
            <p className="font-medium text-xl text-gray-800 dark:text-gray-200">
              {availableCount}
            </p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        layout
        className="flex overflow-y-auto hide-scrollbar flex-col lg:flex-row mx-4 gap-2 mb-2"
      >
        <motion.div
          layout
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.5,
          }}
          className="dark:bg-slate-900 lg:w-4xl px-4  rounded-sm bg-white "
        >
          <motion.div
            layout
            className="h-1/2 md:h-[72vh] flex flex-col justify-center items-center"
          >
            <p className="text-center font-medium text-gray-700 dark:text-white">
              Sales by Date
            </p>
            <Bar data={salesData} options={salesOptions} />
          </motion.div>
        </motion.div>
        <motion.div
          layout
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.6,
          }}
          className="w-full lg:w-1/3 max-h-[80vh] bg-white p-3 overflow-y-auto hide-scrollbar rounded-md dark:bg-slate-900"
        >
          <motion.p
            layout
            className="sticky text-center font-medium text-gray-700 dark:text-white"
          >
            Customer Feedback
          </motion.p>
          <motion.div
            layout
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 10,
              delay: 0.7,
            }}
            className="flex flex-row items-center justify-between border-b border-b-gray-300  dark:border-b-gray-400"
          >
            <motion.div layout className="flex flex-row items-center gap-4">
              <motion.img layout src={Car} style={{ width: 80, height: 80 }} />
              <motion.div>
                <motion.p
                  layout
                  className="font-medium text-xs dark:text-white"
                >
                  Honda Civic
                </motion.p>
                <motion.p
                  layout
                  className="font-medium text-xs dark:text-white"
                >
                  2 days
                </motion.p>
              </motion.div>
            </motion.div>
            {!open && !isMdScreen && (
              <motion.div
                layout
                className="bg-green-600 hover:bg-green-500 p-2 rounded-md"
                onClick={() => setShowModal(true)}
              >
                <p className="text-white text-xs">view details</p>
              </motion.div>
            )}
            {isMdScreen && (
              <motion.div
                layout
                className="bg-green-600 hover:bg-green-500 p-2 rounded-md"
                onClick={() => setShowModal(true)}
              >
                <p className="text-white text-xs">view details</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      {showModal && <ModalDetails />}
    </motion.div>
  );
};

export default DashboardComponent;

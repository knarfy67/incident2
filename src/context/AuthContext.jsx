import { MotionConfig } from "motion/react";
import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import axios from "axios";

export const AuthContext = createContext();

const api = {
  key: "26ac5935b61a4f0bd8e9a329e725fc9c",
  base: "https://api.openweathermap.org/data/2.5/",
};

const AuthContextProvider = ({ children }) => {
  const [login, setLogin] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [sum, setSum] = useState(null);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [weather, setWeather] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const userDetails = JSON.parse(localStorage.getItem("userId"));
  const [carList, setcarList] = useState([]);
  const [carRent, setcarRent] = useState([]);
  const tokenAuth = localStorage.getItem("authToken");

  const fetchCars = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/cars", {
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
          Accept: "application/json",
        },
      });
      console.log("fetchcars: ", response);
      const reversedList = [...response.data.cars].reverse();
      setcarList(reversedList);
      console.log(reversedList);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  }, [tokenAuth]);

  const fetchSales = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/fetch", {
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
          Accept: "application/json",
        },
      });
      console.log("fetchsales: ", response);
      setcarRent(response.data);
    } catch (error) {
      console.error("Error fetching rental sales data:", error);
    }
  }, [tokenAuth]);

  const fetchCustomer = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getCustomer",
        {
          headers: {
            Authorization: `Bearer ${tokenAuth}`,
            Accept: "application/json",
          },
        }
      );
      console.log("fetchcustomer:", response);
      setCustomer(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  }, [tokenAuth]);

  useEffect(() => {
    fetchSales();
    fetchCustomer();
    fetchSum();
    fetchCars();
  }, [tokenAuth]);

  const fetchSum = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sum-totals", {
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
          Accept: "application/json",
        },
      });
      console.log("fetchsum: ", response);
      setSum(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  }, [tokenAuth]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenAuth}`, // Ensure tokenAuth is defined in your component or context
          Accept: "application/json",
        },
      });
      console.log("Car deleted successfully");
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  // toggle and dark mode og ligth mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    fetch(`${api.base}weather?q=Igpit,Opol,PH&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("Weather Data:", result);
        console.log("Weather Data:", result.weather[0].main);
        if (result.cod !== 200) {
          console.error("Error fetching weather:", result.message);
        } else {
          setWeather(result);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  // funtion sa toggle dark mode
  const toggleDarkMode = (event) => {
    event.stopPropagation();
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));

    if (newMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  // dropdown sa kilid tung logut
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log("Clicked outside, closing dropdown");
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen, setDropdownOpen]);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        weather,
        toggleDropdown,
        dropdownOpen,
        setDropdownOpen,
        dropdownRef,
        showModal,
        setShowModal,
        userDetails,
        carList,
        tokenAuth,
        fetchCars,
        handleDelete,
        carRent,
        customer,
        sum,
        fetchSales,
        fetchCustomer,
        fetchSum,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

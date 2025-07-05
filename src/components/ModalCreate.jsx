import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ModalCreate = () => {
  const { setShowModal, tokenAuth, fetchCars } = useContext(AuthContext);
  const [types, setTypes] = useState([]); // State to store car types

  useEffect(() => {
    // Fetch available car types from backend
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/fetchType",
          {
            headers: {
              Authorization: `Bearer ${tokenAuth}`,
            },
          }
        );
        setTypes(response.data.types); // Store the types in state
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, [tokenAuth]);

  const [formData, setFormData] = useState({
    brand: "",
    picture: null,
    types_id: "", // Default type to empty
    seater: "",
    model: "",
    description: "",
    price: "",
    status: "available",
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      const file = files[0];
      setFormData({ ...formData, picture: file });
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    console.log(formData);
    try {
      await axios.post("http://localhost:8000/api/cars", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenAuth}`,
        },
      });
      fetchCars();
      setShowModal(false);
    } catch (error) {
      console.error("Create error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <motion.div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 8, delay: 0.1 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-lg w-96"
      >
        <p className="text-xl font-medium text-center mb-2">Create Rent Car</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-20 object-contain rounded-md"
            />
          )}

          <select
            name="types_id" // Corrected the name here
            value={formData.types_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option>--Please select the type of car --</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="seater"
            placeholder="Seater"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ModalCreate;

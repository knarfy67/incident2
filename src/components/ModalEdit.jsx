import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ModalEdit = ({ car, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    model: "",
    price: "",
    brand: "",
    picture: "",
    types_id: "",
    description: "",
    status: "",
    seater: "",
  });
  const [types, setTypes] = useState([]); // NEW: car types
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { tokenAuth } = useContext(AuthContext);

  useEffect(() => {
    // Load car types on component mount
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/fetchType",
          {
            headers: {
              Authorization: `Bearer ${tokenAuth}`,
              Accept: "application/json",
            },
          }
        );
        setTypes(response.data.types);
        console.log("type", types);
      } catch (error) {
        console.error("Failed to fetch types:", error);
      }
    };

    fetchTypes();
  }, [tokenAuth]);

  useEffect(() => {
    if (car) {
      setFormData({
        model: car.model,
        price: car.price,
        brand: car.brand,
        picture: "",
        types_id: car.types_id || "",
        description: car.description || "",
        status: car.status || "",
        seater: car.seater || "",
      });
      setPreviewImage(car.picture);
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    if (
      !formData.model ||
      !formData.price ||
      !formData.brand ||
      !formData.types_id ||
      !formData.status ||
      !formData.seater
    ) {
      setErrorMessage("All required fields must be filled.");
      return;
    }

    const data = new FormData();
    data.append("model", formData.model);
    data.append("price", formData.price);
    data.append("brand", formData.brand);
    data.append("types_id", formData.types_id);
    data.append("description", formData.description);
    data.append("status", formData.status);
    data.append("seater", formData.seater);
    data.append("_method", "put");

    console.log(data);
    if (formData.picture instanceof File) {
      data.append("picture", formData.picture);
    }

    try {
      await axios.post(`http://localhost:8000/api/cars/${car.id}`, data, {
        headers: {
          Authorization: `Bearer ${tokenAuth}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      onUpdated();
      onClose();
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error("Error updating car:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Edit Car</h2>

        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

        <input
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          className="w-full p-2 border mb-2"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border mb-2"
        />
        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="w-full p-2 border mb-2"
        />
        <select
          name="types_id"
          value={formData.types_id}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
        >
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border mb-2"
        />
        <input
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="Status"
          className="w-full p-2 border mb-2"
        />
        <input
          name="seater"
          value={formData.seater}
          onChange={handleChange}
          placeholder="Seater"
          className="w-full p-2 border mb-2"
        />
        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-20 object-contain mb-2 rounded"
          />
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button onClick={onClose} className="ml-2 text-red-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;

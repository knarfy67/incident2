import React from "react";

const ModalCarDetails = ({ car, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-96 max-w-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Car Details</h2>

        <div className="mb-2">
          <img
            src={car.picture}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-40 object-contain mb-4 rounded-md"
          />
          <p className="font-bold text-lg">
            {car.brand} {car.model}
          </p>
          <p className="text-gray-700">Type: {car?.type?.name}</p>
          <p className="text-gray-700">Seater: {car.seater}</p>
          <p className="text-gray-700">Price: ₱{car.price} per day</p>
          <p className="text-gray-700">Status: {car.status}</p>
          <p className="text-gray-700">
            Description: {car.description || "No description available."}
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCarDetails;

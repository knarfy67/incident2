import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import axios from "axios";

function UserProfile({ id, onClose }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            console.log("Fetching profile for ID:", id);
            fetchProfile();
        }
    }, [id]);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/tanod-profile/${id}`
            );
            console.log("Profile data fetched:", response.data);
            setProfile(response.data.tanod);
        } catch (error) {
            setError("Error fetching profile. Please try again later.");
            console.error(
                "Error fetching data:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-lg font-bold leading-6 text-green-700"
                                    >
                                        PROFILE
                                    </DialogTitle>
                                    <img
                                        src="ibp.png"
                                        alt="Profile"
                                        className="rounded mx-auto mb-4 w-24 h-24 object-cover absolute top-2 right-5"
                                    />
                                    <div className="mt-8 ">
                                        {loading ? (
                                            <p>Loading...</p>
                                        ) : error ? (
                                            <p>{error}</p>
                                        ) : (
                                            <>
                                                <div className="flex flex-col">
                                                    <h4 className="font-bold text-green-700">
                                                        Position:
                                                    </h4>
                                                    <p className="text-gray-600 font-bold">
                                                        {profile?.role?.name ||
                                                            "No position available"}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="flex flex-col">
                                                        <h4 className="font-bold text-green-700">
                                                            Call Sign:
                                                        </h4>
                                                        <p className="text-gray-700 font-bold">
                                                            {profile?.name ||
                                                                "No name available"}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col ml-12">
                                                        <h4 className="font-bold text-green-700">
                                                            Email:
                                                        </h4>
                                                        <p className="text-gray-700 font-bold">
                                                            {profile?.email ||
                                                                "No name available"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default UserProfile;

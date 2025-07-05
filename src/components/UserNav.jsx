import { useState, useEffect } from "react";
import Logout from "../auth/Logout";
import { Link } from "react-router-dom";
import axios from "axios";

function UserNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const fetchUserProfile = async (userId) => {
    if (!userId) return; // Ensure userId is available
    try {
      const token = localStorage.getItem("authToken"); // Get token from local storage
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserProfile(response.data.user);
    } catch (error) {
      setError("Error fetching user profile."); // Set error state
      if (error.response) {
        console.error("Error fetching user profile:", error.response.data);
      } else {
        console.error("Error fetching user profile:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile(userId); // Pass userId when calling
  }, [userId]); // Only run when userId changes

  const imageUrl = userProfile?.profiles?.photo
    ? `http://127.0.0.1:8000/${userProfile.profiles.photo}`
    : "https://via.placeholder.com/150";

  return (
    <div className="relative mt-1">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-14 h-14 mr-4 rounded-full border-2 border-green-400 hover:bg-gray-200"
      >
        {/* <img
                    src={imageUrl}
                    alt="Profile"
                    className="h-14 w-14 rounded-full border-2 border-green-600 object-cover shadow-md transition-transform duration-200 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                    }}
                /> */}
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
          <Link
            to={`/user-profile/${userId}`}
            className="block px-4 py-2 text-sm text-green-500 hover:bg-green-100"
          >
            {userProfile?.profile?.name || "Profile"}
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-green-500 hover:bg-green-100"
          >
            Settings
          </Link>
          <div className="border-t my-1"></div>
          <Logout />
          {error && <p className="text-red-500 text-xs">{error}</p>}{" "}
          {/* Display error */}
        </div>
      )}
    </div>
  );
}

export default UserNav;

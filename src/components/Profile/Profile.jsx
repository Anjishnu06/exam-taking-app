import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const email = sessionStorage.getItem('email')

  useEffect(() => {
    // Fetch user details from API
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://demo-practice.onrender.com/userdata/${email}`); // Replace with your API endpoint
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Redirect to edit profile page
  };

  const handleBackToHome = () => {
    navigate("/home"); // Redirect to home page
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <span className="sr-only">Loading</span>
        <div className="spinner-border text-dark mx-2" role="status">
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-header text-white" style={{ backgroundColor: "#8b0000" }}>
          <h5 className="mb-0">User Profile</h5>
        </div>
        <div className="card-body">
          {userDetails ? (
            <>
              <div className="mb-3">
                <strong>First Name:</strong> {userDetails.first_name}
              </div>
              <div className="mb-3">
                <strong>Last Name:</strong> {userDetails.last_name}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {userDetails.email}
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button
                  onClick={handleEditProfile}
                  className="btn btn-outline-danger"
                  style={{ color: "#8b0000", borderColor: "#8b0000" }}
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleBackToHome}
                  className="btn btn-outline-danger"
                  style={{ color: "#8b0000", borderColor: "#8b0000" }}
                >
                  Back to Home
                </button>
              </div>
            </>
          ) : (
            <p className="text-danger">Error: User details not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const LoginForExam = () => {
  const [formData, setFormData] = useState({ userID: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear any previous errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userID", "==", formData.userID), where("password", "==", formData.password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsLoading(false);
        navigate("/exam"); // Redirect to the exam page
      } else {
        setIsLoading(false);
        setError("Invalid User ID or Password.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Login for Exam</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userID">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="userID"
                value={formData.userID}
                onChange={handleChange}
                placeholder="Enter your User ID"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button
              type="submit"
              variant="danger"
              style={{ backgroundColor: "#8B0000", color: "#fff" }}
              disabled={isLoading}
              className="w-100"
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForExam;

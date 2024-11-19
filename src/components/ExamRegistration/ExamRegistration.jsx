import React, { useState } from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFirebase } from "../../context/FirebaseContext";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import "../../assets/Registration.css";

const ExamRegistration = () => {
  const { addUser } = useFirebase();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    registrationNumber: "",
    aadhar: "",
    collegeName: "",
    collegeCGPA: "",
    class12CGPA: "",
    class10SchoolName: "",
    class10CGPA: "",
    course: "",
    branch: "",
    photo: null,
    consent: false,
    email: "",
  });

  const [errors, setErrors] = useState({});

  // Regex patterns for validation
  const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const phonePattern = /^\+91\d{10}$/;
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

  const generateUserCredentials = (firstName, lastName) => {
    const userID = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(
      1000 + Math.random() * 9000
    )}`; // Example: johndoe1234
    const password = Math.random().toString(36).slice(-8); // Example: random8charpassword
    return { userID, password };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !allowedFileTypes.includes(file.type)) {
      setErrors({
        ...errors,
        photo: "Only JPG, JPEG, and PNG files are allowed.",
      });
      setFormData({ ...formData, photo: null });
    } else {
      setFormData({ ...formData, photo: file });
      setErrors({ ...errors, photo: "" });
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!dobPattern.test(formData.dob)) {
      newErrors.dob = "Invalid DOB format. Use dd/mm/yyyy";
    }
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone number must be +91 followed by 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendConfirmationEmail = (userID, password) => {
    const emailParams = {
      to_name: formData.firstName,
      to_email: formData.email,
      from_name: "Exam Registration Team",
      user_id: userID,
      user_password: password,
      message: `Your User ID is ${userID} and your password is ${password}. Keep these details safe for exam access.`,
    };

    emailjs
      .send("service_s09aimf", "template_d5ghlev", emailParams, "MBIFPA1t1rr0bEOBA")
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        toast.success("Registration successful! Email sent with exam details.");
      })
      .catch((err) => {
        console.error("Failed to send email:", err)
        toast.error("Failed to send email. Please try again.");
  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()) {
      // Generate User Credentials
    const { userID, password } = generateUserCredentials(
      formData.firstName,
      formData.lastName
    );

    // Add User to Firebase
    const dataToSave = {
      ...formData,
      photo: formData.photo?.name,
      userID,
      password,
    };
    await addUser(dataToSave);

    // Send Confirmation Email
    sendConfirmationEmail(userID, password);
    console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center pt-4 pb-3 vh-90 bg-light">
      <Card className="shadow" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <h3 className="mb-4 text-center">Exam Registration Form</h3>
          <Form onSubmit={handleSubmit}>
            {/* Personal Info Section */}
            <h5>1. Personal Information</h5>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth (dd/mm/yyyy)</Form.Label>
                  <Form.Control
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    isInvalid={!!errors.dob}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dob}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number (+91xxxxxxxxxx)</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Identification Section */}
            <h5 className="mt-4">2. Identification</h5>
            <Form.Group className="mb-3" controlId="registrationNumber">
              <Form.Label>College Registration Number</Form.Label>
              <Form.Control
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="aadhar">
              <Form.Label>Aadhar Number</Form.Label>
              <Form.Control
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="photo">
              <Form.Label>Upload Photo (JPG, JPEG, PNG)</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                isInvalid={!!errors.photo}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.photo}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Academic Info Section */}
            <h5 className="mt-4">3. Academic Information</h5>
            <Form.Group className="mb-3" controlId="collegeName">
              <Form.Label>College Name</Form.Label>
              <Form.Control
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="collegeCGPA">
                  <Form.Label>College CGPA (out of 10)</Form.Label>
                  <Form.Control
                    type="number"
                    name="collegeCGPA"
                    value={formData.collegeCGPA}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="class12CGPA">
                  <Form.Label>Class 12 CGPA (out of 10)</Form.Label>
                  <Form.Control
                    type="number"
                    name="class12CGPA"
                    value={formData.class12CGPA}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="class10SchoolName">
                  <Form.Label>Class 10 School Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="class10SchoolName"
                    value={formData.class10SchoolName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="class10CGPA">
                  <Form.Label>Class 10 CGPA (out of 10)</Form.Label>
                  <Form.Control
                    type="number"
                    name="class10CGPA"
                    value={formData.class10CGPA}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="course">
              <Form.Label>Course</Form.Label>
              <Form.Control
                as="select"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="BE">B.E</option>
                <option value="BTech">B.Tech</option>
                <option value="MCA">MCA</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="branch">
              <Form.Label>Branch</Form.Label>
              <Form.Control
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Consent Declaration */}
            <h5 className="mt-4">4. Consent Declaration</h5>
            <Form.Group controlId="consent" className="mb-3">
              <Form.Check
                type="checkbox"
                name="consent"
                label="I confirm that the information provided is accurate."
                checked={formData.consent}
                onChange={handleCheckboxChange}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="danger"
              disabled={!formData.consent}
              style={{ backgroundColor: "#8B0000", color: "#fff" }}
              className="submit-button"
            >
              Submit Registration
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ExamRegistration;

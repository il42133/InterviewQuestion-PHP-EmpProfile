import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const EmployeeForm = () => {
  const initialState = {
    name: "",
    gender: "",
    marital_status: "",
    phone_number: "",
    email: "",
    address: "",
    date_of_birth: "",
    nationality: "",
    hire_date: "",
    department: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!["Male", "Female", "Other"].includes(formData.gender))
      newErrors.gender = "Please select a valid gender.";
    if (
      !["Single", "Married", "Divorced", "Widowed"].includes(
        formData.marital_status
      )
    )
      newErrors.marital_status = "Please select a valid marital status.";
    if (!/^[0-9+\-() ]{7,20}$/.test(formData.phone_number))
      newErrors.phone_number = "Enter a valid phone number.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.address.trim())
      newErrors.address = "Address is required.";
    if (!formData.date_of_birth)
      newErrors.date_of_birth = "Date of Birth is required.";
    if (!formData.nationality.trim())
      newErrors.nationality = "Nationality is required.";
    if (!formData.hire_date) newErrors.hire_date = "Hire Date is required.";
    if (!formData.department.trim())
      newErrors.department = "Department is required.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const payload = await res.json();
          if (res.status === 422 && payload.errors) {
            const laravelErrors = {};
            Object.entries(payload.errors).forEach(([field, msgs]) => {
              laravelErrors[field] = msgs.join(" ");
            });
            setErrors(laravelErrors);
          }
          return;
        }

        // success
        await res.json();
        alert("Employee added successfully");
        setFormData(initialState);
        setErrors({});
      } catch (err) {
        console.error("Network error:", err);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Name */}
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name*</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Gender */}
      <Form.Group className="mb-3" controlId="formGender">
        <Form.Label>Gender*</Form.Label>
        <Form.Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          isInvalid={!!errors.gender}
        >
          <option value="">– Select –</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.gender}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Marital Status */}
      <Form.Group className="mb-3" controlId="formMarital">
        <Form.Label>Marital Status*</Form.Label>
        <Form.Select
          name="marital_status"
          value={formData.marital_status}
          onChange={handleChange}
          isInvalid={!!errors.marital_status}
        >
          <option value="">– Select –</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.marital_status}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Phone Number */}
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone Number*</Form.Label>
        <Form.Control
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          isInvalid={!!errors.phone_number}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone_number}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Email */}
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email*</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Address */}
      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Address*</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="address"
          value={formData.address}
          onChange={handleChange}
          isInvalid={!!errors.address}
        />
        <Form.Control.Feedback type="invalid">
          {errors.address}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Date of Birth */}
      <Form.Group className="mb-3" controlId="formDob">
        <Form.Label>Date of Birth*</Form.Label>
        <Form.Control
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          isInvalid={!!errors.date_of_birth}
        />
        <Form.Control.Feedback type="invalid">
          {errors.date_of_birth}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Nationality */}
      <Form.Group className="mb-3" controlId="formNationality">
        <Form.Label>Nationality*</Form.Label>
        <Form.Control
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          isInvalid={!!errors.nationality}
        />
        <Form.Control.Feedback type="invalid">
          {errors.nationality}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Hire Date */}
      <Form.Group className="mb-3" controlId="formHireDate">
        <Form.Label>Hire Date*</Form.Label>
        <Form.Control
          type="date"
          name="hire_date"
          value={formData.hire_date}
          onChange={handleChange}
          isInvalid={!!errors.hire_date}
        />
        <Form.Control.Feedback type="invalid">
          {errors.hire_date}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Department */}
      <Form.Group className="mb-3" controlId="formDepartment">
        <Form.Label>Department*</Form.Label>
        <Form.Control
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          isInvalid={!!errors.department}
        />
        <Form.Control.Feedback type="invalid">
          {errors.department}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Employee
      </Button>
    </Form>
  );
};

export default EmployeeForm;

import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/employees")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Could not load employee data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (employees.length === 0) {
    return <Alert variant="info">No employees found.</Alert>;
  }

  return (
    <div>
      <h3>All Employees</h3>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Marital Status</th>
            <th>Phone</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Nationality</th>
            <th>Hire Date</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.gender}</td>
              <td>{emp.marital_status}</td>
              <td>{emp.phone_number}</td>
              <td>{emp.email}</td>
              <td>{emp.date_of_birth}</td>
              <td>{emp.nationality}</td>
              <td>{emp.hire_date}</td>
              <td>{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;

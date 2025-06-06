// src/App.js
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import { Container, Nav } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <Container className="my-4 p-4 bg-white rounded shadow-sm">
        <Nav variant="tabs" defaultActiveKey="/add" className="mb-4">
          <Nav.Item>
            <Nav.Link as={Link} to="/add" eventKey="/add">
              Add Employee
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/list" eventKey="/list">
              View Employees
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Routes>
          <Route path="/" element={<Navigate replace to="/add" />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/list" element={<EmployeeList />} />
          <Route
            path="*"
            element={
              <div>
                <h2>404 – Not Found</h2>
                <p>
                  <Link to="/add">Go back to Add Employee</Link>
                </p>
              </div>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

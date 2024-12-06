import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
import PaidCustomer from '../PaidCustomer';
import OverallSales from '../OverallSales';
import SalesAgentwise from '../SalesAgentwise';
import CreateUser from '../CreateUser';
import Login from '../Login';
import FollowUp from '../Agent/Lead/FollowUp';
import UploadLeads from '../Admin/CSV/UploadLeads';
import TablePage from '../TablePage'; // Import missing TablePage component
import QualityAndCompliance from '../QualityAndComplaince'; // Import missing QualityAndCompliance component
import AdminDashboard from '../Admin/AdminDashboard'; // Import missing AdminDashboard component
import LeadsDashboard from '../Agent/Lead/LeadsDashboard'; // Import missing LeadsDashboard component


const RoutesConfig = ({ element, ...rest }) => {

  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Check if token exists
  };

  return (
    <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div>Error Page 404  Not found</div>} />

            <Route
              path="/dashboard"
              element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
            />

            <Route
              path="/OverallSales"
              element={isAuthenticated() ? <OverallSales /> : <Navigate to="/login" />}
            />

            <Route
              path="/salesAgentwise"
              element={isAuthenticated() ? <SalesAgentwise /> : <Navigate to="/login" />}
            />

            <Route
              path="/tablePage"
              element={isAuthenticated() ? <TablePage /> : <Navigate to="/login" />}
            />

              <Route
                        path="/followup"
                        element={isAuthenticated() ? <FollowUp /> : <Navigate to="/login" />}
                      />

            <Route
              path="/salesAgentwise"
              element={isAuthenticated() ? <QualityAndCompliance /> : <Navigate to="/login" />}
            />


            <Route
              path="/admindashboard"
              element={isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" />}
            />

            <Route
              path="/create-user"
              element={isAuthenticated()? <CreateUser /> : <Navigate to="/login" />}
            />

            <Route
              path="/upload-leads"
              element={isAuthenticated() ? <UploadLeads /> : <Navigate to="/login" />}
            />

            <Route
              path="/leads"
              element={isAuthenticated() ? <LeadsDashboard /> : <Navigate to="/login" />}
            />


            <Route
              path="/paidCustomer"
              element={isAuthenticated() ? <PaidCustomer /> : <Navigate to="/login" />}
            />

      
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
  );
};

export default RoutesConfig;

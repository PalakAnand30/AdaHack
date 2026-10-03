import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import AppLayout from "./layouts/AppLayout";

// Manager pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import TeamMembers from "./pages/manager/TeamMembers";
import EmployeeDetails from "./pages/manager/EmployeeDetails";

// Employee pages
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeData from "./pages/employee/EmployeeData";
import Prediction from "./pages/employee/Prediction";
import MyAIUsage from "./pages/employee/MyAIUsage";
import MyCarbon from "./pages/employee/MyCarbon";
import Tips from "./pages/employee/Tips";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================================================= */}
        {/* LOGIN */}
        {/* ================================================= */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================================================= */}
        {/* MANAGER APPLICATION */}
        {/* ================================================= */}

        <Route
          element={<AppLayout role="manager" />}
        >

          {/* Manager Dashboard */}

          <Route
            path="/manager"
            element={<ManagerDashboard />}
          />


          {/* Team Members */}

          <Route
            path="/manager/team"
            element={<TeamMembers />}
          />


          {/* Individual Employee Details */}

          <Route
            path="/manager/team/:employeeId"
            element={<EmployeeDetails />}
          />


          {/* Reports */}

          <Route
            path="/manager/reports"
            element={
              <div className="p-8">

                <h1 className="text-2xl font-bold text-slate-900">
                  Reports
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Employee sustainability and performance reports.
                </p>

              </div>
            }
          />

        </Route>


        {/* ================================================= */}
        {/* EMPLOYEE APPLICATION */}
        {/* ================================================= */}

        <Route
          element={<AppLayout role="employee" />}
        >

          {/* Employee Dashboard */}

          <Route
            path="/employee"
            element={<EmployeeDashboard />}
          />


          {/* Employee Data / Activity */}

          <Route
            path="/employee/activity"
            element={<EmployeeData />}
          />


          {/* Prediction / Generate Analysis */}

          <Route
            path="/employee/prediction"
            element={<Prediction />}
          />


          {/* AI Usage */}

          <Route
            path="/employee/ai-usage"
            element={<MyAIUsage />}
          />


          {/* Carbon Footprint */}

          <Route
            path="/employee/carbon"
            element={<MyCarbon />}
          />


          {/* Tips & Recommendations */}

          <Route
            path="/employee/tips"
            element={<Tips />}
          />

        </Route>


        {/* ================================================= */}
        {/* FALLBACK */}
        {/* ================================================= */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
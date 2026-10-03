import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("employee");

  const handleLogin = () => {
    localStorage.setItem("role", role);

    if (role === "manager") {
      navigate("/manager");
    } else {
      navigate("/employee");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f5f7] px-6">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7f1d3a] text-xl font-bold text-white">
            E
          </div>

          <h1 className="text-2xl font-bold text-[#111827]">
            EcoBalance AI
          </h1>

          <p className="mt-2 text-sm text-[#6b7280]">
            Sustainability & productivity intelligence
          </p>

        </div>


        <div className="eco-card p-7">

          <h2 className="text-lg font-semibold text-[#111827]">
            Sign in
          </h2>

          <p className="mt-1 text-sm text-[#6b7280]">
            Select your account type to continue.
          </p>


          <div className="mt-6 grid grid-cols-2 gap-3">

            <button
              onClick={() => setRole("employee")}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                role === "employee"
                  ? "border-[#7f1d3a] bg-[#f8e9ee] text-[#7f1d3a]"
                  : "border-[#e5e7eb] bg-white text-[#6b7280]"
              }`}
            >
              Employee
            </button>

            <button
              onClick={() => setRole("manager")}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                role === "manager"
                  ? "border-[#7f1d3a] bg-[#f8e9ee] text-[#7f1d3a]"
                  : "border-[#e5e7eb] bg-white text-[#6b7280]"
              }`}
            >
              Manager
            </button>

          </div>


          <div className="mt-5 space-y-4">

            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#374151]">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-[#e5e7eb] px-3.5 py-3 text-sm outline-none focus:border-[#7f1d3a]"
              />
            </div>


            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#374151]">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-[#e5e7eb] px-3.5 py-3 text-sm outline-none focus:border-[#7f1d3a]"
              />
            </div>


            <button
              onClick={handleLogin}
              className="eco-primary w-full rounded-lg py-3 text-sm font-semibold"
            >
              Sign In
            </button>

          </div>

        </div>


        <p className="mt-5 text-center text-xs text-[#9ca3af]">
          EcoBalance AI • Sustainability Intelligence Platform
        </p>

      </div>

    </div>
  );
}

export default Login;
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout({ role }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove any login/session information
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // Go back to login
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-[#f8f5f6]">

      {/* SIDEBAR */}

      <Sidebar role={role} />


      {/* MAIN APPLICATION */}

      <div className="flex min-h-screen flex-1 flex-col">

        {/* TOP BAR */}

        <header className="flex h-[70px] items-center justify-between border-b border-slate-200 bg-white px-8">

          {/* LEFT */}

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a4964]">
              EcoBalance AI
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Sustainability Intelligence Platform
            </p>

          </div>


          {/* RIGHT */}

          <div className="flex items-center gap-4">

            {/* PROFILE */}

            <button
              type="button"
              className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-50"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#faf1f4] text-sm font-bold text-[#7f1d3d]">
                {role === "manager" ? "M" : "E"}
              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-semibold text-slate-800">
                  {role === "manager" ? "Manager" : "Employee"}
                </p>

                <p className="text-[11px] text-slate-400">
                  {role === "manager"
                    ? "Manager Account"
                    : "Employee Account"}
                </p>

              </div>

            </button>


            {/* SIGN OUT */}

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#7f1d3d] hover:bg-[#faf1f4] hover:text-[#7f1d3d]"
            >
              Sign Out
            </button>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <main className="flex-1">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AppLayout;
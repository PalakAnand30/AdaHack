import { NavLink } from "react-router-dom";

function Sidebar({ role }) {
  const managerLinks = [
    {
      label: "Manager Dashboard",
      path: "/manager",
    },
    {
      label: "Team Members",
      path: "/manager/team",
    },
    {
      label: "AI Usage",
      path: "/manager/ai-usage",
    },
    {
      label: "Carbon & Environment",
      path: "/manager/carbon",
    },
    {
      label: "Reports",
      path: "/manager/reports",
    },
    {
      label: "Recommendations",
      path: "/manager/recommendations",
    },
  ];

  const employeeLinks = [
    {
      label: "My Dashboard",
      path: "/employee",
    },
    
    {
      label: "AI Usage",
      path: "/employee/ai-usage",
    },
    {
      label: "My Carbon Footprint",
      path: "/employee/carbon",
    },
    {
      label: "Tips & Recommendations",
      path: "/employee/tips",
    },
  ];

  const links = role === "manager" ? managerLinks : employeeLinks;

  return (
    <aside className="eco-sidebar flex min-h-screen w-[235px] flex-col">

      {/* BRAND */}

      <div className="border-b border-white/10 px-5 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7f1d3a] text-sm font-bold text-white">
            E
          </div>

          <div>
            <p className="text-[15px] font-bold text-white">
              EcoBalance AI
            </p>

            <p className="mt-0.5 text-[10px] text-slate-400">
              Sustainability Intelligence
            </p>
          </div>

        </div>

      </div>


      {/* NAVIGATION */}

      <nav className="flex-1 px-3 py-5">

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {role === "manager" ? "Management" : "My Workspace"}
        </p>

        <div className="space-y-1">

          {links.map((link) => (

            <NavLink
              key={link.path}
              to={link.path}
              end={
                link.path === "/manager" ||
                link.path === "/employee"
              }
              className={({ isActive }) =>
                [
                  "block rounded-lg px-3 py-2.5 text-[12px] font-medium transition",
                  isActive
                    ? "bg-[#7f1d3a] text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              {link.label}
            </NavLink>

          ))}

        </div>

      </nav>


      {/* USER ROLE */}

      <div className="border-t border-white/10 p-4">

        <p className="text-[10px] uppercase tracking-wide text-slate-500">
          Signed in as
        </p>

        <p className="mt-1 text-xs font-medium text-slate-200">
          {role === "manager" ? "Manager" : "Employee"}
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;
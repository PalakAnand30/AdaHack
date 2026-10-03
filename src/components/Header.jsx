function Header({ role }) {
  const isManager = role === "manager";

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#e5e7eb] bg-white px-6">

      {/* LEFT */}

      <div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7f1d3a]">
          {isManager ? "Manager View" : "Employee View"}
        </p>

        <h1 className="mt-1 text-lg font-bold text-[#111827]">
          {isManager ? "Team Dashboard" : "My Dashboard"}
        </h1>

      </div>


      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* PERIOD */}

        <select
          className="hidden rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-xs text-[#4b5563] outline-none md:block"
          defaultValue="current"
        >
          <option value="current">
            Aug 2026 - Sep 2026
          </option>

          <option value="previous">
            Jun 2026 - Jul 2026
          </option>
        </select>


        {/* NOTIFICATION */}

        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-xs text-[#4b5563] hover:bg-[#f9fafb]"
        >
          <span className="h-2 w-2 rounded-full bg-[#7f1d3a]" />
        </button>


        {/* USER */}

        <div className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8e9ee] text-xs font-bold text-[#7f1d3a]">
            {isManager ? "SM" : "E"}
          </div>

          <div className="hidden sm:block">

            <p className="text-xs font-semibold text-[#111827]">
              {isManager ? "Sarah Mitchell" : "EMP015"}
            </p>

            <p className="text-[10px] text-[#9ca3af]">
              {isManager ? "Manager" : "Employee"}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;
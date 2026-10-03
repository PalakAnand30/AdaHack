import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import monthlyEmployee from "../../data/monthlyEmployee.json";

function TeamMembers() {

  const navigate = useNavigate();

  const [selectedManager, setSelectedManager] = useState("MGR01");
  const [search, setSearch] = useState("");

  // Get managers from actual data
  const managers = useMemo(() => {

    return [
      ...new Set(
        monthlyEmployee.map(
          (employee) => employee["Manager ID"]
        )
      ),
    ];

  }, []);


  // Get unique employees for selected manager
  const employees = useMemo(() => {

    const filtered = monthlyEmployee.filter(
      (employee) =>
        employee["Manager ID"] === selectedManager
    );

    const uniqueEmployees = new Map();

    filtered.forEach((employee) => {

      const employeeId = employee["Employee ID"];

      if (!uniqueEmployees.has(employeeId)) {
        uniqueEmployees.set(employeeId, employee);
      }

    });

    return Array.from(uniqueEmployees.values());

  }, [selectedManager]);


  // Search
  const filteredEmployees = useMemo(() => {

    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return employees;
    }

    return employees.filter((employee) =>
      String(employee["Employee ID"])
        .toLowerCase()
        .includes(searchValue)
    );

  }, [employees, search]);


  // Calculate team averages
  const averageCO2 = useMemo(() => {

    if (!employees.length) return 0;

    return (
      employees.reduce(
        (sum, employee) =>
          sum + Number(employee["Total CO2e"] || 0),
        0
      ) / employees.length
    );

  }, [employees]);


  const averageAI = useMemo(() => {

    if (!employees.length) return 0;

    return (
      employees.reduce(
        (sum, employee) =>
          sum + Number(employee["AI Utilisation %"] || 0),
        0
      ) / employees.length
    );

  }, [employees]);


  return (

    <div className="space-y-5 p-5 lg:p-6">

      {/* PAGE HEADER */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div>

          <h2 className="text-[20px] font-bold text-[#111827]">
            Team Members
          </h2>

          <p className="mt-1 text-[11px] text-[#6b7280]">
            View employee emissions, AI usage and sustainability data.
          </p>

        </div>


        {/* MANAGER SELECTOR */}

        <div className="flex items-center gap-2">

          <span className="text-[10px] text-[#6b7280]">
            Manager
          </span>

          <select
            value={selectedManager}
            onChange={(event) =>
              setSelectedManager(event.target.value)
            }
            className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[11px] font-medium text-[#374151] outline-none focus:border-[#7f1d3a]"
          >

            {managers.map((manager) => (

              <option
                key={manager}
                value={manager}
              >
                {manager}
              </option>

            ))}

          </select>

        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        <div className="eco-card p-4">

          <p className="text-[10px] text-[#6b7280]">
            Team Members
          </p>

          <p className="mt-2 text-xl font-bold text-[#111827]">
            {employees.length}
          </p>

        </div>


        <div className="eco-card p-4">

          <p className="text-[10px] text-[#6b7280]">
            Average CO₂e
          </p>

          <p className="mt-2 text-xl font-bold text-[#111827]">
            {averageCO2.toFixed(1)} kg
          </p>

        </div>


        <div className="eco-card p-4">

          <p className="text-[10px] text-[#6b7280]">
            Average AI Utilisation
          </p>

          <p className="mt-2 text-xl font-bold text-[#7f1d3a]">
            {averageAI.toFixed(1)}%
          </p>

        </div>

      </div>


      {/* SEARCH */}

      <div className="eco-card p-4">

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <div>

            <h3 className="text-[13px] font-semibold text-[#111827]">
              Employees
            </h3>

            <p className="mt-1 text-[10px] text-[#9ca3af]">
              {filteredEmployees.length} employees shown
            </p>

          </div>


          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search Employee ID..."
            className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#7f1d3a] md:w-64"
          />

        </div>

      </div>


      {/* EMPLOYEE TABLE */}

      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="border-b border-[#e5e7eb] bg-[#fafafa]">

              <tr>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  Employee ID
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  Commute
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  Office Days
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  WFH Days
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  AI Utilisation
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  AI Cost
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  Total CO₂e
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-[#6b7280]">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredEmployees.map((employee) => (

                <tr
                  key={employee["Employee ID"]}
                  className="border-b border-[#f0f1f3] last:border-0 hover:bg-[#fafafa]"
                >

                  <td className="px-5 py-4">

                    <p className="text-[12px] font-semibold text-[#7f1d3a]">
                      {employee["Employee ID"]}
                    </p>

                  </td>


                  <td className="px-4 py-4 text-[11px] text-[#4b5563]">
                    {employee["Commute Mode"]}
                  </td>


                  <td className="px-4 py-4 text-[11px] text-[#4b5563]">
                    {employee["Office Days"]}
                  </td>


                  <td className="px-4 py-4 text-[11px] text-[#4b5563]">
                    {employee["WFH Days"]}
                  </td>


                  <td className="px-4 py-4">

                    <div className="flex items-center gap-2">

                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#edf0f2]">

                        <div
                          className="h-full rounded-full bg-[#8b5bd6]"
                          style={{
                            width: `${Math.min(
                              Number(
                                employee[
                                  "AI Utilisation %"
                                ] || 0
                              ),
                              100
                            )}%`,
                          }}
                        />

                      </div>

                      <span className="text-[10px] text-[#6b7280]">
                        {Number(
                          employee[
                            "AI Utilisation %"
                          ] || 0
                        ).toFixed(1)}
                        %
                      </span>

                    </div>

                  </td>


                  <td className="px-4 py-4 text-[11px] text-[#4b5563]">
                    $
                    {Number(
                      employee["AI Cost"] || 0
                    ).toFixed(2)}
                  </td>


                  <td className="px-4 py-4">

                    <span className="text-[11px] font-semibold text-[#1f2937]">
                      {Number(
                        employee["Total CO2e"] || 0
                      ).toFixed(2)}
                      {" "}kg
                    </span>

                  </td>


                  <td className="px-5 py-4 text-right">

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/manager/team/${employee["Employee ID"]}`
                        )
                      }
                      className="rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-[10px] font-medium text-[#7f1d3a] transition hover:bg-[#f8e9ee]"
                    >
                      View Details
                    </button>

                  </td>

                </tr>

              ))}


              {filteredEmployees.length === 0 && (

                <tr>

                  <td
                    colSpan="8"
                    className="px-5 py-12 text-center text-[11px] text-[#9ca3af]"
                  >
                    No employees found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default TeamMembers;
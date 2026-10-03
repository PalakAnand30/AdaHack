import { useState } from "react";

function EmployeeData() {

  const [formData, setFormData] = useState({
    date: "",
    commuteMode: "",
    commuteDistance: "",
    officeDays: "",
    wfhDays: "",
    electricity: "",
    printing: "",
    aiCreditsUsed: "",
  });


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  const handleSubmit = (event) => {

    event.preventDefault();

    console.log("Employee data:", formData);

    alert("Data saved successfully.");

  };


  return (

    <div className="space-y-5 p-5 lg:p-6">

      {/* HEADER */}

      <div>

        <p className="text-[10px] font-medium uppercase tracking-wide text-[#9ca3af]">
          Employee Portal
        </p>

        <h2 className="mt-1 text-[21px] font-bold text-[#111827]">
          Enter Your Activity Data
        </h2>

        <p className="mt-1 max-w-2xl text-[11px] leading-5 text-[#6b7280]">
          Enter your work, commute, electricity, printing and AI usage
          information. This information will be used to calculate your
          sustainability impact and generate predictions.
        </p>

      </div>


      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >


        {/* ===================================== */}
        {/* DATE */}
        {/* ===================================== */}

        <div className="eco-card p-5">

          <div className="mb-5">

            <h3 className="text-[13px] font-semibold text-[#111827]">
              Activity Date
            </h3>

            <p className="mt-1 text-[10px] text-[#9ca3af]">
              Select the date for this activity record.
            </p>

          </div>


          <div className="max-w-sm">

            <label className="mb-1.5 block text-[10px] font-medium text-[#4b5563]">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[11px] text-[#374151] outline-none focus:border-[#7f1d3a]"
            />

          </div>

        </div>


        {/* ===================================== */}
        {/* COMMUTE */}
        {/* ===================================== */}

        <div className="eco-card p-5">

          <div className="mb-5">

            <h3 className="text-[13px] font-semibold text-[#111827]">
              Commute
            </h3>

            <p className="mt-1 text-[10px] text-[#9ca3af]">
              Tell us how you travelled to work.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">


            <div>

              <label className="mb-1.5 block text-[10px] font-medium text-[#4b5563]">
                Commute Mode
              </label>

              <select
                name="commuteMode"
                value={formData.commuteMode}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#7f1d3a]"
              >

                <option value="">
                  Select commute mode
                </option>

                <option value="Car">
                  Car
                </option>

                <option value="Bus">
                  Bus
                </option>

                <option value="Train">
                  Train
                </option>

                <option value="Bicycle">
                  Bicycle
                </option>

                <option value="Walk">
                  Walk
                </option>

                <option value="Motorcycle">
                  Motorcycle
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            <div>

              <label className="mb-1.5 block text-[10px] font-medium text-[#4b5563]">
                Distance Travelled
              </label>

              <div className="relative">

                <input
                  type="number"
                  name="commuteDistance"
                  value={formData.commuteDistance}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  placeholder="e.g. 12.5"
                  className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 pr-16 text-[11px] outline-none focus:border-[#7f1d3a]"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#9ca3af]">
                  miles
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================== */}
        {/* WORK PATTERN */}
        {/* ===================================== */}

        <div className="eco-card p-5">

          <div className="mb-5">

            <h3 className="text-[13px] font-semibold text-[#111827]">
              Work Pattern
            </h3>

            <p className="mt-1 text-[10px] text-[#9ca3af]">
              Enter your office and work-from-home days.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">


            <div>

              <label className="mb-1.5 block text-[10px] font-medium text-[#4b5563]">
                Office Days
              </label>

              <input
                type="number"
                name="officeDays"
                value={formData.officeDays}
                onChange={handleChange}
                min="0"
                max="31"
                placeholder="e.g. 18"
                className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#7f1d3a]"
              />

            </div>


            <div>

              <label className="mb-1.5 block text-[10px] font-medium text-[#4b5563]">
                Work From Home Days
              </label>

              <input
                type="number"
                name="wfhDays"
                value={formData.wfhDays}
                onChange={handleChange}
                min="0"
                max="31"
                placeholder="e.g. 8"
                className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#7f1d3a]"
              />

            </div>

          </div>

        </div>


        {/* ===================================== */}
        {/* ELECTRICITY */}
        {/* ===================================== */}

        <div className="eco-card p-5">

          <div className="mb-5">

            <h3 className="text-[13px] font-semibold text-[#111827]">
              Electricity Usage
            </h3>

            <p className="mt-1 text-[10px] text-[#9ca3af]">
              Enter the electricity usage associated with your work.
            </p>

          </div>


          <div className="max-w-md">

            <label className="mb-1.5 block text-[10px] font-medium text-[#4b5563]">
              Electricity Consumption
            </label>

            <div className="relative">

              <input
                type="number"
                name="electricity"
                value={formData.electricity}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g. 24.5"
                className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 pr-14 text-[11px] outline-none focus:border-[#7f1d3a]"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#9ca3af]">
                kWh
              </span>

            </div>

          </div>

        </div>


        {/* ===================================== */}
        {/* PRINTING */}
        {/* ===================================== */}

        <div className="eco-card p-5">

          <div className="mb-5">

            <h3 className="text-[13px] font-semibold text-[#111827]">
              Printing
            </h3>

            <p className="mt-1 text-[10px] text-[#9ca3af]">
              Enter the number of pages printed.
            </p>

          </div>


          <div className="max-w-md">

            <label className="mb-1.5 block text-[10px] font-medium text-[#4b5563]">
              Pages Printed
            </label>

            <input
              type="number"
              name="printing"
              value={formData.printing}
              onChange={handleChange}
              min="0"
              placeholder="e.g. 25"
              className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#7f1d3a]"
            />

          </div>

        </div>


        {/* ===================================== */}
        {/* AI USAGE */}
        {/* ===================================== */}

        <div className="eco-card p-5">

          <div className="mb-5">

            <h3 className="text-[13px] font-semibold text-[#111827]">
              AI Usage
            </h3>

            <p className="mt-1 text-[10px] text-[#9ca3af]">
              Enter your AI usage for this activity period.
            </p>

          </div>


          <div className="max-w-md">

            <label className="mb-1.5 block text-[10px] font-medium text-[#4b5563]">
              AI Credits Used
            </label>

            <input
              type="number"
              name="aiCreditsUsed"
              value={formData.aiCreditsUsed}
              onChange={handleChange}
              min="0"
              placeholder="e.g. 1250"
              className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[11px] outline-none focus:border-[#7f1d3a]"
            />

          </div>

        </div>


        {/* ===================================== */}
        {/* SUBMIT */}
        {/* ===================================== */}

        <div className="flex justify-end">

          <button
            type="submit"
            className="rounded-lg bg-[#7f1d3a] px-6 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#681630]"
          >
            Save Activity Data
          </button>

        </div>

      </form>

    </div>

  );

}

export default EmployeeData;
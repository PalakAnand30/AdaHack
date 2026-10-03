# Employee Sustainability & Productivity Dashboard

##  Overview

The **Employee Sustainability & Productivity Dashboard** is a data-driven application designed to monitor and analyse employee workplace activity, resource usage, productivity, AI utilisation, and carbon emissions.

The project uses monthly employee data stored in JSON format and converts it into meaningful metrics and visualisations to help understand:

- Employee productivity
- Office and WFH patterns
- Commute behaviour
- Electricity consumption
- Printing activity
- AI credit utilisation
- Carbon emissions
- Overall sustainability performance

---

## Project Objectives

The main objectives of this project are to:

1. Track employee workplace activity on a monthly basis.
2. Calculate employee productivity using available activity data.
3. Monitor office and work-from-home patterns.
4. Analyse commuting behaviour and associated CO₂ emissions.
5. Track printing and electricity usage.
6. Monitor AI credit allocation and utilisation.
7. Calculate total carbon emissions.
8. Present the information through an easy-to-understand dashboard.

---

## Data

The application uses monthly employee data stored in JSON format.

### Example

```json
{
  "Month": "Month 1 - Aug 2026",
  "Employee ID": "EMP001",
  "Manager ID": "MGR01",
  "Commute Mode": "Tram",
  "Office Days": 13,
  "WFH Days": 8,
  "Commute Miles": 309.4,
  "Desk Electricity kWh": 8.329,
  "Pages Printed": 143,
  "B&W Pages": 118,
  "Colour Pages": 25,
  "AI Credits Allocated": 3000,
  "AI Credits Used": 2367,
  "Unused AI Credits": 633,
  "AI Utilisation %": 0.789,
  "AI Cost (USD)": 120,
  "Commute CO2e kg": 10.829,
  "Electricity CO2e kg": 1.7241,
  "Printing CO2e kg": 0.756,
  "AI CO2e kg": 1.1835,
  "Total CO2e kg": 14.492603
}
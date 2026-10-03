const API_URL = "/api";
export async function generateEmployeeDashboard(data) {
  const response = await fetch(
    `${API_URL}/dashboard/employee`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.detail || "Failed to generate dashboard"
    );
  }

  return response.json();
}
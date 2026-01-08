const API_BASE = "https://palaced-sharonda-thirtypenny.ngrok-free.dev";

/* Predict employee performance */
export async function predictPerformance(employeeData: any) {
  const res = await fetch(`${API_BASE}/api/predict`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true"
    },
    body: JSON.stringify(employeeData)
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || res.statusText);
  }
  return await res.json();
}

/* Get global feature importance */
export async function getFeatureImportance() {
  const res = await fetch(`${API_BASE}/api/feature-importance`, {
    headers: { "ngrok-skip-browser-warning": "true" }
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || res.statusText);
  }
  return await res.json();
}

/* Health check (for ML Backend Online/Offline banner) */
export async function healthCheck() {
  const res = await fetch(`${API_BASE}/api/health`, {
    headers: { "ngrok-skip-browser-warning": "true" }
  });
  const data = await res.json();
  return { online: data.status === "healthy" };
}

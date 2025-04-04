const environment = import.meta.env.VITE_ENVIRONMENT;
const backendUrl =
  environment === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3000/";

export { backendUrl };

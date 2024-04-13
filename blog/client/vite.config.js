import { defineConfig } from "vite";

export default defineConfig({
  // Other Vite configuration options...

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/api/v1", // Your backend API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' from the request path
      },
    },
  },
});

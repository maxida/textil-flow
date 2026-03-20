/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'textil-primary': '#1e293b', // Azul pizarra oscuro profesional
        'textil-accent': '#3b82f6',  // Azul brillante para botones/acciones
        'textil-success': '#10b981', // Verde para pedidos completados
      }
    },
  },
  plugins: [],
}
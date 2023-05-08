/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        arbol: "url('./assets/arbol.png')",
      },
      fontFamily: {
        monserrat: ["Montserrat", "sans-serif"],
        maiten: ["Harabara", "sans-serif"],
      },
    },
  },
};

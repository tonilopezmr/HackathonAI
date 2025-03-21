/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "radial-gradient-white":
          "radial-gradient(40% 20% at 50% 65%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))",
        "radial-gradient-white-md":
          "radial-gradient(20% 40% at 80% 40%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))",
        "radial-gradient-cyan":
          "radial-gradient(50% 50% at 50% 50%, rgba(26, 140, 255, 0.2), rgba(255, 255, 255, 0))",
        "radial-gradient-purple":
          "radial-gradient(50% 50% at 50% 50%, rgba(160, 0, 160, 0.2), rgba(255, 255, 255, 0))",
        "radial-gradient-slate":
          "radial-gradient(50% 50% at 50% 50%, rgba(2, 6, 23, 1), rgba(15, 23, 42, 0))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        xl: "2px 0px 30px 5px rgba(0, 0, 0, 0.3)",
      },
      boxShadow: {
        lg: "2px 0px 15px 5px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

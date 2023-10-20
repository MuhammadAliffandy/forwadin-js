import type { Config } from 'tailwindcss'
const { nextui } = require("@nextui-org/react");
const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3366FF',
        'white-50': '#FAFBFF',
        'neutral-75': '#F3F5F8',
        'danger': '#D14343',
        'green-40': '#4FBEAB',
        'customGray': '#B0B4C5'
      },

    },
    fontFamily: {
      'lexend': ['Lexend Deca', 'sans-serif'],
      'nunito': ['Nunito Sans', 'sans-serif'],
      'inter': ['Inter', 'sans-serif']
    }
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin"), nextui()],


}
export default config

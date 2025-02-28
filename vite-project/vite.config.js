import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs';
const flowbite = require("./node_modules/flowbite-react");





// /** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
// https://vite.dev/config/
export default defineConfig({
  content: [
    flowbite().content(),
  ],
  plugins: [
    react(),
    tailwindcss(),
    flowbite().plugins(),
    commonjs()

  ],
});


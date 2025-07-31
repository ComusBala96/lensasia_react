/** @type {import('tailwindcss').Config} */

import config from '@orians/tailwind/tailwind.config.js';
export default {
    ...config,
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
};

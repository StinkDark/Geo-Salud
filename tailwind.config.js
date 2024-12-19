/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ['./src/**/*.{html,js,ts,jsx,tsx,mdx}'],
  
  theme: {
    // colors: {
    //   'blue': '#1fb6ff',
    //   'purple': '#7e5bef',
    //   'pink': '#ff49db',
    //   'orange': '#ff7849',
    //   'green': '#13ce66',
    //   'yellow': '#ffc82c',
    //   'gray-dark': '#273444',
    //   'gray': '#8492a6',
    //   'gray-light': '#d3dce6',
    // },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    // extend: {
    //   spacing: {
    //     '8xl': '96rem',
    //     '9xl': '128rem',
    //   },
    //   borderRadius: {
    //     '4xl': '2rem',
    //   }
    // }

    screens: {
      'smartphones': '320px',
       // => @media (min-width: 320px) { ... }
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}


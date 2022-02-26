module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ui-dark': 'rgb(32, 34, 37)',
        'ui': 'rgb(47, 49, 54)',
        'ui-light': 'rgb(54, 57, 63)',
        'ui-transparent-5': 'rgb(83, 93, 97, 0.5)',
        'ui-transparent-3': 'rgb(83, 93, 97, 0.3)',
      },
      boxShadow: {
        'input': '0px 1px 2px 0px gray'
      }
    },
  },
  plugins: [],
}

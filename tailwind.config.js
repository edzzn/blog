// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: ['./src/**/*.js'],
  theme: {
    fontFamily: {
      sans: ['Source Sans Pro', 'Open Sans', ' system-ui'],
      mono: ['Fira Code', 'Menlo', 'monospace'],
    },
    extend: {
      colors: {
        aws: '#FF9A35',
        react: '#39DBF9',
        flutter: {
          default: '#35BFEE',
          light: '#35BFEE',
          dark: '#005498',
        },
        editor: '#1F1F1F',
      },
    },
  },
  variants: {},
  // https://github.com/tailwindcss/custom-forms
  plugins: [require('@tailwindcss/custom-forms')],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        negative: '#0A192E',
        default: '#fff',
        primary: '#6750A4',
        'primary-accent': '#5c4893',
        'primary-active': '#524083',
        'primary-disabled': '#b3a7d1',
        info: '#CCE5FF',
        disabled: '#E7E8E9',
        warning: '#FDDBC3',
        success: '#D0E6D4',
        main: '#F5F7FA',
        accent: '#EBEFF5',
        active: '#d3d7dc',
      },
      borderColor: {
        primary: '#6750A4',
        default: '#e7e8e9',
      },
      textColor: {
        default: '#0A192E',
        disabled: '#797676',
        placeholder: '#aeacac',
        error: '#C71A01',
        success: '#057345',
        negative: '#fff',
        primary: '#6750A4',
      },
      colors: {
        primary: '#6750A4',
        actionPrimary: '#6750A4',
        red: '#C71A01',
      },
      fill: {
        negative: '#fff',
      },
    },
  },
  plugins: [],
};

/**
 * h2 :
 * - font open sans
 * - weight 600
 * - size 32px
 * - line height 40px
 *
 * h2 :
 * - font open sans
 * - weight 600
 * - size 28px
 * - line height 36px
 *
 * h3 :
 * - font open sans
 * - weight 600
 * - size 24px
 * - line height 32px
 *
 * body large :
 * - font open sans
 * - weight 400
 * - size 16px // text-base
 * - line height 24px
 *
 * body medium :
 * - font open sans
 * - weight 400
 * - size 14px // text-sm
 * - line height 20px
 *
 * body small :
 * - font open sans
 * - weight 400
 * - size 12px // text-xs
 * - line height 16px
 *
 * label large :
 * - font open sans
 * - weight 600
 * - size 16px // text-base
 * - line height 24px
 *
 * label medium :
 * - font open sans
 * - weight 600
 * - size 14px // text-sm
 * - line height 20px
 *
 */
